param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("calcharbor", "devutility-lab", "timenexus", "qrroute", "invoicecraft", "mailhealth", "sitepulse-lab", "pixelbatch", "docshift")]
    [string]$AppId,
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$CredentialInventoryPath = "docs/credentials/credentials.local.md",
    [string]$CpanelHost = $env:SUPERSITES_CPANEL_HOST,
    [int]$CpanelPort = 2083,
    [string]$CpanelUser = $env:SUPERSITES_CPANEL_USER,
    [string]$CpanelPassword = $env:SUPERSITES_CPANEL_PASSWORD,
    [string]$ApiBaseUrl = "",
    [string]$ReleaseId = "",
    [string]$RollbackReleaseId = "",
    [switch]$RollbackToPlaceholder,
    [switch]$SkipBuild,
    [switch]$SkipSmoke,
    [switch]$SkipApiSmoke
)

$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "static-app-hostgator.config.ps1")

function New-QueryString {
    param([hashtable]$Parameters)

    $pairs = @()
    foreach ($key in $Parameters.Keys) {
        $pairs += ("{0}={1}" -f [Uri]::EscapeDataString($key), [Uri]::EscapeDataString([string]$Parameters[$key]))
    }

    return $pairs -join "&"
}

function Get-CpanelCredentials {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        return $null
    }

    $content = Get-Content -Raw -LiteralPath $Path
    $sections = [regex]::Matches($content, "(?ims)^##[^\r\n]*(?:cpanel|hostgator|opentshost)[\s\S]*?(?=^##|\z)")
    foreach ($sectionMatch in $sections) {
        $section = $sectionMatch.Value
        if ($section -notmatch "(?i)cpanel|2083|opents62") {
            continue
        }

        $userMatch = [regex]::Match($section, "(?im)(?:usu[aá]rio|usuario|user)\s*[:=-]\s*`?(?<value>[^`\r\n]+)`?")
        $passwordMatch = [regex]::Match($section, "(?im)(?:senha|password)\s*[:=-]\s*`?(?<value>[^`\r\n]+)`?")
        if ($userMatch.Success -and $passwordMatch.Success) {
            return [pscustomobject]@{
                User = $userMatch.Groups["value"].Value.Trim()
                Password = $passwordMatch.Groups["value"].Value.Trim()
            }
        }
    }

    return $null
}

function Assert-UapiSuccess {
    param(
        [object]$Response,
        [string]$Message
    )

    if ($Response.status -ne 1) {
        $errors = @($Response.errors) -join "; "
        throw "$Message $errors"
    }
}

function Invoke-CpanelRequestWithRetry {
    param(
        [scriptblock]$Operation,
        [string]$Description,
        [int]$MaxAttempts = 5
    )

    for ($attempt = 1; $attempt -le $MaxAttempts; $attempt++) {
        try {
            return & $Operation
        }
        catch {
            if ($attempt -ge $MaxAttempts) {
                throw
            }

            $delaySeconds = [Math]::Min(30, [Math]::Pow(2, $attempt))
            Write-Warning ("{0} failed on attempt {1}/{2}: {3}. Retrying in {4}s." -f $Description, $attempt, $MaxAttempts, $_.Exception.Message, $delaySeconds)
            Start-Sleep -Seconds $delaySeconds
        }
    }
}

function Invoke-CpanelUapi {
    param(
        [string]$Path,
        [hashtable]$Parameters = @{},
        [ValidateSet("Get", "Post")]
        [string]$Method = "Get"
    )

    $uri = "https://$script:CpanelHost`:$script:CpanelPort/execute/$Path"
    if ($Method -eq "Get") {
        $query = New-QueryString $Parameters
        if ($query) {
            $uri = "$uri`?$query"
        }

        return Invoke-CpanelRequestWithRetry -Description "cPanel UAPI $Path" -Operation {
            Invoke-RestMethod -Method Get -Uri $uri -Headers $script:CpanelHeaders -TimeoutSec 120
        }
    }

    return Invoke-CpanelRequestWithRetry -Description "cPanel UAPI $Path" -Operation {
        Invoke-RestMethod -Method Post -Uri $uri -Headers $script:CpanelHeaders -Body $Parameters -ContentType "application/x-www-form-urlencoded" -TimeoutSec 120
    }
}

