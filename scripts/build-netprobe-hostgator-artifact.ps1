param(
    [string]$BasePath = "/supersites/netprobe-atlas",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites/netprobe-atlas",
    [string]$ApiBaseUrl = "https://opentshost.com/supersites/control-plane/api/v1/netprobe",
    [string]$OutputDirectory = "artifacts/netprobe-hostgator",
    [string]$ReleaseId = ""
)

$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "adsense-artifact.ps1")

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
$artifactPath = Join-Path $repoRoot "apps/netprobe-atlas/.output/public"
$normalizedBasePath = Normalize-BasePath $BasePath
$publicBaseUrl = $PublicBaseUrl.TrimEnd("/")
$apiBaseUrl = $ApiBaseUrl.TrimEnd("/")
$release = if ($ReleaseId) { $ReleaseId } else { (git rev-parse --short=12 HEAD).Trim() }
$createdAt = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ")

if ($publicBaseUrl -notmatch '^https://') {
    throw "PublicBaseUrl must be HTTPS for the HostGator artifact. Received: $publicBaseUrl"
}

if ($apiBaseUrl -notmatch '^https://') {
    throw "ApiBaseUrl must be HTTPS for the HostGator artifact. Received: $apiBaseUrl"
}

$previousBaseUrl = $env:NUXT_APP_BASE_URL
$previousApiBaseUrl = $env:NUXT_PUBLIC_NETPROBE_API_BASE_URL
try {
    $env:NUXT_APP_BASE_URL = $normalizedBasePath
    $env:NUXT_PUBLIC_NETPROBE_API_BASE_URL = $apiBaseUrl
    pnpm --filter @supersites/netprobe-atlas build
}
finally {
    if ($null -eq $previousBaseUrl) {
        Remove-Item Env:\NUXT_APP_BASE_URL -ErrorAction SilentlyContinue
    }
    else {
        $env:NUXT_APP_BASE_URL = $previousBaseUrl
    }

    if ($null -eq $previousApiBaseUrl) {
        Remove-Item Env:\NUXT_PUBLIC_NETPROBE_API_BASE_URL -ErrorAction SilentlyContinue
    }
    else {
        $env:NUXT_PUBLIC_NETPROBE_API_BASE_URL = $previousApiBaseUrl
    }
}

Update-ArtifactPublicReferences `
    -Root $artifactPath `
    -LegacyPublicBaseUrl "https://opentshost.com/supersites/netprobe-atlas" `
    -TargetPublicBaseUrl $publicBaseUrl
Set-ArtifactRobotsFile -Root $artifactPath -TargetPublicBaseUrl $publicBaseUrl
$adsenseClient = Get-AdSenseClientFromEnvironment
$adsenseUpdatedFiles = Add-AdSenseSnippetToArtifact -Root $artifactPath -Client $adsenseClient

& (Join-Path $repoRoot "scripts/validate-netprobe-static-artifact.ps1") `
    -ArtifactPath $artifactPath `
    -BasePath $normalizedBasePath `
    -PublicBaseUrl $publicBaseUrl `
    -ApiBaseUrl $apiBaseUrl

$files = Get-ChildItem -LiteralPath $artifactPath -Recurse -File
$totalBytes = ($files | Measure-Object Length -Sum).Sum

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

$manifest = [ordered]@{
    schemaVersion = 1
    appId = "netprobe-atlas"
    target = "hostgator-static"
    releaseId = $release
    createdAt = $createdAt
    basePath = $normalizedBasePath
    publicBaseUrl = $publicBaseUrl
    apiBaseUrl = $apiBaseUrl
    artifactPath = (Resolve-Path $artifactPath).Path
    fileCount = $files.Count
    totalBytes = $totalBytes
    launchGates = @(
        "Static artifact built with NUXT_APP_BASE_URL=$normalizedBasePath.",
        "Runtime public API base is $apiBaseUrl.",
        $(if ($adsenseClient) { "AdSense review snippet was injected into $adsenseUpdatedFiles HTML files from SUPERSITES_ADSENSE_CLIENT." } else { "No ads, GTM or external analytics integrations are enabled in this artifact." }),
        "Real deploy must preserve the remote placeholder and sensitive files, switch only the managed NetProbe .htaccess, and pass public API smoke before traffic is considered live."
    )
}

$manifestPath = Join-Path $OutputDirectory "netprobe-hostgator-artifact.json"
$manifest | ConvertTo-Json -Depth 5 | Set-Content -LiteralPath $manifestPath -Encoding UTF8

Write-Host "NetProbe HostGator artifact ready at $artifactPath"
Write-Host "Artifact manifest written to $manifestPath"
