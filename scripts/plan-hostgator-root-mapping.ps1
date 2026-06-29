param(
    [string]$PublicRootUrl = "https://opentshost.com/",
    [string]$HubUrl = "https://opentshost.com/supersites/",
    [string]$ManifestPath = "",
    [string]$RemoteBase = "",
    [string]$OutputDirectory = "",
    [switch]$ProbeCpanel,
    [switch]$FailIfApplyUnsafe
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $ManifestPath) {
    $ManifestPath = Join-Path $repoRoot "infra/deployment/apps.json"
}
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $repoRoot "artifacts/root-mapping-dry-run"
}

function Join-Url {
    param(
        [string]$Base,
        [string]$Path = ""
    )

    $normalizedBase = $Base.TrimEnd("/")
    $normalizedPath = $Path.TrimStart("/")
    if (-not $normalizedPath) {
        return "$normalizedBase/"
    }

    return "$normalizedBase/$normalizedPath"
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

function New-QueryString {
    param([hashtable]$Parameters)

    $pairs = @()
    foreach ($key in ($Parameters.Keys | Sort-Object)) {
        $encodedKey = [System.Uri]::EscapeDataString([string]$key)
        $encodedValue = [System.Uri]::EscapeDataString([string]$Parameters[$key])
        $pairs += "$encodedKey=$encodedValue"
    }

    return ($pairs -join "&")
}

function Get-HeaderValue {
    param(
        [object]$Headers,
        [string]$Name
    )

    if (-not $Headers) {
        return ""
    }

    try {
        $value = $Headers[$Name]
        if ($null -ne $value) {
            if ($value -is [array]) {
                return ($value -join ", ")
            }

            return [string]$value
        }
    }
    catch {
        $values = $null
        try {
            if ($Headers.TryGetValues($Name, [ref]$values)) {
                return (($values | ForEach-Object { [string]$_ }) -join ", ")
            }
        }
        catch {
            return ""
        }
    }

    return ""
}

function Get-ResponseStatusCode {
    param([object]$Response)

    if (-not $Response) {
        return $null
    }

    try {
        return [int]$Response.StatusCode
    }
    catch {
        return $null
    }
}

function Invoke-HttpProbe {
    param([string]$Url)

    $startedAt = Get-Date
    $result = [ordered]@{
        url = $Url
        status = $null
        finalUrl = $Url
        location = ""
        server = ""
        contentType = ""
        title = ""
        elapsedMs = $null
        error = ""
    }

    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -MaximumRedirection 0 -TimeoutSec 30 -ErrorAction Stop
        $result.status = [int]$response.StatusCode
        if ($response.BaseResponse -and $response.BaseResponse.ResponseUri) {
            $result.finalUrl = [string]$response.BaseResponse.ResponseUri
        }
        $result.location = Get-HeaderValue -Headers $response.Headers -Name "Location"
        $result.server = Get-HeaderValue -Headers $response.Headers -Name "Server"
        $result.contentType = Get-HeaderValue -Headers $response.Headers -Name "Content-Type"
        if ($response.Content -and $response.Content -match "(?is)<title[^>]*>\s*(?<title>.*?)\s*</title>") {
            $result.title = (($Matches["title"] -replace "\s+", " ").Trim())
        }
    }
    catch {
        $exceptionResponse = $null
        if ($_.Exception -and ($_.Exception.PSObject.Properties.Name -contains "Response")) {
            $exceptionResponse = $_.Exception.Response
        }

        $statusCode = Get-ResponseStatusCode -Response $exceptionResponse
        if ($statusCode) {
            $result.status = $statusCode
            $result.location = Get-HeaderValue -Headers $exceptionResponse.Headers -Name "Location"
            $result.server = Get-HeaderValue -Headers $exceptionResponse.Headers -Name "Server"
            $result.contentType = Get-HeaderValue -Headers $exceptionResponse.Headers -Name "Content-Type"
        }
        else {
            $result.error = $_.Exception.Message
        }
    }
    finally {
        $result.elapsedMs = [int]((Get-Date) - $startedAt).TotalMilliseconds
    }

    return [pscustomobject]$result
}

