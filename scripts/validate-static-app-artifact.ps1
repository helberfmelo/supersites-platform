param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("calcharbor", "devutility-lab", "timenexus", "qrroute", "invoicecraft", "mailhealth", "sitepulse-lab", "pixelbatch", "docshift")]
    [string]$AppId,
    [Parameter(Mandatory = $true)]
    [string]$ArtifactPath,
    [Parameter(Mandatory = $true)]
    [string]$BasePath,
    [Parameter(Mandatory = $true)]
    [string]$PublicBaseUrl,
    [string]$ApiBaseUrl = ""
)

$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "static-app-hostgator.config.ps1")

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
        [string]$RelativePath,
        [string]$DisplayName
    )

    $path = Get-ArtifactFilePath -Root $Root -RelativePath $RelativePath
    if (-not (Test-Path -LiteralPath $path -PathType Leaf)) {
        throw "$DisplayName static artifact is missing required file: $RelativePath"
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

$config = Get-StaticHostgatorAppConfig -AppId $AppId
$basePathNoTrailing = Normalize-StaticBasePath -Value $BasePath
$basePathTrailing = Normalize-StaticBasePath -Value $BasePath -TrailingSlash
$publicBaseUrl = $PublicBaseUrl.TrimEnd("/")
$apiBaseUrl = $ApiBaseUrl.TrimEnd("/")

if ($publicBaseUrl -notmatch "^https://") {
    throw "$($config.DisplayName) PublicBaseUrl must be HTTPS. Received: $publicBaseUrl"
}

if ($config.ApiEnvName -and $apiBaseUrl -notmatch "^https://") {
    throw "$($config.DisplayName) ApiBaseUrl must be HTTPS. Received: $apiBaseUrl"
}

if (-not (Test-Path -LiteralPath $ArtifactPath -PathType Container)) {
    throw "$($config.DisplayName) static artifact path not found: $ArtifactPath"
}

foreach ($file in $config.RequiredFiles) {
    Assert-FileExists -Root $ArtifactPath -RelativePath $file -DisplayName $config.DisplayName | Out-Null
}

$htmlFiles = Get-ChildItem -LiteralPath $ArtifactPath -Recurse -File -Filter "*.html"
if (-not $htmlFiles) {
    throw "$($config.DisplayName) static artifact contains no HTML files."
}

$combinedHtml = ""
foreach ($file in $htmlFiles) {
    $content = Get-Content -Raw -LiteralPath $file.FullName
    $combinedHtml += "`n$content"

    if ($content -match '(?i)<meta[^>]+name=["'']robots["''][^>]+content=["''][^"'']*noindex') {
        throw "$($config.DisplayName) static artifact contains a noindex robots meta in $($file.FullName)."
    }

    if ($basePathNoTrailing -ne "/" -and $content -match '(?i)(src|href|data-src)=["'']/_') {
        throw "$($config.DisplayName) static artifact contains root-relative Nuxt asset references in $($file.FullName). Build with NUXT_APP_BASE_URL=$basePathTrailing."
    }

    if ($content -match '(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick') {
        throw "$($config.DisplayName) static artifact contains an external ads or analytics integration marker in $($file.FullName)."
    }
}

foreach ($marker in $config.RequiredMarkers) {
    Assert-ContentContains -Content $combinedHtml -Needle $marker -Context "$($config.DisplayName) static artifact"
}

Assert-ContentContains -Content $combinedHtml -Needle $publicBaseUrl -Context "$($config.DisplayName) static artifact"

if ($basePathNoTrailing -ne "/") {
    Assert-ContentContains -Content $combinedHtml -Needle "src=`"$basePathNoTrailing/_nuxt/" -Context "$($config.DisplayName) static artifact"
}

$sitemapPath = Assert-FileExists -Root $ArtifactPath -RelativePath "sitemap.xml" -DisplayName $config.DisplayName
$sitemap = Get-Content -Raw -LiteralPath $sitemapPath
Assert-ContentContains -Content $sitemap -Needle "$publicBaseUrl/en" -Context "$($config.DisplayName) sitemap"

$assetReferences = @()
if ($basePathNoTrailing -ne "/") {
    $escapedBasePath = [regex]::Escape($basePathNoTrailing)
    $assetReferences = [regex]::Matches($combinedHtml, "(?i)(?:src|href|data-src)=[""'](?<path>$escapedBasePath/[^""'#?]+)") |
        ForEach-Object { $_.Groups["path"].Value } |
        Where-Object { $_ -match "/(_nuxt|_payload\.json)" } |
        Sort-Object -Unique
}

foreach ($assetReference in $assetReferences) {
    $relativePath = $assetReference.Substring($basePathNoTrailing.Length).TrimStart("/")
    Assert-FileExists -Root $ArtifactPath -RelativePath $relativePath -DisplayName $config.DisplayName | Out-Null
}

$files = Get-ChildItem -LiteralPath $ArtifactPath -Recurse -File
$disallowedFiles = $files | Where-Object {
    $_.Name -match '^(?:\.env|\.env\..+)$' -or
    $_.Name -match '\.(?:pem|key|p12|pfx)$'
}

if ($disallowedFiles) {
    throw "$($config.DisplayName) static artifact contains disallowed sensitive file names: $($disallowedFiles.FullName -join ', ')"
}

$textFiles = $files | Where-Object { $_.Extension -match '^\.(?:html|js|mjs|json|css|xml|txt|map)$' }
$combinedText = ""
foreach ($file in $textFiles) {
    $combinedText += "`n" + (Get-Content -Raw -LiteralPath $file.FullName)
}

$documentTextFiles = $files | Where-Object { $_.Extension -match '^\.(?:html|json|xml|txt)$' }
$combinedDocumentText = ""
foreach ($file in $documentTextFiles) {
    $combinedDocumentText += "`n" + (Get-Content -Raw -LiteralPath $file.FullName)
}

if ($combinedDocumentText -match '(?i)https?://(?:127\.0\.0\.1|localhost)[^"'']*|(?:127\.0\.0\.1|localhost):\d+') {
    throw "$($config.DisplayName) static artifact contains localhost or loopback URL references in public document payloads."
}

if ($combinedText -match '(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick') {
    throw "$($config.DisplayName) static artifact contains an external ads or analytics integration marker."
}

if ($config.ApiEnvName) {
    Assert-ContentContains -Content $combinedText -Needle $apiBaseUrl -Context "$($config.DisplayName) static artifact runtime config"
}

$totalBytes = ($files | Measure-Object Length -Sum).Sum
Write-Host "$($config.DisplayName) static artifact validation passed: $($files.Count) files, $totalBytes bytes, base path '$basePathNoTrailing'."
