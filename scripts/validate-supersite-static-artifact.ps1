param(
    [string]$ArtifactPath = "apps/supersite/.output/public",
    [string]$BasePath = "/supersites",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites"
)

$ErrorActionPreference = "Stop"

function Normalize-BasePath {
    param([string]$Value)

    $normalized = if ($null -eq $Value) { "/" } else { $Value.Trim() }
    if (-not $normalized -or $normalized -eq "/") {
        return ""
    }

    return "/" + $normalized.Trim("/")
}

function Get-ArtifactFilePath {
    param(
        [string]$Root,
        [string]$RelativePath
    )

    $safeRelativePath = $RelativePath.TrimStart("/") -replace "/", [IO.Path]::DirectorySeparatorChar
    return Join-Path $Root $safeRelativePath
}

function Assert-FileExists {
    param(
        [string]$Root,
        [string]$RelativePath
    )

    $path = Get-ArtifactFilePath -Root $Root -RelativePath $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        throw "Static artifact is missing required file: $RelativePath"
    }

    return $path
}

function Assert-ContentContains {
    param(
        [string]$Content,
        [string]$Needle,
        [string]$Context
    )

    if ($Content -notmatch [regex]::Escape($Needle)) {
        throw "$Context is missing required marker: $Needle"
    }
}

$basePath = Normalize-BasePath $BasePath
$publicBaseUrl = $PublicBaseUrl.TrimEnd("/")

if (-not (Test-Path -LiteralPath $ArtifactPath -PathType Container)) {
    throw "Static artifact path not found: $ArtifactPath"
}

$requiredFiles = @(
    "index.html",
    "en/index.html",
    "pt-br/privacy/index.html",
    "en/sites/netprobe-atlas/index.html",
    "sitemap.xml"
)

foreach ($file in $requiredFiles) {
    Assert-FileExists -Root $ArtifactPath -RelativePath $file | Out-Null
}

$htmlFiles = @(
    "index.html",
    "en/index.html",
    "pt-br/privacy/index.html",
    "en/sites/netprobe-atlas/index.html"
)

$combinedHtml = ""
foreach ($file in $htmlFiles) {
    $path = Assert-FileExists -Root $ArtifactPath -RelativePath $file
    $content = Get-Content -Raw -LiteralPath $path
    $combinedHtml += "`n$content"

    if ($content -match '(?i)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex') {
        throw "Static artifact contains a noindex robots meta in $file."
    }

    if ($basePath -and $content -match '(?i)(src|href|data-src)=["'']/_') {
        throw "Static artifact contains root-relative Nuxt asset references in $file. Build with NUXT_APP_BASE_URL=$basePath/."
    }

    if ($content -match '(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick') {
        throw "Static artifact contains an external ads or analytics integration marker in $file."
    }
}

Assert-ContentContains -Content $combinedHtml -Needle "SuperSites Hub" -Context "Static artifact"
Assert-ContentContains -Content $combinedHtml -Needle "NetProbe Atlas" -Context "Static artifact"
Assert-ContentContains -Content $combinedHtml -Needle $publicBaseUrl -Context "Static artifact"

if ($basePath) {
    Assert-ContentContains -Content $combinedHtml -Needle "href=`"$basePath/en`"" -Context "Static artifact"
    Assert-ContentContains -Content $combinedHtml -Needle "src=`"$basePath/_nuxt/" -Context "Static artifact"
}

$sitemapPath = Assert-FileExists -Root $ArtifactPath -RelativePath "sitemap.xml"
$sitemap = Get-Content -Raw -LiteralPath $sitemapPath
Assert-ContentContains -Content $sitemap -Needle "$publicBaseUrl/en/privacy" -Context "Sitemap"
Assert-ContentContains -Content $sitemap -Needle "$publicBaseUrl/de/editorial-policy" -Context "Sitemap"

$escapedBasePath = [regex]::Escape($basePath)
$assetReferences = @()
if ($basePath) {
    $assetReferences = [regex]::Matches($combinedHtml, "(?i)(?:src|href|data-src)=[""'](?<path>$escapedBasePath/[^""'#?]+)") |
        ForEach-Object { $_.Groups["path"].Value } |
        Where-Object { $_ -match "/(_nuxt|_payload\.json)" } |
        Sort-Object -Unique
}

foreach ($assetReference in $assetReferences) {
    $relativePath = $assetReference.Substring($basePath.Length).TrimStart("/")
    Assert-FileExists -Root $ArtifactPath -RelativePath $relativePath | Out-Null
}

$files = Get-ChildItem -LiteralPath $ArtifactPath -Recurse -File
$disallowedFiles = $files | Where-Object {
    $_.Name -match '^(?:\.env|\.env\..+)$' -or
    $_.Name -match '\.(?:pem|key|p12|pfx)$'
}

if ($disallowedFiles) {
    throw "Static artifact contains disallowed sensitive file names: $($disallowedFiles.FullName -join ', ')"
}

$totalBytes = ($files | Measure-Object Length -Sum).Sum
Write-Host "SuperSites static artifact validation passed: $($files.Count) files, $totalBytes bytes, base path '$basePath'."