function Invoke-CpanelUapi {
    param(
        [string]$Path,
        [hashtable]$Parameters = @{}
    )

    $hostName = $env:SUPERSITES_CPANEL_HOST
    $port = $env:SUPERSITES_CPANEL_PORT
    $user = $env:SUPERSITES_CPANEL_USER
    $password = $env:SUPERSITES_CPANEL_PASSWORD

    if (-not $hostName -or -not $port -or -not $user -or -not $password) {
        throw "Missing cPanel environment variables. Expected SUPERSITES_CPANEL_HOST, SUPERSITES_CPANEL_PORT, SUPERSITES_CPANEL_USER and SUPERSITES_CPANEL_PASSWORD."
    }

    $authBytes = [Text.Encoding]::ASCII.GetBytes("${user}:${password}")
    $headers = @{
        Authorization = "Basic " + [Convert]::ToBase64String($authBytes)
    }

    $uri = "https://$hostName`:$port/execute/$Path"
    $query = New-QueryString $Parameters
    if ($query) {
        $uri = "$uri`?$query"
    }

    return Invoke-RestMethod -Method Get -Uri $uri -Headers $headers -TimeoutSec 120
}

function Get-CpanelFileInfo {
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

function Get-CpanelFileContent {
    param([string]$Path)

    $splitPath = $Path.TrimEnd("/")
    $slashIndex = $splitPath.LastIndexOf("/")
    if ($slashIndex -le 0) {
        return $null
    }

    $dir = $splitPath.Substring(0, $slashIndex)
    $file = $splitPath.Substring($slashIndex + 1)

    try {
        $response = Invoke-CpanelUapi "Fileman/get_file_content" @{
            dir = $dir
            file = $file
        }

        if ($response.status -eq 1) {
            return [string]$response.data.content
        }
    }
    catch {
        return $null
    }

    return $null
}

function New-RootBridgeHtaccessContent {
    return @'
# SuperSites managed root bridge.
RewriteEngine On
RewriteRule ^$ /supersites/ [R=302,L]
'@
}

if (-not (Test-Path -LiteralPath $ManifestPath)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $ManifestPath | ConvertFrom-Json
if (-not $RemoteBase) {
    $RemoteBase = [string]$manifest.remoteBase
}

$publicRoot = $PublicRootUrl.TrimEnd("/")
$hubProbe = Invoke-HttpProbe -Url $HubUrl
$rootProbe = Invoke-HttpProbe -Url $PublicRootUrl

$appProbes = @()
foreach ($app in $manifest.apps) {
    if ($app.id -eq "supersite") {
        continue
    }

    $directUrl = Join-Url -Base $publicRoot -Path "$($app.id)/"
    $fallbackUrl = [string]$app.publicUrl

    $appProbes += [pscustomobject]@{
        id = [string]$app.id
        name = [string]$app.name
        directUrl = Invoke-HttpProbe -Url $directUrl
        fallbackUrl = Invoke-HttpProbe -Url $fallbackUrl
    }
}

$rootPath = $RemoteBase.TrimEnd("/")
$rootPath = $rootPath.Substring(0, $rootPath.LastIndexOf("/"))
$rootHtaccessPath = Join-RemotePath -Base $rootPath -Child ".htaccess"

$cpanelProbe = [ordered]@{
    requested = [bool]$ProbeCpanel
    status = "skipped"
    rootPath = $rootPath
    rootHtaccessPath = $rootHtaccessPath
    rootHtaccessExists = $null
    rootHtaccessManaged = $null
    rootHtaccessContentReadable = $null
    note = "Run with -ProbeCpanel in an environment that has cPanel secrets to inspect root .htaccess metadata without mutating production."
}

if ($ProbeCpanel) {
    try {
        $rootInfo = Get-CpanelFileInfo -Path $rootHtaccessPath
        $exists = $false
        if ($rootInfo -and $rootInfo.exists) {
            $exists = $true
        }

        $content = $null
        $managed = $false
        $readable = $false
        if ($exists) {
            $content = Get-CpanelFileContent -Path $rootHtaccessPath
            $readable = $null -ne $content
            $managed = $readable -and $content -match "(?im)^\s*#\s*SuperSites managed root bridge\."
        }

        $cpanelProbe.status = "checked"
        $cpanelProbe.rootHtaccessExists = $exists
        $cpanelProbe.rootHtaccessManaged = $managed
        $cpanelProbe.rootHtaccessContentReadable = $readable
        $cpanelProbe.note = if ($exists) {
            "Root .htaccess exists. Content was not written to the report."
        }
        else {
            "Root .htaccess was not found through cPanel metadata."
        }
    }
    catch {
        $cpanelProbe.status = "failed"
        $cpanelProbe.note = $_.Exception.Message
    }
}

$rootRedirectsToHub = $false
if ($rootProbe.status -ge 300 -and $rootProbe.status -lt 400 -and $rootProbe.location -match "/supersites/?$") {
    $rootRedirectsToHub = $true
}

$fallbackOk = ($hubProbe.status -ge 200 -and $hubProbe.status -lt 300)
$rootIsCurrentlyMapped = $rootRedirectsToHub
$directMappedCount = @($appProbes | Where-Object { $_.directUrl.status -ge 200 -and $_.directUrl.status -lt 400 }).Count

$blockers = @()
if (-not $fallbackOk) {
    $blockers += "Hub fallback URL did not return 2xx."
}
if ($cpanelProbe.status -eq "skipped") {
    $blockers += "Root .htaccess was not inspected through cPanel in this dry-run."
}
elseif ($cpanelProbe.status -eq "failed") {
    $blockers += "cPanel root .htaccess probe failed."
}
elseif ($cpanelProbe.rootHtaccessExists -and -not $cpanelProbe.rootHtaccessManaged) {
    $blockers += "Root .htaccess exists and is not confirmed as SuperSites-managed."
}

$applyClassification = "blocked"
if ($rootIsCurrentlyMapped) {
    $applyClassification = "already-mapped"
}
elseif ($blockers.Count -eq 0) {
    $applyClassification = "safe-candidate"
}

$recommendedAction = switch ($applyClassification) {
    "already-mapped" { "Keep production unchanged; root already redirects to /supersites/." }
    "safe-candidate" { "Keep production unchanged in this sprint. A future governed deploy may run publish-supersite-hostgator.ps1 -EnableRootRedirect after Quality Gate and public smokes pass." }
    default { "Keep production unchanged. Resolve blockers before any root bridge; do not use -ForceRootRedirect without explicit review of root rules." }
}

$runId = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH-mm-ssZ")
$gitSha = ""
try {
    $gitSha = (git -C $repoRoot rev-parse --short HEAD 2>$null).Trim()
}
catch {
    $gitSha = "unknown"
}

$plan = [ordered]@{
    schemaVersion = 1
    runId = $runId
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    gitSha = $gitSha
    dryRunOnly = $true
    mutatesProduction = $false
    publicRootUrl = $PublicRootUrl
    hubUrl = $HubUrl
    remoteBase = $RemoteBase
    rootPath = $rootPath
    rootHtaccessPath = $rootHtaccessPath
    proposedRootBridgeHtaccess = New-RootBridgeHtaccessContent
    publicProbes = [ordered]@{
        root = $rootProbe
        hub = $hubProbe
        apps = $appProbes
    }
    cpanelProbe = [pscustomobject]$cpanelProbe
    decision = [ordered]@{
        fallbackHubOk = $fallbackOk
        rootCurrentlyRedirectsToHub = $rootRedirectsToHub
        directAppFoldersMapped = $directMappedCount
        applyClassification = $applyClassification
        blockers = $blockers
        recommendedAction = $recommendedAction
    }
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$jsonPath = Join-Path $OutputDirectory "root-mapping-dry-run.json"
$markdownPath = Join-Path $OutputDirectory "root-mapping-dry-run.md"

$plan | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$lines = @()
$lines += "# HostGator Root Mapping Dry-Run"
$lines += ""
$lines += '- Run ID: `' + $runId + '`'
$lines += '- Git SHA: `' + $gitSha + '`'
$lines += "- Dry-run only: yes"
$lines += "- Production mutation: no"
$lines += '- Public root: `' + $PublicRootUrl + '`'
$lines += '- Hub fallback: `' + $HubUrl + '`'
$lines += '- Remote base: `' + $RemoteBase + '`'
$lines += '- Root path: `' + $rootPath + '`'
$lines += '- Root .htaccess path: `' + $rootHtaccessPath + '`'
$lines += ""
$lines += "## Public Probes"
$lines += ""
$lines += "| Surface | URL | Status | Location | Title |"
$lines += "|---|---|---:|---|---|"
$lines += "| Root | $($rootProbe.url) | $($rootProbe.status) | $($rootProbe.location) | $($rootProbe.title) |"
$lines += "| Hub fallback | $($hubProbe.url) | $($hubProbe.status) | $($hubProbe.location) | $($hubProbe.title) |"
foreach ($appProbe in $appProbes) {
    $lines += "| Direct $($appProbe.id) | $($appProbe.directUrl.url) | $($appProbe.directUrl.status) | $($appProbe.directUrl.location) | $($appProbe.directUrl.title) |"
    $lines += "| Fallback $($appProbe.id) | $($appProbe.fallbackUrl.url) | $($appProbe.fallbackUrl.status) | $($appProbe.fallbackUrl.location) | $($appProbe.fallbackUrl.title) |"
}
$lines += ""
$lines += "## cPanel Probe"
$lines += ""
$lines += "- Requested: $($cpanelProbe.requested)"
$lines += "- Status: $($cpanelProbe.status)"
$lines += "- Root .htaccess exists: $($cpanelProbe.rootHtaccessExists)"
$lines += "- Root .htaccess managed by SuperSites: $($cpanelProbe.rootHtaccessManaged)"
$lines += "- Content readable: $($cpanelProbe.rootHtaccessContentReadable)"
$lines += "- Note: $($cpanelProbe.note)"
$lines += ""
$lines += "## Proposed Root Bridge"
$lines += ""
$lines += '```apache'
$lines += (New-RootBridgeHtaccessContent)
$lines += '```'
$lines += ""
$lines += "## Decision"
$lines += ""
$lines += "- Hub fallback 2xx: $fallbackOk"
$lines += "- Root currently redirects to hub: $rootRedirectsToHub"
$lines += "- Direct app folders mapped: $directMappedCount"
$lines += '- Classification: `' + $applyClassification + '`'
if ($blockers.Count -gt 0) {
    $lines += "- Blockers:"
    foreach ($blocker in $blockers) {
        $lines += "  - $blocker"
    }
}
else {
    $lines += "- Blockers: none"
}
$lines += "- Recommended action: $recommendedAction"

$lines | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "Root mapping dry-run complete."
Write-Host "JSON: $jsonPath"
Write-Host "Markdown: $markdownPath"
Write-Host "Classification: $applyClassification"
if ($blockers.Count -gt 0) {
    Write-Host "Blockers: $($blockers -join '; ')"
}

if ($FailIfApplyUnsafe -and $applyClassification -eq "blocked") {
    throw "Root mapping apply is unsafe in this dry-run: $($blockers -join '; ')"
}
