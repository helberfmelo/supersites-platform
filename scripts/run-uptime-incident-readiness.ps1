param(
    [string]$OutputDirectory = "",
    [switch]$SkipVpsRuntime,
    [switch]$SkipAdSenseSafe
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $repoRoot "artifacts/uptime-incident-readiness"
}

function Invoke-ReadinessCheck {
    param(
        [string]$Id,
        [string]$Label,
        [scriptblock]$ScriptBlock
    )

    $startedAt = Get-Date
    Write-Host "Running readiness check: $Label"

    try {
        $checkOutput = @(& $ScriptBlock 2>&1)
        foreach ($line in $checkOutput) {
            Write-Host $line
        }
        $finishedAt = Get-Date

        return [pscustomobject]@{
            id = $Id
            label = $Label
            status = "passed"
            durationSeconds = [math]::Round(($finishedAt - $startedAt).TotalSeconds, 2)
            error = ""
        }
    }
    catch {
        $finishedAt = Get-Date

        return [pscustomobject]@{
            id = $Id
            label = $Label
            status = "failed"
            durationSeconds = [math]::Round(($finishedAt - $startedAt).TotalSeconds, 2)
            error = $_.Exception.Message
        }
    }
}

function Invoke-NodeScript {
    param([string]$ScriptPath)

    & node $ScriptPath
    if ($LASTEXITCODE -ne 0) {
        throw "Node script failed with exit code $LASTEXITCODE."
    }
}

$checks = @()
$checks += Invoke-ReadinessCheck -Id "supersite-public-smoke" -Label "Public SuperSites Hub/API smoke" -ScriptBlock {
    & (Join-Path $repoRoot "scripts/smoke-supersite-public.ps1")
}
$checks += Invoke-ReadinessCheck -Id "control-plane-public-smoke" -Label "Public control-plane/API smoke" -ScriptBlock {
    & (Join-Path $repoRoot "scripts/smoke-control-plane-public.ps1")
}
$checks += Invoke-ReadinessCheck -Id "netprobe-public-smoke" -Label "Public NetProbe/API smoke" -ScriptBlock {
    & (Join-Path $repoRoot "scripts/smoke-netprobe-public.ps1")
}

if (-not $SkipAdSenseSafe) {
    $checks += Invoke-ReadinessCheck -Id "adsense-safe-public" -Label "Public AdSense-safe gate" -ScriptBlock {
        Invoke-NodeScript -ScriptPath (Join-Path $repoRoot "scripts/validate-adsense-safe-public.mjs")
    }
}

if (-not $SkipVpsRuntime) {
    $checks += Invoke-ReadinessCheck -Id "vps-runtime" -Label "VPS Redis runtime validation" -ScriptBlock {
        & (Join-Path $repoRoot "scripts/validate-vps-runtime.ps1")
    }
}

$gitSha = ""
try {
    $gitSha = (git -C $repoRoot rev-parse --short HEAD 2>$null).Trim()
}
catch {
    $gitSha = "unknown"
}

$failedChecks = @($checks | Where-Object { $_.status -ne "passed" })
$runId = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH-mm-ssZ")

$result = [ordered]@{
    schemaVersion = 1
    runId = $runId
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    gitSha = $gitSha
    status = if ($failedChecks.Count -eq 0) { "passed" } else { "failed" }
    mutatesProduction = $false
    startsWorkersOrCrons = $false
    activatesExternalProviders = $false
    checkCount = $checks.Count
    failedCount = $failedChecks.Count
    checks = $checks
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$jsonPath = Join-Path $OutputDirectory "uptime-incident-readiness.json"
$markdownPath = Join-Path $OutputDirectory "uptime-incident-readiness.md"

$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$lines = @()
$lines += "# Uptime/Incident Readiness"
$lines += ""
$lines += '- Run ID: `' + $runId + '`'
$lines += '- Git SHA: `' + $gitSha + '`'
$lines += "- Status: $($result.status)"
$lines += "- Production mutation: no"
$lines += "- Workers/crons started: no"
$lines += "- External providers activated: no"
$lines += "- Checks: $($result.checkCount)"
$lines += "- Failures: $($result.failedCount)"
$lines += ""
$lines += "| Check | Status | Duration seconds | Error |"
$lines += "|---|---|---:|---|"
foreach ($check in $checks) {
    $errorText = if ($check.error) { $check.error.Replace("|", "/") } else { "" }
    $lines += "| $($check.label) | $($check.status) | $($check.durationSeconds) | $errorText |"
}

$lines | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "Uptime/incident readiness status: $($result.status)"
Write-Host "JSON: $jsonPath"
Write-Host "Markdown: $markdownPath"

if ($failedChecks.Count -gt 0) {
    $failedList = ($failedChecks | ForEach-Object { $_.id }) -join ", "
    throw "Uptime/incident readiness failed: $failedList"
}