function Invoke-CpanelApi2 {
    param(
        [string]$Module,
        [string]$Function,
        [hashtable]$Parameters = @{}
    )

    $baseParameters = @{
        cpanel_jsonapi_user = $script:CpanelUser
        cpanel_jsonapi_apiversion = "2"
        cpanel_jsonapi_module = $Module
        cpanel_jsonapi_func = $Function
    }

    foreach ($key in $Parameters.Keys) {
        $baseParameters[$key] = $Parameters[$key]
    }

    $uri = "https://$script:CpanelHost`:$script:CpanelPort/json-api/cpanel?" + (New-QueryString $baseParameters)
    return Invoke-CpanelRequestWithRetry -Description "cPanel API2 $Module/$Function" -Operation {
        Invoke-RestMethod -Method Get -Uri $uri -Headers $script:CpanelHeaders -TimeoutSec 120
    }
}

function Get-FileInfo {
    param([string]$Path)

    $response = Invoke-CpanelUapi "Fileman/get_file_information" @{
        path = $Path
        include_permissions = "1"
        show_hidden = "1"
    }

    if ($response.status -ne 1) {
        return $null
    }

    return $response.data
}

function Split-RemotePath {
    param([string]$Path)

    $normalized = $Path.TrimEnd("/")
    $index = $normalized.LastIndexOf("/")
    if ($index -le 0) {
        throw "Cannot split remote path: $Path"
    }

    return [PSCustomObject]@{
        Parent = $normalized.Substring(0, $index)
        Name = $normalized.Substring($index + 1)
    }
}

function Join-RemotePath {
    param(
        [string]$Base,
        [string]$Child = ""
    )

    if (-not $Child) {
        return $Base.TrimEnd("/")
    }

    return "$($Base.TrimEnd("/"))/$($Child.Trim("/") -replace "\\", "/")"
}

function Ensure-RemoteDirectory {
    param([string]$Path)

    $info = Get-FileInfo $Path
    if ($info -and $info.exists) {
        return
    }

    $parts = Split-RemotePath $Path
    Ensure-RemoteDirectory $parts.Parent

    $response = Invoke-CpanelApi2 "Fileman" "mkdir" @{
        path = $parts.Parent
        name = $parts.Name
        permissions = "0755"
    }

    if ($response.cpanelresult.error) {
        throw "Failed to create remote folder '$Path': $($response.cpanelresult.error)"
    }

    $info = Get-FileInfo $Path
    if (-not $info -or -not $info.exists) {
        throw "Remote folder '$Path' was not confirmed after creation."
    }
}

function Save-RemoteTextFile {
    param(
        [string]$Directory,
        [string]$FileName,
        [string]$Content
    )

    $response = Invoke-CpanelUapi "Fileman/save_file_content" @{
        dir = $Directory
        file = $FileName
        content = $Content
    } -Method Post

    Assert-UapiSuccess $response "Failed to save remote file '$Directory/$FileName'."
}

function Upload-RemoteFile {
    param(
        [string]$Directory,
        [string]$LocalPath,
        [string]$FileName
    )

    $curlCommand = Get-Command curl.exe -CommandType Application -ErrorAction SilentlyContinue | Select-Object -First 1
    if (-not $curlCommand) {
        $curlCommand = Get-Command curl -CommandType Application -ErrorAction Stop | Select-Object -First 1
    }

    $curlPath = $curlCommand.Source
    $resolvedLocalPath = (Resolve-Path -LiteralPath $LocalPath).Path
    $uri = "https://$script:CpanelHost`:$script:CpanelPort/execute/Fileman/upload_files"
    $arguments = @(
        "-sS",
        "--request", "POST",
        $uri,
        "--header", "Authorization: Basic $script:CpanelAuthToken",
        "--form", "dir=$Directory",
        "--form", "file-1=@$resolvedLocalPath;filename=$FileName"
    )

    $json = Invoke-CpanelRequestWithRetry -Description "cPanel upload $Directory/$FileName" -Operation {
        $body = & $curlPath @arguments 2>&1
        if ($LASTEXITCODE -ne 0) {
            throw "curl upload failed for '$LocalPath': $body"
        }

        try {
            return ($body | Out-String) | ConvertFrom-Json
        }
        catch {
            throw "Upload response was not valid JSON for '$LocalPath'."
        }
    }

    Assert-UapiSuccess $json "Failed to upload remote file '$Directory/$FileName'."
}

