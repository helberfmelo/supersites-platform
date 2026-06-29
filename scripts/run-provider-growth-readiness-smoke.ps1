param(
    [string]$OutputDirectory = ""
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $repoRoot "artifacts/provider-growth-readiness"
}

$runId = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH-mm-ssZ")
$startedAt = Get-Date
$gitSha = "unknown"

try {
    $gitSha = (git -C $repoRoot rev-parse --short HEAD 2>$null).Trim()
}
catch {
    $gitSha = "unknown"
}

Write-Host "Running provider/growth readiness smoke..."
Write-Host "Run ID: $runId"

$testOutput = @()
$exitCode = 1
Push-Location (Join-Path $repoRoot "apps/control-plane")
try {
    $testOutput = @(& php artisan test --filter=ProviderGrowthReadinessSmokeTest --colors=never 2>&1)
    $exitCode = $LASTEXITCODE
}
finally {
    Pop-Location
}

foreach ($line in $testOutput) {
    Write-Host $line
}

$finishedAt = Get-Date
$status = if ($exitCode -eq 0) { "passed" } else { "failed" }
$durationSeconds = [math]::Round(($finishedAt - $startedAt).TotalSeconds, 2)

$result = [ordered]@{
    schemaVersion = 1
    runId = $runId
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    gitSha = $gitSha
    status = $status
    exitCode = $exitCode
    durationSeconds = $durationSeconds
    mutatesProduction = $false
    startsWorkersOrCrons = $false
    activatesExternalProviders = $false
    storesProviderPayloads = $false
    testFilter = "ProviderGrowthReadinessSmokeTest"
    endpointsCovered = @(
        "/api/v1/adsense/go-live-readiness",
        "/api/v1/google/go-live-readiness",
        "/api/v1/billing/go-live-readiness",
        "/api/v1/monetization/support/go-live-readiness",
        "/api/v1/growth/ingestion-readiness",
        "/api/v1/growth/priorities",
        "/api/v1/growth/automation-readiness",
        "/api/v1/growth/reporting-readiness"
    )
    outputTail = @($testOutput | Select-Object -Last 40 | ForEach-Object { [string]$_ })
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$jsonPath = Join-Path $OutputDirectory "provider-growth-readiness.json"
$markdownPath = Join-Path $OutputDirectory "provider-growth-readiness.md"

$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$lines = @()
$lines += "# Provider/Growth Readiness Smoke"
$lines += ""
$lines += '- Run ID: `' + $runId + '`'
$lines += '- Git SHA: `' + $gitSha + '`'
$lines += "- Status: $status"
$lines += "- Duration seconds: $durationSeconds"
$lines += "- Production mutation: no"
$lines += "- Workers/crons started: no"
$lines += "- External providers activated: no"
$lines += "- Provider payloads stored: no"
$lines += ""
$lines += "## Endpoints Covered"
$lines += ""
foreach ($endpoint in $result.endpointsCovered) {
    $lines += '- `' + $endpoint + '`'
}
$lines += ""
$lines += "## Test Output Tail"
$lines += ""
$lines += '```text'
$lines += @($result.outputTail)
$lines += '```'

$lines | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "Provider/growth readiness smoke status: $status"
Write-Host "JSON: $jsonPath"
Write-Host "Markdown: $markdownPath"

if ($exitCode -ne 0) {
    throw "Provider/growth readiness smoke failed with exit code $exitCode."
}
