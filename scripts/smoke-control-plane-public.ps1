param(
    [string]$PublicBaseUrl = "https://opentshost.com/supersites/control-plane/",
    [string]$DnsDomain = "example.com"
)

$ErrorActionPreference = "Stop"

function Join-PublicUrl {
    param(
        [string]$Base,
        [string]$Path
    )

    return "$($Base.TrimEnd("/"))/$($Path.TrimStart("/"))"
}

function Invoke-JsonRequest {
    param(
        [string]$Method,
        [string]$Url,
        [string]$Body = ""
    )

    $headers = @{
        "Accept" = "application/json"
        "User-Agent" = "SuperSitesControlPlaneSmoke/1.0"
    }

    if ($Body) {
        return Invoke-WebRequest -Uri $Url -Method $Method -UseBasicParsing -TimeoutSec 45 -Headers $headers -ContentType "application/json" -Body $Body
    }

    return Invoke-WebRequest -Uri $Url -Method $Method -UseBasicParsing -TimeoutSec 45 -Headers $headers
}

if ($PublicBaseUrl -notmatch "^https://") {
    throw "Control-plane public smoke requires HTTPS URL. Received: $PublicBaseUrl"
}

$healthUrl = Join-PublicUrl $PublicBaseUrl "health"
$healthResponse = Invoke-JsonRequest -Method Get -Url $healthUrl
if ($healthResponse.StatusCode -ne 200 -or $healthResponse.Content -notmatch '"status"') {
    throw "Control-plane health smoke failed for $healthUrl."
}
if ($healthResponse.Content -match "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder|noindex") {
    throw "Control-plane health smoke returned placeholder or HTML error for $healthUrl."
}

$ipUrl = Join-PublicUrl $PublicBaseUrl "api/v1/netprobe/ip"
$ipResponse = Invoke-JsonRequest -Method Get -Url $ipUrl
if ($ipResponse.StatusCode -ne 200 -or $ipResponse.Content -notmatch '"data"' -or $ipResponse.Content -notmatch '"address"') {
    throw "Control-plane NetProbe IP smoke failed for $ipUrl."
}
if ($ipResponse.Content -match "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder|noindex") {
    throw "Control-plane NetProbe IP smoke returned placeholder or HTML error for $ipUrl."
}

$dnsUrl = Join-PublicUrl $PublicBaseUrl "api/v1/netprobe/dns"
$dnsBody = @{ domain = $DnsDomain; types = @("A") } | ConvertTo-Json -Compress
$dnsResponse = Invoke-JsonRequest -Method Post -Url $dnsUrl -Body $dnsBody
if ($dnsResponse.StatusCode -ne 200 -or $dnsResponse.Content -notmatch '"records"') {
    throw "Control-plane NetProbe DNS smoke failed for $dnsUrl."
}
if ($dnsResponse.Content -match "(?i)<html|Internal Server Error|SuperSites bootstrap placeholder|noindex") {
    throw "Control-plane NetProbe DNS smoke returned placeholder or HTML error for $dnsUrl."
}

Write-Host "Control-plane public smoke passed on $PublicBaseUrl."
