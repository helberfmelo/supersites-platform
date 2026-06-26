param(
    [string]$PublicBaseUrl = "https://opentshost.com/supersites",
    [string]$RootUrl = "",
    [int]$TimeoutSec = 30
)

$ErrorActionPreference = "Stop"

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
        [string]$RequiredContent = ""
    )

    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec -Headers @{
        "User-Agent" = "SuperSitesSmoke/1.0"
    }

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

if ($PublicBaseUrl -notmatch "^https://") {
    throw "Public smoke requires HTTPS URL. Received: $PublicBaseUrl"
}

$publicBase = $PublicBaseUrl.TrimEnd("/")
$homeResponse = Invoke-SmokeRequest -Url "$publicBase/" -RequiredContent "SuperSites Hub"

Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "Home page"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "Home page"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context "Home page"

if ($homeResponse.Content -notmatch [regex]::Escape("href=`"$publicBase`"")) {
    throw "Home page canonical does not point at $publicBase."
}

$assetMatch = [regex]::Match($homeResponse.Content, '(?i)(?:src|href)=["''](?<path>/supersites/_nuxt/[^"'']+\.js)')
if (-not $assetMatch.Success) {
    throw "Could not find a /supersites/_nuxt JavaScript asset reference on the public home page."
}

$origin = ([Uri]$publicBase).GetLeftPart([UriPartial]::Authority)
$assetUrl = "$origin$($assetMatch.Groups["path"].Value)"
Invoke-SmokeRequest -Url $assetUrl | Out-Null

$requiredPages = @(
    @{ Url = Join-Url $publicBase "en"; Marker = "A curated operating network" },
    @{ Url = Join-Url $publicBase "pt-br/privacy"; Marker = "Privacidade" },
    @{ Url = Join-Url $publicBase "en/sites/netprobe-atlas"; Marker = "Quality gate" },
    @{ Url = Join-Url $publicBase "sitemap.xml"; Marker = "<urlset" }
)

foreach ($page in $requiredPages) {
    Invoke-SmokeRequest -Url $page.Url -RequiredContent $page.Marker | Out-Null
}

$netprobe = Invoke-SmokeRequest -Url (Join-Url $publicBase "netprobe-atlas/") -RequiredContent "NetProbe Atlas"
Assert-DoesNotContain -Content $netprobe.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "NetProbe public app"
Assert-DoesNotContain -Content $netprobe.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "NetProbe public app"

$calcharborPlaceholder = Invoke-SmokeRequest -Url (Join-Url $publicBase "calcharbor/") -RequiredContent "SuperSites bootstrap placeholder"
Assert-DoesNotContain -Content $calcharborPlaceholder.Content -Pattern "(?i)<script[^>]+/_nuxt/" -Context "CalcHarbor temporary placeholder"

$devutilityPlaceholder = Invoke-SmokeRequest -Url (Join-Url $publicBase "devutility-lab/") -RequiredContent "SuperSites bootstrap placeholder"
Assert-DoesNotContain -Content $devutilityPlaceholder.Content -Pattern "(?i)<script[^>]+/_nuxt/" -Context "DevUtility Lab temporary placeholder"

if ($RootUrl) {
    if ($RootUrl -notmatch "^https://") {
        throw "Root smoke requires HTTPS URL. Received: $RootUrl"
    }

    Invoke-SmokeRequest -Url $RootUrl -RequiredContent "SuperSites Hub" | Out-Null
}

Write-Host "SuperSites public smoke passed for $publicBase."
Write-Host "Validated public asset: $assetUrl"
