param(
    [string]$BasePath = "/supersites",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites",
    [string]$OutputDirectory = "artifacts/supersite-hostgator",
    [string]$ReleaseId = ""
)

$ErrorActionPreference = "Stop"

function Normalize-BasePath {
    param([string]$Value)

    $normalized = if ($null -eq $Value) { "/" } else { $Value.Trim() }
    if (-not $normalized -or $normalized -eq "/") {
        return "/"
    }

    return "/" + $normalized.Trim("/") + "/"
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$artifactPath = Join-Path $repoRoot "apps/supersite/.output/public"
$normalizedBasePath = Normalize-BasePath $BasePath
$release = if ($ReleaseId) { $ReleaseId } else { (git rev-parse --short=12 HEAD).Trim() }
$createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

$previousBaseUrl = $env:NUXT_APP_BASE_URL
try {
    $env:NUXT_APP_BASE_URL = $normalizedBasePath
    pnpm --filter @supersites/supersite build
}
finally {
    if ($null -eq $previousBaseUrl) {
        Remove-Item Env:\NUXT_APP_BASE_URL -ErrorAction SilentlyContinue
    }
    else {
        $env:NUXT_APP_BASE_URL = $previousBaseUrl
    }
}

& (Join-Path $repoRoot "scripts/validate-supersite-static-artifact.ps1") `
    -ArtifactPath $artifactPath `
    -BasePath $normalizedBasePath `
    -PublicBaseUrl $PublicBaseUrl

$files = Get-ChildItem -LiteralPath $artifactPath -Recurse -File
$totalBytes = ($files | Measure-Object Length -Sum).Sum

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$manifest = [ordered]@{
    schemaVersion = 1
    appId = "supersite"
    target = "hostgator-static"
    releaseId = $release
    createdAt = $createdAt
    basePath = $normalizedBasePath
    publicBaseUrl = $PublicBaseUrl.TrimEnd("/")
    artifactPath = (Resolve-Path $artifactPath).Path
    fileCount = $files.Count
    totalBytes = $totalBytes
    notes = @(
        "Build was generated with NUXT_APP_BASE_URL=$normalizedBasePath.",
        "No ads, GTM or external analytics integrations are enabled in this artifact.",
        "Remote deploy must publish this artifact into a versioned HostGator release directory."
    )
}

$manifestPath = Join-Path $OutputDirectory "supersite-hostgator-artifact.json"
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

Write-Host "SuperSites HostGator artifact ready at $artifactPath"
Write-Host "Artifact manifest written to $manifestPath"
