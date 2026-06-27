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

function Assert-DeployedStaticApp {
    param(
        [string]$Path,
        [string]$Marker,
        [string]$Context
    )

    $appPath = $Path.Trim("/")
    $appResponse = Invoke-SmokeRequest -Url (Join-Url $publicBase "$appPath/") -RequiredContent $Marker
    Assert-DoesNotContain -Content $appResponse.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context $Context
    Assert-DoesNotContain -Content $appResponse.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context $Context

    $publicBasePath = ([Uri]$publicBase).AbsolutePath.TrimEnd("/")
    $assetBasePath = "$publicBasePath/$appPath"
    $appAssetMatch = [regex]::Match(
        $appResponse.Content,
        "(?i)(?:src|href)=[""'](?<path>$([regex]::Escape($assetBasePath))/_nuxt/[^""']+\.js)"
    )

    if (-not $appAssetMatch.Success) {
        throw "Could not find a $assetBasePath/_nuxt JavaScript asset reference on $Context."
    }

    $appAssetUrl = "$origin$($appAssetMatch.Groups["path"].Value)"
    Invoke-SmokeRequest -Url $appAssetUrl | Out-Null

    $statusResponse = Invoke-SmokeRequest -Url (Join-Url $publicBase "$appPath/en/status") -RequiredContent "Launch Status"
    Assert-DoesNotContain -Content $statusResponse.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "$Context status"
    Assert-DoesNotContain -Content $statusResponse.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "$Context status"
    Assert-DoesNotContain -Content $statusResponse.Content -Pattern "(?i)No .{0,80}public deploy|HostGator public URL remains|noindex placeholder" -Context "$Context status"
    Assert-DoesNotContain -Content $statusResponse.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context "$Context status"

    return $appAssetUrl
}

function Invoke-JsonApiSmoke {
    param(
        [string]$Path,
        [string]$Body,
        [string]$Context
    )

    $apiUrl = Join-Url $publicBase $Path
    $response = Invoke-WebRequest -Uri $apiUrl -UseBasicParsing -TimeoutSec $TimeoutSec -Headers @{
        "User-Agent" = "SuperSitesSmoke/1.0"
        "Accept" = "application/json"
    } -Method Post -ContentType "application/json" -Body $Body

    if ($response.StatusCode -ne 200 -or $response.Content -notmatch '"data"') {
        throw "$Context API smoke failed for $apiUrl."
    }

    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder" -Context "$Context API"
    return $apiUrl
}

if ($PublicBaseUrl -notmatch "^https://") {
    throw "Public smoke requires HTTPS URL. Received: $PublicBaseUrl"
}

$publicBase = $PublicBaseUrl.TrimEnd("/")
$homeResponse = Invoke-SmokeRequest -Url "$publicBase/" -RequiredContent "SuperSites Hub"

Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "Home page"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "Home page"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context "Home page"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)Open public placeholder|Abrir placeholder|Ouvrir le placeholder|Platzhalter" -Context "Home page"

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

$calcHarborAssetUrl = Assert-DeployedStaticApp -Path "calcharbor" -Marker "CalcHarbor" -Context "CalcHarbor public app"
$devUtilityAssetUrl = Assert-DeployedStaticApp -Path "devutility-lab" -Marker "DevUtility Lab" -Context "DevUtility Lab public app"
$timeNexusAssetUrl = Assert-DeployedStaticApp -Path "timenexus" -Marker "TimeNexus" -Context "TimeNexus public app"
$qrRouteAssetUrl = Assert-DeployedStaticApp -Path "qrroute" -Marker "QRRoute" -Context "QRRoute public app"
$invoiceCraftAssetUrl = Assert-DeployedStaticApp -Path "invoicecraft" -Marker "InvoiceCraft" -Context "InvoiceCraft public app"
$mailHealthAssetUrl = Assert-DeployedStaticApp -Path "mailhealth" -Marker "MailHealth" -Context "MailHealth public app"
$sitePulseAssetUrl = Assert-DeployedStaticApp -Path "sitepulse-lab" -Marker "SitePulse Lab" -Context "SitePulse Lab public app"
$pixelBatchAssetUrl = Assert-DeployedStaticApp -Path "pixelbatch" -Marker "PixelBatch" -Context "PixelBatch public app"
$docShiftAssetUrl = Assert-DeployedStaticApp -Path "docshift" -Marker "DocShift" -Context "DocShift public app"
$mailHealthApiUrl = Invoke-JsonApiSmoke -Path "control-plane/api/v1/mailhealth/dns" -Body '{"domain":"example.com","check":"spf"}' -Context "MailHealth"
$sitePulseApiUrl = Invoke-JsonApiSmoke -Path "control-plane/api/v1/sitepulse/probe" -Body '{"url":"https://example.com","checks":["status"]}' -Context "SitePulse Lab"

if ($RootUrl) {
    if ($RootUrl -notmatch "^https://") {
        throw "Root smoke requires HTTPS URL. Received: $RootUrl"
    }

    Invoke-SmokeRequest -Url $RootUrl -RequiredContent "SuperSites Hub" | Out-Null
}

Write-Host "SuperSites public smoke passed for $publicBase."
Write-Host "Validated public asset: $assetUrl"
Write-Host "Validated CalcHarbor asset: $calcHarborAssetUrl"
Write-Host "Validated DevUtility Lab asset: $devUtilityAssetUrl"
Write-Host "Validated TimeNexus asset: $timeNexusAssetUrl"
Write-Host "Validated QRRoute asset: $qrRouteAssetUrl"
Write-Host "Validated InvoiceCraft asset: $invoiceCraftAssetUrl"
Write-Host "Validated MailHealth asset: $mailHealthAssetUrl"
Write-Host "Validated SitePulse Lab asset: $sitePulseAssetUrl"
Write-Host "Validated PixelBatch asset: $pixelBatchAssetUrl"
Write-Host "Validated DocShift asset: $docShiftAssetUrl"
Write-Host "Validated MailHealth API: $mailHealthApiUrl"
Write-Host "Validated SitePulse Lab API: $sitePulseApiUrl"
