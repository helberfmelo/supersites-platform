param(
    [string]$PublicBaseUrl = "https://opentshost.com/supersites/netprobe-atlas",
    [string]$ApiBaseUrl = "https://opentshost.com/supersites/control-plane/api/v1/netprobe",
    [int]$TimeoutSec = 30,
    [switch]$SkipApiSmoke
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
        [string]$RequiredContent = "",
        [string]$Method = "Get",
        [string]$Body = ""
    )

    $headers = @{
        "User-Agent" = "NetProbeSmoke/1.0"
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

if ($PublicBaseUrl -notmatch "^https://") {
    throw "NetProbe public smoke requires HTTPS URL. Received: $PublicBaseUrl"
}

if (-not $SkipApiSmoke -and $ApiBaseUrl -notmatch "^https://") {
    throw "NetProbe API smoke requires HTTPS URL. Received: $ApiBaseUrl"
}

$publicBase = $PublicBaseUrl.TrimEnd("/")
$apiBase = $ApiBaseUrl.TrimEnd("/")
$homeResponse = Invoke-SmokeRequest -Url "$publicBase/" -RequiredContent "NetProbe Atlas"

Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context "NetProbe home"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context "NetProbe home"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context "NetProbe home"
Assert-DoesNotContain -Content $homeResponse.Content -Pattern "(?i)127\.0\.0\.1|localhost" -Context "NetProbe home"

if ($homeResponse.Content -notmatch [regex]::Escape("href=`"$publicBase/en`"")) {
    throw "NetProbe home canonical does not point at $publicBase/en."
}

$assetMatch = [regex]::Match($homeResponse.Content, '(?i)(?:src|href)=["''](?<path>/supersites/netprobe-atlas/_nuxt/[^"'']+\.js)')
if (-not $assetMatch.Success) {
    throw "Could not find a /supersites/netprobe-atlas/_nuxt JavaScript asset reference on the public home page."
}

$origin = ([Uri]$publicBase).GetLeftPart([UriPartial]::Authority)
$assetUrl = "$origin$($assetMatch.Groups["path"].Value)"
Invoke-SmokeRequest -Url $assetUrl | Out-Null

$requiredPages = @(
    @{ Url = Join-Url $publicBase "en"; Marker = "Network facts" },
    @{ Url = Join-Url $publicBase "en/tools/dns-lookup"; Marker = "Run DNS lookup" },
    @{ Url = Join-Url $publicBase "pt-br/tools/dns-lookup"; Marker = "Consulta DNS" },
    @{ Url = Join-Url $publicBase "en/status"; Marker = "Launch Status" },
    @{ Url = Join-Url $publicBase "sitemap.xml"; Marker = "<urlset" }
)

foreach ($page in $requiredPages) {
    $response = Invoke-SmokeRequest -Url $page.Url -RequiredContent $page.Marker
    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)SuperSites bootstrap placeholder" -Context $page.Url
    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)<meta[^>]+name=[""']robots[""'][^>]+content=[""'][^""']*noindex" -Context $page.Url
    Assert-DoesNotContain -Content $response.Content -Pattern "(?i)adsbygoogle|googletagmanager|google-analytics|doubleclick" -Context $page.Url
}

if (-not $SkipApiSmoke) {
    $ipResponse = Invoke-SmokeRequest -Url (Join-Url $apiBase "ip") -RequiredContent '"data"'
    Assert-DoesNotContain -Content $ipResponse.Content -Pattern "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder" -Context "NetProbe API /ip"
    Assert-DoesNotContain -Content $ipResponse.Content -Pattern "(?i)private|password|token" -Context "NetProbe API /ip"

    $dnsBody = '{"domain":"example.com","types":["A"]}'
    $dnsResponse = Invoke-SmokeRequest -Url (Join-Url $apiBase "dns") -RequiredContent '"records"' -Method "Post" -Body $dnsBody
    Assert-DoesNotContain -Content $dnsResponse.Content -Pattern "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder" -Context "NetProbe API /dns"
}

Write-Host "NetProbe public smoke passed for $publicBase."
Write-Host "Validated public asset: $assetUrl"
if (-not $SkipApiSmoke) {
    Write-Host "Validated public API: $apiBase"
}
