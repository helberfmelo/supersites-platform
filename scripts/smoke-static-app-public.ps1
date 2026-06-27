param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("calcharbor", "devutility-lab", "timenexus", "qrroute", "invoicecraft", "mailhealth", "sitepulse-lab", "pixelbatch", "docshift")]
    [string]$AppId,
    [string]$ManifestPath = "infra/deployment/apps.json",
    [string]$PublicBaseUrl = "",
    [string]$ApiBaseUrl = "",
    [int]$TimeoutSec = 30,
    [switch]$SkipApiSmoke
)

$ErrorActionPreference = "Stop"

. (Join-Path $PSScriptRoot "static-app-hostgator.config.ps1")

function Join-Url {
    param(
        [string]$BaseUrl,
        [string]$Path
    )

    return "$($BaseUrl.TrimEnd("/"))/$($Path.TrimStart("/"))"
}

function Invoke-SmokeRequest {
    param(
        [string]$Url,
        [string]$RequiredContent = "",
        [string]$Method = "Get",
        [string]$Body = ""
    )

    $headers = @{
        "User-Agent" = "SuperSitesStaticAppSmoke/1.0"
        "Accept" = "application/json, text/html;q=0.9, */*;q=0.8"
    }

    $parameters = @{
        Uri = $Url
        UseBasicParsing = $true
        TimeoutSec = $TimeoutSec
        Headers = $headers
        Method = $Method
    }

    if ($Body) {
        $parameters.Body = $Body
        $parameters.ContentType = "application/json"
    }

    $response = Invoke-WebRequest @parameters
    if ($response.StatusCode -ne 200) {
        throw "Unexpected HTTP status for ${Url}: $($response.StatusCode)"
    }

    if ($RequiredContent -and $response.Content -notmatch [regex]::Escape($RequiredContent)) {
        throw "Response for $Url did not include required content: $RequiredContent"
    }

    return $response
}

function Assert-DoesNotContain {
    param(
        [string]$Content,
        [string]$Pattern,
        [string]$Context
    )

    if ($Content -match $Pattern) {
        throw "$Context contains forbidden marker: $Pattern"
    }
}

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot "..")
$config = Get-StaticHostgatorAppConfig -AppId $AppId

if (-not $PublicBaseUrl) {
    $manifestFullPath = Join-Path $repoRoot $ManifestPath
    if (-not (Test-Path -LiteralPath $manifestFullPath -PathType Leaf)) {
        throw "Deployment manifest not found: $ManifestPath"
    }

    $manifest = Get-Content -Raw -LiteralPath $manifestFullPath | ConvertFrom-Json
    $app = $manifest.apps | Where-Object { $_.id -eq $AppId } | Select-Object -First 1
    if (-not $app) {
        throw "Deployment manifest does not contain app id '$AppId'."
    }

    $PublicBaseUrl = $app.publicUrl
}

$publicBase = $PublicBaseUrl.TrimEnd("/")
$apiBase = if ($ApiBaseUrl) { $ApiBaseUrl.TrimEnd("/") } else { [string]$config.ApiBaseUrl }

if ($publicBase -notmatch "^https://") {
    throw "$($config.DisplayName) public smoke requires HTTPS URL. Received: $publicBase"
}

if ($config.ApiEnvName -and -not $SkipApiSmoke -and $apiBase -notmatch "^https://") {
    throw "$($config.DisplayName) API smoke requires HTTPS URL. Received: $apiBase"
}

$basePath = Normalize-StaticBasePath -Value ([Uri]$publicBase).AbsolutePath
$homeResponse = Invoke-SmokeRequest -Url "$publicBase/" -RequiredContent $config.HomeMarker

Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "$($config.DisplayName) home"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "$($config.DisplayName) home"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context "$($config.DisplayName) home"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)127\.0\.0\.1|localhost" -Context "$($config.DisplayName) home"

$escapedBasePath = [regex]::Escape($basePath)
$assetMatch = [regex]::Match($homeResponse.Content, "(?i)(?:src|href)=[""'](?<path>$escapedBasePath/_nuxt/[^""']+\.js)")
if (-not $assetMatch.Success) {
    throw "Could not find a $basePath/_nuxt JavaScript asset reference on the public $($config.DisplayName) home page."
}

$origin = ([Uri]$publicBase).GetLeftPart([UriPartial]::Authority)
$assetUrl = "$origin$($assetMatch.Groups["path"].Value)"
Invoke-SmokeRequest -Url $assetUrl | Out-Null

foreach ($page in $config.SmokePages) {
    $response = Invoke-SmokeRequest -Url (Join-Url $publicBase $page.Path) -RequiredContent $page.Marker
    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "$($config.DisplayName) $($page.Path)"
    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "$($config.DisplayName) $($page.Path)"
    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context "$($config.DisplayName) $($page.Path)"
}

if ($config.ApiEnvName -and -not $SkipApiSmoke) {
    $apiUrl = Join-Url $apiBase $config.ApiSmokePath
    $apiResponse = Invoke-SmokeRequest -Url $apiUrl -RequiredContent $config.ApiSmokeMarker -Method "Post" -Body $config.ApiSmokeBody
    Assert-DoesNotContain -Content $apiResponse.Content -Pattern "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder" -Context "$($config.DisplayName) API $($config.ApiSmokePath)"
}

Write-Host "$($config.DisplayName) public smoke passed for $publicBase."
Write-Host "Validated public asset: $assetUrl"
if ($config.ApiEnvName -and -not $SkipApiSmoke) {
    Write-Host "Validated public API: $apiBase"
}
