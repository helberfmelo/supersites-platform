param(
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$ArtifactPath = "artifacts/control-plane-hostgator/release",
    [string]$ZipPath = "artifacts/control-plane-hostgator/control-plane-hostgator.zip",
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
    [string]$ControlPlaneAppKey = $env:SUPERSITES_CONTROL_PLANE_APP_KEY,
    [string]$DatabaseHost = $env:SUPERSITES_CONTROL_PLANE_DB_HOST,
    [string]$DatabasePort = $env:SUPERSITES_CONTROL_PLANE_DB_PORT,
    [string]$DatabaseName = $env:SUPERSITES_CONTROL_PLANE_DB_DATABASE,
    [string]$DatabaseUsername = $env:SUPERSITES_CONTROL_PLANE_DB_USERNAME,
    [string]$DatabasePassword = $env:SUPERSITES_CONTROL_PLANE_DB_PASSWORD,
    [string]$PhpHandler = $env:SUPERSITES_CONTROL_PLANE_PHP_HANDLER
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

function Assert-Api2FileOperationSuccess {
    param(
        [object]$Response,
        [string]$Message
    )

    if ($Response.cpanelresult.error) {
        throw "$Message $($Response.cpanelresult.error)"
    }

    foreach ($dataItem in @($Response.cpanelresult.data)) {
        if ($null -ne $dataItem.result -and [int]$dataItem.result -ne 1) {
            $reason = if ($dataItem.reason) { $dataItem.reason } else { "unknown file operation failure" }
            throw "$Message $reason"
        }
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
        Invoke-RestMethod -Method Get -Uri $uri -Headers $script:CpanelHeaders -TimeoutSec 180
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

function ConvertTo-CpanelHomeRelativePath {
    param([string]$Path)

    $normalized = $Path.TrimStart("/")
    $homePrefix = "^home\d*/$([regex]::Escape($script:CpanelUser))/"
    if ($normalized -match $homePrefix) {
        return $normalized -replace $homePrefix, ""
    }

    return $normalized
}

function Expand-RemoteZip {
    param(
        [string]$RemoteZipPath,
        [string]$DestinationPath
    )

    $response = Invoke-CpanelApi2 "Fileman" "fileop" @{
        op = "extract"
        sourcefiles = $RemoteZipPath
        destfiles = $DestinationPath
        doubledecode = "1"
    }

    Assert-Api2FileOperationSuccess $response "Failed to extract remote control-plane zip."
}

function Remove-RemoteFileToTrash {
    param([string]$RemotePath)

    $source = ConvertTo-CpanelHomeRelativePath $RemotePath
    $response = Invoke-CpanelApi2 "Fileman" "fileop" @{
        op = "trash"
        sourcefiles = $source
        doubledecode = "1"
    }

    Assert-Api2FileOperationSuccess $response "Failed to move temporary remote zip to trash."
}

function Get-RequiredSetting {
    param(
        [string]$Name,
        [string]$Value
    )

    if ([string]::IsNullOrWhiteSpace($Value)) {
        throw "Missing required production setting: $Name. Provide it through GitHub environment secrets or ignored local inputs."
    }

    return $Value
}

function ConvertTo-DotenvValue {
    param([string]$Value)

    if ($null -eq $Value) {
        return ""
    }

    if ($Value -match "^[A-Za-z0-9_./:@+-]+$") {
        return $Value
    }

    $escaped = $Value.Replace("\", "\\").Replace('"', '\"')
    return '"' + $escaped + '"'
}

function New-ControlPlaneEnvContent {
    $appKey = Get-RequiredSetting -Name "SUPERSITES_CONTROL_PLANE_APP_KEY" -Value $ControlPlaneAppKey
    $dbName = Get-RequiredSetting -Name "SUPERSITES_CONTROL_PLANE_DB_DATABASE" -Value $DatabaseName
    $dbUser = Get-RequiredSetting -Name "SUPERSITES_CONTROL_PLANE_DB_USERNAME" -Value $DatabaseUsername
    $dbPass = Get-RequiredSetting -Name "SUPERSITES_CONTROL_PLANE_DB_PASSWORD" -Value $DatabasePassword
    $dbHost = if ($DatabaseHost) { $DatabaseHost } else { "localhost" }
    $dbPort = if ($DatabasePort) { $DatabasePort } else { "3306" }

    $settings = [ordered]@{
        APP_NAME = "SuperSites Control Plane"
        APP_ENV = "production"
        APP_KEY = $appKey
        APP_DEBUG = "false"
        APP_URL = $script:PublicBaseUrl
        APP_LOCALE = "en"
        APP_FALLBACK_LOCALE = "en"
        APP_FAKER_LOCALE = "en_US"
        BCRYPT_ROUNDS = "12"
        LOG_CHANNEL = "single"
        LOG_LEVEL = "warning"
        DB_CONNECTION = "mysql"
        DB_HOST = $dbHost
        DB_PORT = $dbPort
        DB_DATABASE = $dbName
        DB_USERNAME = $dbUser
        DB_PASSWORD = $dbPass
        SESSION_DRIVER = "file"
        SESSION_LIFETIME = "120"
        SESSION_ENCRYPT = "false"
        SESSION_PATH = "/"
        SESSION_DOMAIN = "null"
        BROADCAST_CONNECTION = "log"
        FILESYSTEM_DISK = "local"
        QUEUE_CONNECTION = "sync"
        CACHE_STORE = "file"
        REDIS_CLIENT = "predis"
        REDIS_HOST = "127.0.0.1"
        REDIS_PASSWORD = "null"
        REDIS_PORT = "6381"
        MAIL_MAILER = "log"
        MAIL_FROM_ADDRESS = "ops@opentshost.com"
        MAIL_FROM_NAME = "SuperSites"
        SUPERSITES_HEALTH_CHECK_CONNECTIONS = "false"
        NETPROBE_ALERT_WEBHOOK_ENABLED = "false"
    }

    $lines = @()
    foreach ($entry in $settings.GetEnumerator()) {
        $lines += "$($entry.Key)=$(ConvertTo-DotenvValue ([string]$entry.Value))"
    }

    return ($lines -join "`n") + "`n"
}

function Get-ControlPlanePhpHandler {
    $handler = if ($PhpHandler) { $PhpHandler } else { "ea-php84" }
    if ($handler -notmatch "^ea-php8[4-9]$") {
        throw "Unsupported control-plane PHP handler '$handler'. Expected a cPanel EA PHP handler such as ea-php84."
    }

    return $handler
}

function New-HtaccessContent {
    $handler = Get-ControlPlanePhpHandler
    return @"
# SuperSites managed Control Plane release switch.
DirectoryIndex index.php index.html
<IfModule mime_module>
    AddHandler application/x-httpd-$handler .php .php8 .phtml
</IfModule>
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /supersites/control-plane/
    RewriteRule ^index\.php$ - [L]
    RewriteRule ^.*$ index.php [L,QSA]
</IfModule>
"@
}

function New-ReleasesDenyHtaccessContent {
    return @'
# SuperSites managed Control Plane release protection.
<IfModule mod_authz_core.c>
    Require all denied
</IfModule>
<IfModule !mod_authz_core.c>
    Order allow,deny
    Deny from all
</IfModule>
'@
}

function New-ManagedFrontControllerContent {
    param([string]$ManagedReleaseId)

    $template = @'
<?php
// SuperSites managed Control Plane release switch.
// Release: {{RELEASE_ID}}

$publicBasePath = '/supersites/control-plane';
$releasePublicPath = __DIR__ . '/_control-plane-releases/{{RELEASE_ID}}/public';

if (! is_file($releasePublicPath . '/index.php')) {
    http_response_code(503);
    header('Content-Type: text/plain; charset=utf-8');
    header('X-Robots-Tag: noindex, nofollow');
    echo 'SuperSites control-plane release is unavailable.';
    exit;
}

$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['PHP_SELF'] = '/index.php';
$_SERVER['SCRIPT_FILENAME'] = $releasePublicPath . '/index.php';
if (isset($_SERVER['REQUEST_URI'])) {
    if ($_SERVER['REQUEST_URI'] === $publicBasePath) {
        $_SERVER['REQUEST_URI'] = '/';
    } elseif (str_starts_with($_SERVER['REQUEST_URI'], $publicBasePath . '/')) {
        $_SERVER['REQUEST_URI'] = substr($_SERVER['REQUEST_URI'], strlen($publicBasePath));
    }

    $requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $_SERVER['PATH_INFO'] = $requestPath && $requestPath !== '/' ? $requestPath : '';
    $_SERVER['ORIG_PATH_INFO'] = $_SERVER['PATH_INFO'];
}

chdir($releasePublicPath);
require $releasePublicPath . '/index.php';
'@

    return $template.Replace("{{RELEASE_ID}}", $ManagedReleaseId)
}

function New-PlaceholderRollbackHtaccessContent {
    return @'
# SuperSites managed rollback to Control Plane bootstrap placeholder.
DirectoryIndex index.html index.php
RewriteEngine Off
'@
}

function New-PlaceholderFrontControllerContent {
    return @'
<?php
http_response_code(503);
header('Content-Type: text/plain; charset=utf-8');
header('X-Robots-Tag: noindex, nofollow');
echo 'SuperSites control-plane bootstrap placeholder.';
'@
}

function Invoke-PublicSmoke {
    if ($SkipSmoke) {
        Write-Host "Control-plane public smoke skipped by request."
        return
    }

    $smokeScript = Join-Path $script:RepoRoot "scripts/smoke-control-plane-public.ps1"
    & $smokeScript -PublicBaseUrl $script:PublicBaseUrl
}

function Invoke-PlaceholderSmoke {
    if ($SkipSmoke) {
        Write-Host "Control-plane placeholder smoke skipped by request."
        return
    }

    $response = Invoke-WebRequest -Uri $script:PublicBaseUrl -UseBasicParsing -TimeoutSec 30 -Headers @{
        "User-Agent" = "SuperSitesControlPlaneRollbackSmoke/1.0"
    }

    if ($response.StatusCode -ne 200 -or $response.Content -notmatch "(?i)SuperSites bootstrap placeholder|noindex") {
        throw "Control-plane placeholder rollback smoke failed for $script:PublicBaseUrl."
    }
}

function Switch-ManagedRelease {
    param([string]$ManagedReleaseId)

    $releasePath = Join-RemotePath $script:ReleaseBaseRemotePath $ManagedReleaseId
    foreach ($requiredPath in @(
        $releasePath,
        (Join-RemotePath $releasePath "artisan"),
        (Join-RemotePath $releasePath ".env"),
        (Join-RemotePath $releasePath "public/index.php"),
        (Join-RemotePath $releasePath "vendor/autoload.php")
    )) {
        $info = Get-FileInfo $requiredPath
        if (-not $info -or -not $info.exists) {
            throw "Cannot switch control-plane release. Remote release path was not found: $requiredPath"
        }
    }

    Save-RemoteTextFile -Directory $script:RemoteBase -FileName "index.php" -Content (New-ManagedFrontControllerContent -ManagedReleaseId $ManagedReleaseId)
    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".htaccess" -Content (New-HtaccessContent)
    Write-Host "HostGator release switch points /supersites/control-plane/ to release $ManagedReleaseId."
}

$script:RepoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$manifestFullPath = Join-Path $script:RepoRoot $ManifestPath
if (-not (Test-Path -LiteralPath $manifestFullPath)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $manifestFullPath | ConvertFrom-Json
$app = $manifest.apps | Where-Object { $_.id -eq "control-plane" } | Select-Object -First 1
if (-not $app) {
    throw "Deployment manifest does not contain the control-plane app."
}

$script:RemoteBase = $app.remotePath
$script:PublicBaseUrl = $app.publicUrl.TrimEnd("/")
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
$script:ReleaseBaseRemotePath = Join-RemotePath $script:RemoteBase "_control-plane-releases"

if ($RollbackToPlaceholder) {
    Save-RemoteTextFile -Directory $script:RemoteBase -FileName "index.php" -Content (New-PlaceholderFrontControllerContent)
    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".htaccess" -Content (New-PlaceholderRollbackHtaccessContent)
    Write-Host "HostGator /supersites/control-plane/ rolled back to bootstrap placeholder."
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

$release = if ($ReleaseId) { $ReleaseId } else { "{0}-{1}" -f (git rev-parse --short=12 HEAD).Trim(), (Get-Date).ToUniversalTime().ToString("yyyyMMddHHmmss") }
if ($release -notmatch "^[A-Za-z0-9._-]+$") {
    throw "Release id contains unsupported characters."
}

if (-not $SkipBuild) {
    & (Join-Path $script:RepoRoot "scripts/build-control-plane-hostgator-artifact.ps1") `
        -ArtifactPath $ArtifactPath `
        -ZipPath $ZipPath `
        -ReleaseId $release `
        -PublicBaseUrl "$script:PublicBaseUrl/"
}
else {
    & (Join-Path $script:RepoRoot "scripts/validate-control-plane-artifact.ps1") `
        -ArtifactPath $ArtifactPath `
        -ZipPath $ZipPath `
        -PublicBaseUrl "$script:PublicBaseUrl/" `
        -ReleaseId $release
}

$artifactFullPath = Resolve-Path (Join-Path $script:RepoRoot $ArtifactPath)
$zipFullPath = Resolve-Path (Join-Path $script:RepoRoot $ZipPath)
$artifactFiles = Get-ChildItem -LiteralPath $artifactFullPath -Recurse -File
$disallowedFiles = $artifactFiles | Where-Object {
    $_.Name -match '^(?:\.env|\.env\..+)$' -or
    $_.Name -match '\.(?:pem|key|p12|pfx)$'
}

if ($disallowedFiles) {
    throw "Refusing to publish disallowed sensitive file names: $($disallowedFiles.FullName -join ', ')"
}

$releaseEnvContent = New-ControlPlaneEnvContent

Ensure-RemoteDirectory $script:RemoteBase
Ensure-RemoteDirectory $script:ReleaseBaseRemotePath
Save-RemoteTextFile -Directory $script:ReleaseBaseRemotePath -FileName ".htaccess" -Content (New-ReleasesDenyHtaccessContent)

$baseEnvInfo = Get-FileInfo (Join-RemotePath $script:RemoteBase ".env")
if ($baseEnvInfo -and $baseEnvInfo.exists) {
    Write-Host "Remote control-plane base .env already exists and was preserved."
}
else {
    Save-RemoteTextFile -Directory $script:RemoteBase -FileName ".env" -Content $releaseEnvContent
    Write-Host "Remote control-plane base .env created from GitHub/local secret inputs."
}

$releaseRemotePath = Join-RemotePath $script:ReleaseBaseRemotePath $release
$releaseInfo = Get-FileInfo $releaseRemotePath
if ($releaseInfo -and $releaseInfo.exists) {
    throw "Remote control-plane release already exists: $releaseRemotePath"
}

Ensure-RemoteDirectory $releaseRemotePath

$zipName = Split-Path $zipFullPath -Leaf
$remoteZipPath = Join-RemotePath $releaseRemotePath $zipName
Upload-RemoteFile -Directory $releaseRemotePath -LocalPath $zipFullPath -FileName $zipName
$remoteZipInfo = Get-FileInfo $remoteZipPath
if (-not $remoteZipInfo -or -not $remoteZipInfo.exists) {
    throw "Remote control-plane zip upload was not confirmed: $remoteZipPath"
}

Expand-RemoteZip -RemoteZipPath $remoteZipPath -DestinationPath $releaseRemotePath

Save-RemoteTextFile -Directory $releaseRemotePath -FileName ".env" -Content $releaseEnvContent

foreach ($requiredPath in @(
    (Join-RemotePath $releaseRemotePath "artisan"),
    (Join-RemotePath $releaseRemotePath "bootstrap/app.php"),
    (Join-RemotePath $releaseRemotePath "public/index.php"),
    (Join-RemotePath $releaseRemotePath "vendor/autoload.php")
)) {
    $info = Get-FileInfo $requiredPath
    if (-not $info -or -not $info.exists) {
        throw "Remote extracted control-plane release is missing required file: $requiredPath"
    }
}

Remove-RemoteFileToTrash -RemotePath $remoteZipPath

$metadata = [ordered]@{
    schemaVersion = 1
    appId = "control-plane"
    releaseId = $release
    createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")
    gitSha = (git rev-parse HEAD).Trim()
    publicBaseUrl = $script:PublicBaseUrl
    remotePath = $releaseRemotePath
    fileCount = $artifactFiles.Count
    totalBytes = ($artifactFiles | Measure-Object Length -Sum).Sum
    preservation = @(
        "Deploy uploads a no-secret ZIP into a new versioned release directory, extracts it remotely, verifies required Laravel files, then trashes the temporary ZIP.",
        "Remote base .env is created only if missing and otherwise preserved.",
        "Each release receives its .env from GitHub/local secret inputs; no .env is included in the artifact.",
        "The active release is switched through managed index.php and .htaccess files in /supersites/control-plane/.",
        "Database migrations are not run automatically by this public API release script."
    )
}

Save-RemoteTextFile -Directory $releaseRemotePath -FileName "control-plane-release.json" -Content ($metadata | ConvertTo-Json -Depth 5)
Switch-ManagedRelease -ManagedReleaseId $release
Invoke-PublicSmoke

Write-Host "Control-plane HostGator deploy completed: release $release, $($artifactFiles.Count) files, $($metadata.totalBytes) bytes."