function New-HtaccessContent {
    param([string]$ManagedReleaseId)

    $template = @'
# SuperSites managed static app release switch.
# App: {{APP_ID}}
# Release: {{RELEASE_ID}}
RewriteEngine On
RewriteBase {{REWRITE_BASE}}
RewriteRule ^$ {{RELEASE_FOLDER}}/{{RELEASE_ID}}/index.html [L]
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteCond %{REQUEST_URI} !\.[^/]+$
RewriteRule ^(.+?)/?$ {{RELEASE_FOLDER}}/{{RELEASE_ID}}/$1/index.html [L]
RewriteRule ^(.+)$ {{RELEASE_FOLDER}}/{{RELEASE_ID}}/$1 [L]
'@

    return $template.
        Replace("{{APP_ID}}", $script:Config.AppId).
        Replace("{{RELEASE_ID}}", $ManagedReleaseId).
        Replace("{{REWRITE_BASE}}", $script:BasePath).
        Replace("{{RELEASE_FOLDER}}", $script:Config.ReleaseFolder)
}

function New-PlaceholderRollbackHtaccessContent {
    return @'
# SuperSites managed rollback to bootstrap placeholder.
RewriteEngine Off
'@
}

function Join-Url {
    param(
        [string]$BaseUrl,
        [string]$Path
    )

    return "$($BaseUrl.TrimEnd("/"))/$($Path.TrimStart("/"))"
}

function Invoke-PublicApiGate {
    if (-not $script:Config.ApiEnvName) {
        return
    }

    if ($SkipApiSmoke) {
        Write-Host "$($script:Config.DisplayName) public API smoke skipped by request."
        return
    }

    if ($script:ApiBaseUrl -notmatch "^https://") {
        throw "$($script:Config.DisplayName) API smoke requires HTTPS URL. Received: $script:ApiBaseUrl"
    }

    $headers = @{
        "User-Agent" = "SuperSitesStaticDeployPreflight/1.0"
        "Accept" = "application/json"
    }

    $url = Join-Url $script:ApiBaseUrl $script:Config.ApiSmokePath
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30 -Headers $headers -Method Post -ContentType "application/json" -Body $script:Config.ApiSmokeBody
    if ($response.StatusCode -ne 200 -or $response.Content -notmatch [regex]::Escape($script:Config.ApiSmokeMarker)) {
        throw "$($script:Config.DisplayName) API preflight failed for $url."
    }
    if ($response.Content -match '(?i)<html|Internal Server Error|SuperSites bootstrap placeholder') {
        throw "$($script:Config.DisplayName) API preflight returned an HTML/error response for $url."
    }

    Write-Host "$($script:Config.DisplayName) public API preflight passed for $script:ApiBaseUrl."
}

function Invoke-PublicSmoke {
    if ($SkipSmoke) {
        Write-Host "$($script:Config.DisplayName) public smoke skipped by request."
        return
    }

    $smokeScript = Join-Path $script:RepoRoot "scripts/smoke-static-app-public.ps1"
    $smokeArgs = @{
        AppId = $script:Config.AppId
        PublicBaseUrl = $script:PublicBaseUrl
        ApiBaseUrl = $script:ApiBaseUrl
    }

    if ($SkipApiSmoke) {
        $smokeArgs.SkipApiSmoke = $true
    }

    & $smokeScript @smokeArgs
}

function Invoke-PlaceholderSmoke {
    if ($SkipSmoke) {
        Write-Host "$($script:Config.DisplayName) placeholder smoke skipped by request."
        return
    }

    try {
        $response = Invoke-WebRequest -Uri "$($script:PublicBaseUrl)/" -UseBasicParsing -TimeoutSec 30 -Headers @{
            "User-Agent" = "SuperSitesStaticPlaceholderSmoke/1.0"
            "Accept" = "text/html, */*;q=0.8"
        }

        if ($response.StatusCode -ne 200) {
            throw "Unexpected HTTP status: $($response.StatusCode)"
        }

        if ($response.Content -notmatch "(?i)SuperSites bootstrap placeholder|placeholder|$([regex]::Escape($script:Config.DisplayName))") {
            throw "Placeholder response did not include an expected marker."
        }

        Write-Host "$($script:Config.DisplayName) placeholder smoke passed for $script:PublicBaseUrl."
    }
    catch {
        throw "$($script:Config.DisplayName) placeholder rollback smoke failed: $($_.Exception.Message)"
    }
}

