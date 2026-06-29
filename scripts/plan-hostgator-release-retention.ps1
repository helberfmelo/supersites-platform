param(
    [string]$ManifestPath = "",
    [string]$OutputDirectory = "",
    [int]$KeepNewest = 3,
    [int]$KeepDays = 14,
    [switch]$ProbeCpanel,
    [switch]$FailOnProbeError
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $ManifestPath) {
    $ManifestPath = Join-Path $repoRoot "infra/deployment/apps.json"
}
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $repoRoot "artifacts/hostgator-retention-dry-run"
}

if ($KeepNewest -lt 1) {
    throw "KeepNewest must be at least 1."
}
if ($KeepDays -lt 0) {
    throw "KeepDays must be 0 or greater."
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

function Invoke-CpanelApi2 {
    param(
        [string]$Module,
        [string]$Function,
        [hashtable]$Parameters = @{}
    )

    $hostName = $env:SUPERSITES_CPANEL_HOST
    $port = $env:SUPERSITES_CPANEL_PORT
    $user = $env:SUPERSITES_CPANEL_USER
    $password = $env:SUPERSITES_CPANEL_PASSWORD

    if (-not $hostName -or -not $port -or -not $user -or -not $password) {
        throw "Missing cPanel environment variables. Expected SUPERSITES_CPANEL_HOST, SUPERSITES_CPANEL_PORT, SUPERSITES_CPANEL_USER and SUPERSITES_CPANEL_PASSWORD."
    }

    $baseParameters = @{
        cpanel_jsonapi_user = $user
        cpanel_jsonapi_apiversion = "2"
        cpanel_jsonapi_module = $Module
        cpanel_jsonapi_func = $Function
    }

    foreach ($key in $Parameters.Keys) {
        $baseParameters[$key] = $Parameters[$key]
    }

    $authBytes = [Text.Encoding]::ASCII.GetBytes("${user}:${password}")
    $headers = @{
        Authorization = "Basic " + [Convert]::ToBase64String($authBytes)
    }

    $uri = "https://$hostName`:$port/json-api/cpanel?" + (New-QueryString $baseParameters)
    return Invoke-RestMethod -Method Get -Uri $uri -Headers $headers -TimeoutSec 120
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

function Convert-EntryTimestamp {
    param([object]$Value)

    if ($null -eq $Value -or [string]$Value -eq "") {
        return $null
    }

    try {
        $numeric = [int64]$Value
        if ($numeric -gt 0) {
            return ([DateTimeOffset]::FromUnixTimeSeconds($numeric)).UtcDateTime
        }
    }
    catch {
    }

    try {
        return ([DateTime]::Parse([string]$Value)).ToUniversalTime()
    }
    catch {
        return $null
    }
}

function Convert-CpanelEntry {
    param(
        [object]$Entry,
        [string]$BasePath
    )

    $name = ""
    foreach ($propertyName in @("file", "name", "filename")) {
        if ($Entry.PSObject.Properties.Name -contains $propertyName -and $Entry.$propertyName) {
            $name = [string]$Entry.$propertyName
            break
        }
    }

    if (-not $name) {
        return $null
    }

    $type = ""
    if ($Entry.PSObject.Properties.Name -contains "type") {
        $type = [string]$Entry.type
    }

    $isDirectory = $false
    if ($Entry.PSObject.Properties.Name -contains "isdir") {
        $isDirectory = [bool]$Entry.isdir
    }
    elseif ($Entry.PSObject.Properties.Name -contains "dir") {
        $isDirectory = [bool]$Entry.dir
    }
    elseif ($type -match "(?i)dir|folder") {
        $isDirectory = $true
    }

    $mtime = $null
    foreach ($propertyName in @("mtime", "modified", "ctime")) {
        if ($Entry.PSObject.Properties.Name -contains $propertyName) {
            $mtime = Convert-EntryTimestamp -Value $Entry.$propertyName
            if ($mtime) {
                break
            }
        }
    }

    return [pscustomobject]@{
        name = $name
        path = Join-RemotePath -Base $BasePath -Child $name
        isDirectory = $isDirectory
        type = $type
        lastModifiedUtc = if ($mtime) { $mtime.ToString("o") } else { $null }
    }
}

function Get-CpanelDirectoryEntries {
    param([string]$Path)

    $entries = @()
    try {
        $response = Invoke-CpanelUapi "Fileman/list_files" @{
            dir = $Path
            show_hidden = "1"
        }

        if ($response.status -eq 1) {
            $rawEntries = @()
            if ($response.data -is [array]) {
                $rawEntries = @($response.data)
            }
            elseif ($response.data.PSObject.Properties.Name -contains "files") {
                $rawEntries = @($response.data.files)
            }
            elseif ($response.data.PSObject.Properties.Name -contains "entries") {
                $rawEntries = @($response.data.entries)
            }

            foreach ($entry in $rawEntries) {
                $converted = Convert-CpanelEntry -Entry $entry -BasePath $Path
                if ($converted -and $converted.isDirectory) {
                    $entries += $converted
                }
            }
        }
    }
    catch {
        $entries = @()
    }

    if ($entries.Count -gt 0) {
        return $entries
    }

    try {
        $response = Invoke-CpanelApi2 "Fileman" "listfiles" @{
            dir = $Path
            showdotfiles = "1"
            checkleaf = "1"
        }

        $rawEntries = @()
        if ($response.cpanelresult -and $response.cpanelresult.data) {
            $rawEntries = @($response.cpanelresult.data)
        }

        foreach ($entry in $rawEntries) {
            $converted = Convert-CpanelEntry -Entry $entry -BasePath $Path
            if ($converted -and $converted.isDirectory) {
                $entries += $converted
            }
        }
    }
    catch {
        throw "Could not list cPanel directory '$Path'."
    }

    return $entries
}

function Get-ActiveReleaseId {
    param(
        [string]$Content,
        [string]$ReleaseFolder
    )

    if (-not $Content) {
        return $null
    }

    $folderPattern = [regex]::Escape($ReleaseFolder) + '/(?<id>[^/''"\s]+)'
    $folderMatch = [regex]::Match($Content, $folderPattern)
    if ($folderMatch.Success) {
        return $folderMatch.Groups["id"].Value
    }

    $commentMatch = [regex]::Match($Content, "(?im)^\s*(?:#|//)\s*Release:\s*(?<id>\S+)\s*$")
    if ($commentMatch.Success) {
        return $commentMatch.Groups["id"].Value
    }

    return $null
}

function New-Surface {
    param(
        [string]$Id,
        [string]$Name,
        [string]$RemoteBase,
        [string]$ReleaseFolder,
        [string]$ActiveMarkerPath,
        [string]$PublicUrl
    )

    return [pscustomobject]@{
        id = $Id
        name = $Name
        remoteBase = $RemoteBase
        releaseFolder = $ReleaseFolder
        releaseBase = Join-RemotePath -Base $RemoteBase -Child $ReleaseFolder
        activeMarkerPath = $ActiveMarkerPath
        publicUrl = $PublicUrl
    }
}

function Get-RetentionRows {
    param(
        [array]$Entries,
        [string]$ActiveReleaseId,
        [int]$KeepNewest,
        [int]$KeepDays
    )

    $nowUtc = (Get-Date).ToUniversalTime()
    $sorted = @($Entries | Sort-Object `
        @{ Expression = { if ($_.lastModifiedUtc) { [DateTime]::Parse($_.lastModifiedUtc) } else { [DateTime]::MinValue } }; Descending = $true }, `
        @{ Expression = { $_.name }; Descending = $true })

    $rows = @()
    for ($index = 0; $index -lt $sorted.Count; $index++) {
        $entry = $sorted[$index]
        $isActive = $ActiveReleaseId -and $entry.name -eq $ActiveReleaseId
        $ageDays = $null
        if ($entry.lastModifiedUtc) {
            $ageDays = [math]::Round(($nowUtc - [DateTime]::Parse($entry.lastModifiedUtc).ToUniversalTime()).TotalDays, 2)
        }

        $reasons = @()
        $classification = "retain"

        if ($isActive) {
            $reasons += "active release"
        }
        if ($index -lt $KeepNewest) {
            $reasons += "within newest $KeepNewest"
        }
        if ($ageDays -ne $null -and $ageDays -lt $KeepDays) {
            $reasons += "younger than $KeepDays days"
        }
        if ($ageDays -eq $null) {
            $reasons += "missing remote modified time"
        }

        if (-not $isActive -and $index -ge $KeepNewest) {
            if ($ageDays -eq $null) {
                $classification = "review-only"
            }
            elseif ($ageDays -ge $KeepDays) {
                $classification = "eligible-for-future-removal"
                $reasons += "older than or equal to $KeepDays days and outside newest $KeepNewest"
            }
        }

        if ($reasons.Count -eq 0) {
            $reasons += "retained by default"
        }

        $rows += [pscustomobject]@{
            releaseId = $entry.name
            path = $entry.path
            lastModifiedUtc = $entry.lastModifiedUtc
            ageDays = $ageDays
            isActive = [bool]$isActive
            classification = $classification
            reasons = $reasons
        }
    }

    return $rows
}

if (-not (Test-Path -LiteralPath $ManifestPath)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $ManifestPath | ConvertFrom-Json
$surfaces = @()

$hub = $manifest.apps | Where-Object { $_.id -eq "supersite" } | Select-Object -First 1
$control = $manifest.apps | Where-Object { $_.id -eq "control-plane" } | Select-Object -First 1
$netprobe = $manifest.apps | Where-Object { $_.id -eq "netprobe-atlas" } | Select-Object -First 1

$surfaces += New-Surface -Id "supersite" -Name "SuperSites Hub" -RemoteBase $hub.remotePath -ReleaseFolder "_supersites-releases" -ActiveMarkerPath (Join-RemotePath $hub.remotePath ".htaccess") -PublicUrl $hub.publicUrl
$surfaces += New-Surface -Id "control-plane" -Name "Control Plane" -RemoteBase $control.remotePath -ReleaseFolder "_control-plane-releases" -ActiveMarkerPath (Join-RemotePath $control.remotePath "index.php") -PublicUrl $control.publicUrl
$surfaces += New-Surface -Id "netprobe-atlas" -Name "NetProbe Atlas" -RemoteBase $netprobe.remotePath -ReleaseFolder "_netprobe-releases" -ActiveMarkerPath (Join-RemotePath $netprobe.remotePath ".htaccess") -PublicUrl $netprobe.publicUrl

foreach ($app in $manifest.apps) {
    if ($app.id -in @("supersite", "control-plane", "netprobe-atlas")) {
        continue
    }

    $surfaces += New-Surface -Id $app.id -Name $app.name -RemoteBase $app.remotePath -ReleaseFolder "_static-releases" -ActiveMarkerPath (Join-RemotePath $app.remotePath ".htaccess") -PublicUrl $app.publicUrl
}

$inventoryStatus = if ($ProbeCpanel) { "requested" } else { "skipped" }
$inventoryError = ""
$surfaceResults = @()

foreach ($surface in $surfaces) {
    $activeReleaseId = $null
    $entries = @()
    $surfaceStatus = "skipped"
    $surfaceError = ""

    if ($ProbeCpanel) {
        try {
            $markerContent = Get-CpanelFileContent -Path $surface.activeMarkerPath
            $activeReleaseId = Get-ActiveReleaseId -Content $markerContent -ReleaseFolder $surface.releaseFolder
            $entries = @(Get-CpanelDirectoryEntries -Path $surface.releaseBase)
            $surfaceStatus = "checked"
        }
        catch {
            $surfaceStatus = "failed"
            $surfaceError = $_.Exception.Message
            if ($FailOnProbeError) {
                throw
            }
        }
    }

    $retentionRows = Get-RetentionRows -Entries $entries -ActiveReleaseId $activeReleaseId -KeepNewest $KeepNewest -KeepDays $KeepDays
    $eligibleCount = @($retentionRows | Where-Object { $_.classification -eq "eligible-for-future-removal" }).Count
    $reviewCount = @($retentionRows | Where-Object { $_.classification -eq "review-only" }).Count

    $surfaceResults += [pscustomobject]@{
        id = $surface.id
        name = $surface.name
        publicUrl = $surface.publicUrl
        remoteBase = $surface.remoteBase
        releaseBase = $surface.releaseBase
        releaseFolder = $surface.releaseFolder
        activeMarkerPath = $surface.activeMarkerPath
        status = $surfaceStatus
        error = $surfaceError
        activeReleaseId = $activeReleaseId
        releaseCount = $entries.Count
        eligibleForFutureRemoval = $eligibleCount
        reviewOnly = $reviewCount
        releases = $retentionRows
    }
}

if ($ProbeCpanel) {
    $failed = @($surfaceResults | Where-Object { $_.status -eq "failed" }).Count
    $inventoryStatus = if ($failed -gt 0) { "partial" } else { "checked" }
}

$runId = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH-mm-ssZ")
$gitSha = ""
try {
    $gitSha = (git -C $repoRoot rev-parse --short HEAD 2>$null).Trim()
}
catch {
    $gitSha = "unknown"
}

$totalReleases = (@($surfaceResults | ForEach-Object { $_.releaseCount }) | Measure-Object -Sum).Sum
$totalEligible = (@($surfaceResults | ForEach-Object { $_.eligibleForFutureRemoval }) | Measure-Object -Sum).Sum
$totalReviewOnly = (@($surfaceResults | ForEach-Object { $_.reviewOnly }) | Measure-Object -Sum).Sum

$plan = [ordered]@{
    schemaVersion = 1
    runId = $runId
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    gitSha = $gitSha
    dryRunOnly = $true
    mutatesProduction = $false
    keepNewest = $KeepNewest
    keepDays = $KeepDays
    cpanelProbeRequested = [bool]$ProbeCpanel
    inventoryStatus = $inventoryStatus
    inventoryError = $inventoryError
    totals = [ordered]@{
        surfaces = $surfaceResults.Count
        releases = [int]$totalReleases
        eligibleForFutureRemoval = [int]$totalEligible
        reviewOnly = [int]$totalReviewOnly
    }
    policy = [ordered]@{
        neverRemove = @("active release", "newest $KeepNewest per surface", "younger than $KeepDays days")
        futureRemovalRequires = @("explicit apply script or audited manual action", "fresh dry-run artifact", "public smoke after removal", "docs/STATUS.md update")
    }
    surfaces = $surfaceResults
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$jsonPath = Join-Path $OutputDirectory "hostgator-retention-dry-run.json"
$markdownPath = Join-Path $OutputDirectory "hostgator-retention-dry-run.md"

$plan | ConvertTo-Json -Depth 16 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$lines = @()
$lines += "# HostGator Release Retention Dry-Run"
$lines += ""
$lines += '- Run ID: `' + $runId + '`'
$lines += '- Git SHA: `' + $gitSha + '`'
$lines += "- Dry-run only: yes"
$lines += "- Production mutation: no"
$lines += "- cPanel probe requested: $([bool]$ProbeCpanel)"
$lines += "- Inventory status: $inventoryStatus"
$lines += "- Policy: keep newest $KeepNewest per surface and keep releases younger than $KeepDays days"
$lines += "- Total surfaces: $($surfaceResults.Count)"
$lines += "- Total releases listed: $([int]$totalReleases)"
$lines += "- Eligible for future removal: $([int]$totalEligible)"
$lines += "- Review-only: $([int]$totalReviewOnly)"
$lines += ""
$lines += "## Surface Summary"
$lines += ""
$lines += "| Surface | Status | Active release | Releases | Eligible | Review-only | Release base |"
$lines += "|---|---|---|---:|---:|---:|---|"
foreach ($surfaceResult in $surfaceResults) {
    $lines += "| $($surfaceResult.id) | $($surfaceResult.status) | $($surfaceResult.activeReleaseId) | $($surfaceResult.releaseCount) | $($surfaceResult.eligibleForFutureRemoval) | $($surfaceResult.reviewOnly) | $($surfaceResult.releaseBase) |"
}
$lines += ""
$lines += "## Candidates"
$lines += ""
foreach ($surfaceResult in $surfaceResults) {
    $candidateRows = @($surfaceResult.releases | Where-Object { $_.classification -ne "retain" })
    if ($candidateRows.Count -eq 0) {
        continue
    }

    $lines += "### $($surfaceResult.name)"
    $lines += ""
    $lines += "| Release | Classification | Age days | Active | Reasons |"
    $lines += "|---|---|---:|---:|---|"
    foreach ($row in $candidateRows) {
        $lines += "| $($row.releaseId) | $($row.classification) | $($row.ageDays) | $($row.isActive) | $($row.reasons -join '; ') |"
    }
    $lines += ""
}
$allCandidateRows = @($surfaceResults | ForEach-Object { $_.releases } | Where-Object { $_.classification -ne "retain" })
if ($allCandidateRows.Count -eq 0) {
    $lines += "No release is eligible or review-only in this dry-run."
    $lines += ""
}
$lines += "## Guardrails"
$lines += ""
$lines += "- This dry-run does not remove, move, upload, publish, rewrite or chmod any remote file."
$lines += "- Active releases are always retained."
$lines += "- Future removal requires a separate audited apply path, fresh smoke checks and docs update."
$lines += "- Do not remove release folders manually while a deploy or rollback run is active."

$lines | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "HostGator retention dry-run complete."
Write-Host "JSON: $jsonPath"
Write-Host "Markdown: $markdownPath"
Write-Host "Inventory status: $inventoryStatus"
Write-Host "Surfaces: $($surfaceResults.Count); releases: $([int]$totalReleases); eligible: $([int]$totalEligible); review-only: $([int]$totalReviewOnly)"
