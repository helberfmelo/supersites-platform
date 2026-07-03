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

function Update-ArtifactPublicReferences {
    param(
        [string]$Root,
        [string]$LegacyPublicBaseUrl,
        [string]$TargetPublicBaseUrl
    )

    $legacy = $LegacyPublicBaseUrl.TrimEnd("/")
    $target = $TargetPublicBaseUrl.TrimEnd("/")
    if ($legacy -eq $target) {
        return
    }

    $textExtensions = @(".css", ".html", ".js", ".json", ".mjs", ".svg", ".txt", ".webmanifest", ".xml")
    $files = Get-ChildItem -LiteralPath $Root -Recurse -File | Where-Object {
        $textExtensions -contains $_.Extension.ToLowerInvariant()
    }

    foreach ($file in $files) {
        $content = Get-Content -Raw -LiteralPath $file.FullName
        if ($content -notmatch [regex]::Escape($legacy)) {
            continue
        }

        $content.Replace($legacy, $target) | Set-Content -LiteralPath $file.FullName -Encoding UTF8
    }
}

function Set-ArtifactRobotsFile {
    param(
        [string]$Root,
        [string]$TargetPublicBaseUrl
    )

    $robots = @"
User-agent: *
Allow: /

Sitemap: $($TargetPublicBaseUrl.TrimEnd("/"))/sitemap.xml
"@

    Set-Content -LiteralPath (Join-Path $Root "robots.txt") -Value $robots -Encoding UTF8
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

Update-ArtifactPublicReferences `
    -Root $artifactPath `
    -LegacyPublicBaseUrl "https://opentshost.com/supersites" `
    -TargetPublicBaseUrl $PublicBaseUrl
Set-ArtifactRobotsFile -Root $artifactPath -TargetPublicBaseUrl $PublicBaseUrl

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
