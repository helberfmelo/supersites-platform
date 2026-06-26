param(
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$ArtifactPath = "apps/supersite/.output/public",
    [string]$CredentialInventoryPath = "docs/credentials/credentials.local.md",
    [string]$CpanelHost = $env:SUPERSITES_CPANEL_HOST,
    [int]$CpanelPort = 2083,
    [string]$CpanelUser = $env:SUPERSITES_CPANEL_USER,
    [string]$CpanelPassword = $env:SUPERSITES_CPANEL_PASSWORD,
    [string]$ReleaseId = "",
    [string]$RollbackReleaseId = "",
    [switch]$RollbackToPlaceholder,
    [switch]$SkipBuild,
    [switch]$SkipSmoke,
    [switch]$EnableRootRedirect,
    [switch]$ForceRootRedirect
)

$ErrorActionPreference = "Stop"

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

        return Invoke-RestMethod -Method Get -Uri $uri -Headers $script:CpanelHeaders -TimeoutSec 90
    }

    return Invoke-RestMethod -Method Post -Uri $uri -Headers $script:CpanelHeaders -Body $Parameters -ContentType "application/x-www-form-urlencoded" -TimeoutSec 90
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
    return Invoke-RestMethod -Method Get -Uri $uri -Headers $script:CpanelHeaders -TimeoutSec 90
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

    $curlCommand = Get-Command curl.exe -ErrorAction SilentlyContinue
    if (-not $curlCommand) {
        $curlCommand = Get-Command curl -CommandType Application -ErrorAction Stop
    }

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

    $body = & $curlCommand.Source @arguments 2>&1
    if ($LASTEXITCODE -ne 0) {
        throw "curl upload failed for '$LocalPath': $body"
    }

    $json = ($body | Out-String) | ConvertFrom-Json
    Assert-UapiSuccess $json "Failed to upload remote file '$Directory/$FileName'."
}

function New-HtaccessContent {
    param([string]$ManagedReleaseId)

    $template = @'
# SuperSites managed release switch.
# Release: {{RELEASE_ID}}
RewriteEngine On
RewriteBase /supersites/
RewriteRule ^$ _supersites-releases/{{RELEASE_ID}}/index.html [L]
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]
RewriteCond %{REQUEST_URI} !\.[^/]+$
RewriteRule ^(.+?)/?$ _supersites-releases/{{RELEASE_ID}}/$1/index.html [L]
RewriteRule ^(.+)$ _supersites-releases/{{RELEASE_ID}}/$1 [L]
'@

    return $template.Replace("{{RELEASE_ID}}", $ManagedReleaseId)
}

function New-PlaceholderRollbackHtaccessContent {
    return @'
# SuperSites managed rollback to bootstrap placeholders.
RewriteEngine Off
'@
}

function New-RootRedirectHtaccessContent {
    return @'
# SuperSites managed root bridge.
RewriteEngine On
RewriteRule ^$ /supersites/ [R=302,L]
'@
}

function Switch-ManagedRelease {
    param([string]$ManagedReleaseId)

    $releasePath = Join-RemotePath $script:ReleaseBaseRemotePath $ManagedReleaseId
    $releaseInfo = Get-FileInfo $releasePath
    if (-not $releaseInfo -or -not $releaseInfo.exists) {
        throw "Cannot switch release. Remote release folder was not found: $releasePath"
    }

    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".htaccess" -Content (New-HtaccessContent -ManagedReleaseId $ManagedReleaseId)
    Write-Host "HostGator release switch points /supersites/ to release $ManagedReleaseId."
}

function Enable-RootBridge {
    $rootPath = $script:RemoteBase.TrimEnd("/")
    $rootPath = $rootPath.Substring(0, $rootPath.LastIndexOf("/"))
    $rootHtaccess = Join-RemotePath $rootPath ".htaccess"
    $rootInfo = Get-FileInfo $rootHtaccess

    if ($rootInfo -and $rootInfo.exists -and -not $ForceRootRedirect) {
        throw "Root .htaccess already exists. Re-run with -ForceRootRedirect only after reviewing root rules."
    }

    Save-RemoteTextFile -Directory $rootPath -FileName ".htaccess" -Content (New-RootRedirectHtaccessContent)
    Write-Host "HostGator root bridge enabled: / redirects to /supersites/."
}

