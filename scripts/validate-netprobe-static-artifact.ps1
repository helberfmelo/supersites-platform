param(
    [string]$ArtifactPath = "apps/netprobe-atlas/.output/public",
    [string]$BasePath = "/supersites/netprobe-atlas",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites/netprobe-atlas",
    [string]$ApiBaseUrl = "https://opentshost.com/supersites/control-plane/api/v1/netprobe"
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
        throw "NetProbe static artifact is missing required file: $RelativePath"
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
$apiBaseUrl = $ApiBaseUrl.TrimEnd("/")

if (-not (Test-Path -LiteralPath $ArtifactPath -PathType Container)) {
    throw "NetProbe static artifact path not found: $ArtifactPath"
}

$requiredFiles = @(
    "index.html",
    "en/index.html",
    "en/tools/dns-lookup/index.html",
    "pt-br/tools/dns-lookup/index.html",
    "en/status/index.html",
    "en/privacy/index.html",
    "sitemap.xml"
)

foreach ($file in $requiredFiles) {
    Assert-FileExists -Root $ArtifactPath -RelativePath $file | Out-Null
}

$htmlFiles = @(
    "index.html",
    "en/index.html",
    "en/tools/dns-lookup/index.html",
    "pt-br/tools/dns-lookup/index.html",
    "en/status/index.html",
    "en/privacy/index.html"
)

$combinedHtml = ""
foreach ($file in $htmlFiles) {
    $path = Assert-FileExists -Root $ArtifactPath -RelativePath $file
    $content = Get-Content -Raw -LiteralPath $path
    $combinedHtml += "`n$content"

    if ($content -match '(?i)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex') {
        throw "NetProbe static artifact contains a noindex robots meta in $file."
    }

    if ($basePath -and $content -match '(?i)(src|href|data-src)=["'']/_') {
        throw "NetProbe static artifact contains root-relative Nuxt asset references in $file. Build with NUXT_APP_BASE_URL=$basePath/."
    }

    if ($content -match '(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick') {
        throw "NetProbe static artifact contains an external ads or analytics integration marker in $file."
    }
}

Assert-ContentContains -Content $combinedHtml -Needle "NetProbe Atlas" -Context "NetProbe static artifact"
Assert-ContentContains -Content $combinedHtml -Needle "DNS Lookup" -Context "NetProbe static artifact"
Assert-ContentContains -Content $combinedHtml -Needle "Launch Status" -Context "NetProbe static artifact"
Assert-ContentContains -Content $combinedHtml -Needle $publicBaseUrl -Context "NetProbe static artifact"

if ($basePath) {
    Assert-ContentContains -Content $combinedHtml -Needle "href=`"$basePath/en`"" -Context "NetProbe static artifact"
    Assert-ContentContains -Content $combinedHtml -Needle "src=`"$basePath/_nuxt/" -Context "NetProbe static artifact"
}

$sitemapPath = Assert-FileExists -Root $ArtifactPath -RelativePath "sitemap.xml"
$sitemap = Get-Content -Raw -LiteralPath $sitemapPath
Assert-ContentContains -Content $sitemap -Needle "$publicBaseUrl/en/tools/dns-lookup" -Context "NetProbe sitemap"
Assert-ContentContains -Content $sitemap -Needle "$publicBaseUrl/en/status" -Context "NetProbe sitemap"
Assert-ContentContains -Content $sitemap -Needle "$publicBaseUrl/de/tools/ssl-certificate-checker" -Context "NetProbe sitemap"

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
    throw "NetProbe static artifact contains disallowed sensitive file names: $($disallowedFiles.FullName -join ', ')"
}

$textFiles = $files | Where-Object { $_.Extension -match '^\.(?:html|js|mjs|json|css|xml|txt|map)$' }
$combinedText = ""
foreach ($file in $textFiles) {
    $combinedText += "`n" + (Get-Content -Raw -LiteralPath $file.FullName)
}

if ($combinedText -match '(?i)(?:127\.0\.0\.1|localhost):8013|https?://(?:127\.0\.0\.1|localhost)[^"'']*/api/v1/netprobe') {
    throw "NetProbe static artifact contains local NetProbe API references."
}

if ($combinedText -match '(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick') {
    throw "NetProbe static artifact contains an external ads or analytics integration marker."
}

Assert-ContentContains -Content $combinedText -Needle $apiBaseUrl -Context "NetProbe static artifact runtime config"

$totalBytes = ($files | Measure-Object Length -Sum).Sum
Write-Host "NetProbe static artifact validation passed: $($files.Count) files, $totalBytes bytes, base path '$basePath'."
