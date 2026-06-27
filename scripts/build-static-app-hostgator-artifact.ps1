param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("calcharbor", "devutility-lab", "timenexus", "qrroute", "invoicecraft", "mailhealth", "sitepulse-lab", "pixelbatch", "docshift")]
    [string]$AppId,
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$OutputDirectory = "artifacts/static-app-hostgator",
    [string]$ReleaseId = "",
    [string]$ApiBaseUrl = ""
)

$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "static-app-hostgator.config.ps1")

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$manifestFullPath = Join-Path $repoRoot $ManifestPath
if (-not (Test-Path -LiteralPath $manifestFullPath -PathType Leaf)) {
    throw "Deployment manifest not found: $ManifestPath"
}

$config = Get-StaticHostgatorAppConfig -AppId $AppId
$manifest = Get-Content -Raw -LiteralPath $manifestFullPath | ConvertFrom-Json
$app = $manifest.apps | Where-Object { $_.id -eq $AppId } | Select-Object -First 1
if (-not $app) {
    throw "Deployment manifest does not contain app id '$AppId'."
}

if ($app.kind -ne "nuxt-ssg") {
    throw "Static app deploy supports only nuxt-ssg apps. $AppId is '$($app.kind)'."
}

$reservedIds = @("supersite", "netprobe-atlas", "control-plane")
if ($reservedIds -contains $AppId) {
    throw "$AppId has a dedicated deploy workflow and is not supported by this generic static app script."
}

$artifactPath = Join-Path $repoRoot $app.buildOutput
$publicBaseUrl = $app.publicUrl.TrimEnd("/")
$basePath = Normalize-StaticBasePath -Value ([Uri]$publicBaseUrl).AbsolutePath -TrailingSlash
$apiBaseUrlToUse = if ($ApiBaseUrl) { $ApiBaseUrl.TrimEnd("/") } else { [string]$config.ApiBaseUrl }
$release = if ($ReleaseId) { $ReleaseId } else { (git rev-parse --short=12 HEAD).Trim() }
$createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

if ($publicBaseUrl -notmatch "^https://") {
    throw "$($config.DisplayName) PublicBaseUrl must be HTTPS for the HostGator artifact. Received: $publicBaseUrl"
}

if ($config.ApiEnvName -and $apiBaseUrlToUse -notmatch "^https://") {
    throw "$($config.DisplayName) ApiBaseUrl must be HTTPS for the HostGator artifact. Received: $apiBaseUrlToUse"
}

$previousBaseUrl = $env:NUXT_APP_BASE_URL
$previousApiValue = $null
$apiEnvName = [string]$config.ApiEnvName
if ($apiEnvName) {
    $previousApiValue = [Environment]::GetEnvironmentVariable($apiEnvName, "Process")
}

try {
    $env:NUXT_APP_BASE_URL = $basePath
    if ($apiEnvName) {
        [Environment]::SetEnvironmentVariable($apiEnvName, $apiBaseUrlToUse, "Process")
    }

    pnpm --filter $config.PackageName build
}
finally {
    if ($null -eq $previousBaseUrl) {
        Remove-Item Env:\NUXT_APP_BASE_URL -ErrorAction SilentlyContinue
    }
    else {
        $env:NUXT_APP_BASE_URL = $previousBaseUrl
    }

    if ($apiEnvName) {
        if ($null -eq $previousApiValue) {
            [Environment]::SetEnvironmentVariable($apiEnvName, $null, "Process")
        }
        else {
            [Environment]::SetEnvironmentVariable($apiEnvName, $previousApiValue, "Process")
        }
    }
}

& (Join-Path $repoRoot "scripts/validate-static-app-artifact.ps1") `
    -AppId $AppId `
    -ArtifactPath $artifactPath `
    -BasePath $basePath `
    -PublicBaseUrl $publicBaseUrl `
    -ApiBaseUrl $apiBaseUrlToUse

$files = Get-ChildItem -LiteralPath $artifactPath -Recurse -File
$totalBytes = ($files | Measure-Object Length -Sum).Sum
$outputPath = Join-Path $repoRoot $OutputDirectory
New-Item -ItemType Directory -Path $outputPath -Force | Out-Null

$manifestOut = [ordered]@{
    schemaVersion = 1
    appId = $AppId
    appName = $config.DisplayName
    target = "hostgator-static-app"
    releaseId = $release
    createdAt = $createdAt
    basePath = $basePath
    publicBaseUrl = $publicBaseUrl
    apiBaseUrl = $apiBaseUrlToUse
    artifactPath = (Resolve-Path $artifactPath).Path
    fileCount = $files.Count
    totalBytes = $totalBytes
    launchGates = @(
        "Static artifact built with NUXT_APP_BASE_URL=$basePath.",
        "No ads, GTM or external analytics integrations are enabled in this artifact.",
        "Real deploy must upload to a versioned app release directory, switch only the managed app .htaccess and pass public smoke.",
        "Rollback may switch to a previous release or return the app folder to the bootstrap placeholder."
    )
}

if ($config.ApiEnvName) {
    $manifestOut.launchGates += "Runtime public API base is $apiBaseUrlToUse and must pass deploy preflight."
}

$manifestOutputPath = Join-Path $outputPath "$AppId-hostgator-artifact.json"
$manifestOut | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifestOutputPath -Encoding UTF8

Write-Host "$($config.DisplayName) HostGator artifact ready at $artifactPath"
Write-Host "Artifact manifest written to $manifestOutputPath"