function Invoke-PublicSmoke {
    param([string]$RootUrl = "")

    if ($SkipSmoke) {
        Write-Host "Public smoke skipped by request."
        return
    }

    $smokeScript = Join-Path $script:RepoRoot "scripts/smoke-supersite-public.ps1"
    $smokeArgs = @(
        "-PublicBaseUrl", $script:PublicBaseUrl
    )

    if ($RootUrl) {
        $smokeArgs += @("-RootUrl", $RootUrl)
    }

    & $smokeScript @smokeArgs
}

$script:RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$manifestFullPath = Join-Path $script:RepoRoot $ManifestPath
if (-not (Test-Path -LiteralPath $manifestFullPath)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $manifestFullPath | ConvertFrom-Json
$app = $manifest.apps | Where-Object { $_.id -eq "supersite" } | Select-Object -First 1
if (-not $app) {
    throw "Deployment manifest does not contain the supersite app."
}

$script:RemoteBase = $app.remotePath
$script:PublicBaseUrl = $app.publicUrl.TrimEnd("/")
$basePath = ([Uri]$script:PublicBaseUrl).AbsolutePath.TrimEnd("/")
if (-not $basePath) {
    $basePath = "/"
}

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
$script:ReleaseBaseRemotePath = Join-RemotePath $script:RemoteBase "_supersites-releases"

if ($RollbackToPlaceholder) {
    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".htaccess" -Content (New-PlaceholderRollbackHtaccessContent)
    Write-Host "HostGator /supersites/ rolled back to bootstrap placeholders."
    Invoke-PublicSmoke
    return
}

if ($RollbackReleaseId) {
    if ($RollbackReleaseId -notmatch "^[A-Za-z0-9._-]+$") {
        throw "Rollback release id contains unsupported characters."
    }

    Switch-ManagedRelease -ManagedReleaseId $RollbackReleaseId
    $rollbackRootSmokeUrl = if ($EnableRootRedirect) { "https://opentshost.com/" } else { "" }
    Invoke-PublicSmoke -RootUrl $rollbackRootSmokeUrl
    return
}

$release = if ($ReleaseId) { $ReleaseId } else { "{0}-{1}" -f (git rev-parse --short=12 HEAD).Trim(), (Get-Date).ToUniversalTime().ToString("yyyyMMddHHmmss") }
if ($release -notmatch "^[A-Za-z0-9._-]+$") {
    throw "Release id contains unsupported characters."
}

if (-not $SkipBuild) {
    & (Join-Path $script:RepoRoot "scripts/build-supersite-hostgator-artifact.ps1") `
        -BasePath $basePath `
        -PublicBaseUrl $script:PublicBaseUrl `
        -ReleaseId $release
}
else {
    & (Join-Path $script:RepoRoot "scripts/validate-supersite-static-artifact.ps1") `
        -ArtifactPath (Join-Path $script:RepoRoot $ArtifactPath) `
        -BasePath $basePath `
        -PublicBaseUrl $script:PublicBaseUrl
}

$artifactFullPath = Resolve-Path (Join-Path $script:RepoRoot $ArtifactPath)
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
    appId = "supersite"
    releaseId = $release
    createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    gitSha = (git rev-parse HEAD).Trim()
    publicBaseUrl = $script:PublicBaseUrl
    remotePath = $releaseRemotePath
    fileCount = $files.Count
    uploadedFileCount = $uploaded
    totalBytes = $totalBytes
    preservation = @(
        "Deploy uploads into a new versioned release directory.",
        "Remote .env files, placeholders and user-managed folders are not deleted or overwritten.",
        "The active release is switched only by the managed .htaccess file in /supersites/."
    )
}

Save-RemoteTextFile -Directory $releaseRemotePath -FileName "supersites-release.json" -Content ($metadata | ConvertTo-Json -Depth 5)
Switch-ManagedRelease -ManagedReleaseId $release

$rootSmokeUrl = ""
if ($EnableRootRedirect) {
    Enable-RootBridge
    $rootSmokeUrl = "https://opentshost.com/"
}

Invoke-PublicSmoke -RootUrl $rootSmokeUrl

Write-Host "SuperSites HostGator deploy completed: release $release, $uploaded files, $totalBytes bytes."
