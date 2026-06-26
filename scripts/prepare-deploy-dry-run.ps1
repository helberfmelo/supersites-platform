param(
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$OutputDirectory = "artifacts/deploy-dry-run",
    [string]$TargetEnvironment = "staging-hostgator"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $ManifestPath)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$manifest = Get-Content -Raw -LiteralPath $ManifestPath | ConvertFrom-Json
if (-not $manifest.apps -or $manifest.apps.Count -lt 12) {
    throw "Deployment manifest must contain the hub, control plane and ten utility sites."
}

$requiredIds = @(
    "supersite",
    "control-plane",
    "netprobe-atlas",
    "calcharbor",
    "devutility-lab",
    "timenexus",
    "qrroute",
    "invoicecraft",
    "mailhealth",
    "sitepulse-lab",
    "pixelbatch",
    "docshift"
)

$ids = @($manifest.apps | ForEach-Object { $_.id })
$missingIds = @($requiredIds | Where-Object { $ids -notcontains $_ })
if ($missingIds.Count -gt 0) {
    throw "Deployment manifest is missing apps: $($missingIds -join ', ')"
}

$planApps = @()
foreach ($app in $manifest.apps) {
    foreach ($field in @("id", "name", "kind", "localPath", "remotePath", "publicUrl")) {
        if (-not $app.$field) {
            throw "App entry is missing required field '$field'."
        }
    }

    if (-not (Test-Path -LiteralPath $app.localPath)) {
        throw "Local app path not found for $($app.id): $($app.localPath)"
    }

    $buildOutputExists = $false
    if ($app.buildOutput) {
        $buildOutputExists = Test-Path -LiteralPath $app.buildOutput
    }

    $planApps += [ordered]@{
        id = $app.id
        name = $app.name
        kind = $app.kind
        localPath = $app.localPath
        buildOutput = $app.buildOutput
        buildOutputExists = $buildOutputExists
        remotePath = $app.remotePath
        publicUrl = $app.publicUrl
        action = "dry-run"
    }
}

$releaseId = if ($env:GITHUB_SHA) { $env:GITHUB_SHA } else { (git rev-parse --short=12 HEAD).Trim() }
$createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$plan = [ordered]@{
    schemaVersion = 1
    mode = "dry-run"
    targetEnvironment = $TargetEnvironment
    releaseId = $releaseId
    createdAt = $createdAt
    remoteBase = $manifest.remoteBase
    publicBaseUrl = $manifest.publicBaseUrl
    requiredSecretNames = @(
        "SUPERSITES_CPANEL_USER",
        "SUPERSITES_CPANEL_PASSWORD"
    )
    requiredVariableNames = @(
        "SUPERSITES_CPANEL_HOST",
        "SUPERSITES_CPANEL_PORT",
        "SUPERSITES_REMOTE_BASE",
        "SUPERSITES_PUBLIC_BASE_URL"
    )
    apps = $planApps
    notes = @(
        "This plan does not upload, delete, move or publish files.",
        "Real deploy must preserve remote .env files and run smoke checks before traffic is considered valid.",
        "Direct root URL mapping remains pending until rewrite/alias/symlink strategy is selected."
    )
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$jsonPath = Join-Path $OutputDirectory "supersites-deploy-plan.json"
$markdownPath = Join-Path $OutputDirectory "supersites-deploy-plan.md"

$plan | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$lines = @(
    "# SuperSites Deploy Dry Run",
    "",
    "- Mode: dry-run",
    "- Target environment: $TargetEnvironment",
    "- Release: $releaseId",
    "- Created at: $createdAt",
    "- Remote base: $($manifest.remoteBase)",
    "- Public base URL: $($manifest.publicBaseUrl)",
    "",
    "## Apps",
    ""
)

foreach ($app in $planApps) {
    $lines += "- $($app.id): $($app.kind) -> $($app.remotePath) -> $($app.publicUrl)"
}

$lines += @(
    "",
    "## Required Secret Names",
    "",
    "- SUPERSITES_CPANEL_USER",
    "- SUPERSITES_CPANEL_PASSWORD",
    "",
    "No secret values are included in this artifact."
)

$lines | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "Deploy dry-run plan created at $jsonPath"
Write-Host "Deploy dry-run summary created at $markdownPath"