function Switch-ManagedRelease {
    param([string]$ManagedReleaseId)

    $releasePath = Join-RemotePath $script:ReleaseBaseRemotePath $ManagedReleaseId
    $releaseInfo = Get-FileInfo $releasePath
    if (-not $releaseInfo -or -not $releaseInfo.exists) {
        throw "Cannot switch $($script:Config.DisplayName) release. Remote release folder was not found: $releasePath"
    }

    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".htaccess" -Content (New-HtaccessContent -ManagedReleaseId $ManagedReleaseId)
    Write-Host "HostGator release switch points $script:BasePath to $($script:Config.DisplayName) release $ManagedReleaseId."
}

$script:RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$script:Config = Get-StaticHostgatorAppConfig -AppId $AppId
$manifestFullPath = Join-Path $script:RepoRoot $ManifestPath
if (-not (Test-Path -LiteralPath $manifestFullPath -PathType Leaf)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $manifestFullPath | ConvertFrom-Json
$app = $manifest.apps | Where-Object { $_.id -eq $AppId } | Select-Object -First 1
if (-not $app) {
    throw "Deployment manifest does not contain app id '$AppId'."
}

if ($app.kind -ne "nuxt-ssg") {
    throw "Static app deploy supports only nuxt-ssg apps. $AppId is '$($app.kind)'."
}

$script:RemoteBase = $app.remotePath
$script:PublicBaseUrl = $app.publicUrl.TrimEnd("/")
$script:ApiBaseUrl = if ($ApiBaseUrl) { $ApiBaseUrl.TrimEnd("/") } else { [string]$script:Config.ApiBaseUrl }
$script:BasePath = Normalize-StaticBasePath -Value ([Uri]$script:PublicBaseUrl).AbsolutePath -TrailingSlash
$artifactPath = Join-Path $script:RepoRoot $app.buildOutput

if (-not $CpanelHost) {
    $CpanelHost = "opentshost.com"
}

if ($env:SUPERSITES_CPANEL_PORT) {
    $CpanelPort = [int]$env:SUPERSITES_CPANEL_PORT
}

if (-not $CpanelUser -or -not $CpanelPassword) {
    $credentials = Get-CpanelCredentials -Path (Join-Path $script:RepoRoot $CredentialInventoryPath)
    if ($credentials) {
        if (-not $CpanelUser) {
            $CpanelUser = $credentials.User
        }
        if (-not $CpanelPassword) {
            $CpanelPassword = $credentials.Password
        }
    }
}

if (-not $CpanelUser -or -not $CpanelPassword) {
    throw "Set SUPERSITES_CPANEL_USER and SUPERSITES_CPANEL_PASSWORD or provide the ignored credential inventory."
}

$script:CpanelHost = $CpanelHost
$script:CpanelPort = $CpanelPort
$script:CpanelUser = $CpanelUser
$pair = "{0}:{1}" -f $CpanelUser, $CpanelPassword
$script:CpanelAuthToken = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
$script:CpanelHeaders = @{ Authorization = "Basic $script:CpanelAuthToken" }
$script:ReleaseBaseRemotePath = Join-RemotePath $script:RemoteBase $script:Config.ReleaseFolder

if ($RollbackToPlaceholder) {
    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".htaccess" -Content (New-PlaceholderRollbackHtaccessContent)
    Write-Host "HostGator $($script:Config.DisplayName) rolled back to bootstrap placeholder."
    Invoke-PlaceholderSmoke
    return
}

if ($RollbackReleaseId) {
    if ($RollbackReleaseId -notmatch "^[A-Za-z0-9._-]+$") {
        throw "Rollback release id contains unsupported characters."
    }

    Switch-ManagedRelease -ManagedReleaseId $RollbackReleaseId
    Invoke-PublicSmoke
    return
}

Invoke-PublicApiGate

$release = if ($ReleaseId) { $ReleaseId } else { "{0}-{1}" -f (git rev-parse --short=12 HEAD).Trim(), (Get-Date).ToUniversalTime().ToString("yyyyMMddHHmmss") }
if ($release -notmatch "^[A-Za-z0-9._-]+$") {
    throw "Release id contains unsupported characters."
}

if (-not $SkipBuild) {
    & (Join-Path $script:RepoRoot "scripts/build-static-app-hostgator-artifact.ps1") `
        -AppId $script:Config.AppId `
        -ManifestPath $ManifestPath `
        -ApiBaseUrl $script:ApiBaseUrl `
        -ReleaseId $release
}
else {
    & (Join-Path $script:RepoRoot "scripts/validate-static-app-artifact.ps1") `
        -AppId $script:Config.AppId `
        -ArtifactPath $artifactPath `
        -BasePath $script:BasePath `
        -PublicBaseUrl $script:PublicBaseUrl `
        -ApiBaseUrl $script:ApiBaseUrl
}

$artifactFullPath = Resolve-Path $artifactPath
$files = Get-ChildItem -LiteralPath $artifactFullPath -Recurse -File

$disallowedFiles = $files | Where-Object {
    $_.Name -match '^(?:\.env|\.env\..+)$' -or
    $_.Name -match '\.(?:pem|key|p12|pfx)$'
}

if ($disallowedFiles) {
    throw "Refusing to publish disallowed sensitive file names: $($disallowedFiles.FullName -join ', ')"
}

Ensure-RemoteDirectory $script:RemoteBase
Ensure-RemoteDirectory $script:ReleaseBaseRemotePath

$releaseRemotePath = Join-RemotePath $script:ReleaseBaseRemotePath $release
$releaseInfo = Get-FileInfo $releaseRemotePath
if ($releaseInfo -and $releaseInfo.exists) {
    throw "Remote release already exists: $releaseRemotePath"
}

Ensure-RemoteDirectory $releaseRemotePath

$artifactRoot = $artifactFullPath.Path.TrimEnd("\", "/")
$relativeDirectories = $files |
    ForEach-Object { $_.FullName.Substring($artifactRoot.Length).TrimStart("\", "/") } |
    ForEach-Object { (Split-Path $_ -Parent) -replace "\\", "/" } |
    Where-Object { $_ } |
    Sort-Object -Unique

foreach ($relativeDirectory in $relativeDirectories) {
    Ensure-RemoteDirectory (Join-RemotePath $releaseRemotePath $relativeDirectory)
}

$uploaded = 0
foreach ($file in $files) {
    $relativePath = $file.FullName.Substring($artifactRoot.Length).TrimStart("\", "/")
    $relativeDirectory = (Split-Path $relativePath -Parent) -replace "\\", "/"
    $remoteDirectory = Join-RemotePath $releaseRemotePath $relativeDirectory
    Upload-RemoteFile -Directory $remoteDirectory -LocalPath $file.FullName -FileName $file.Name
    $uploaded++
}

$totalBytes = ($files | Measure-Object Length -Sum).Sum
$metadata = [ordered]@{
    schemaVersion = 1
    appId = $script:Config.AppId
    appName = $script:Config.DisplayName
    releaseId = $release
    createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    gitSha = (git rev-parse HEAD).Trim()
    publicBaseUrl = $script:PublicBaseUrl
    apiBaseUrl = $script:ApiBaseUrl
    remotePath = $releaseRemotePath
    fileCount = $files.Count
    uploadedFileCount = $uploaded
    totalBytes = $totalBytes
    preservation = @(
        "Deploy uploads into a new versioned static app release directory.",
        "Remote .env files, bootstrap placeholders and user-managed folders are not deleted or overwritten.",
        "The active release is switched only by the managed .htaccess file in the app folder.",
        "Public smoke is required after the release switch unless explicitly skipped for rollback recovery."
    )
}

Save-RemoteTextFile -Directory $releaseRemotePath -FileName "static-app-release.json" -Content ($metadata | ConvertTo-Json -Depth 5)
Switch-ManagedRelease -ManagedReleaseId $release
Invoke-PublicSmoke

Write-Host "$($script:Config.DisplayName) HostGator deploy completed: release $release, $uploaded files, $totalBytes bytes."
