param(
    [string]$CpanelHost = "opentshost.com",
    [int]$CpanelPort = 2083,
    [string]$CpanelUser = $env:SUPERSITES_CPANEL_USER,
    [string]$CpanelPassword = $env:SUPERSITES_CPANEL_PASSWORD
)

$ErrorActionPreference = "Stop"

if (-not $CpanelUser -or -not $CpanelPassword) {
    throw "Set SUPERSITES_CPANEL_USER and SUPERSITES_CPANEL_PASSWORD in the current shell."
}

$databaseSuffixes = @(
    "ss_hub",
    "ss_control",
    "ss_netprobe",
    "ss_calc",
    "ss_devutils",
    "ss_time",
    "ss_qrroute",
    "ss_invoice",
    "ss_mail",
    "ss_pulse",
    "ss_pixel",
    "ss_docshift"
)

$pair = "{0}:{1}" -f $CpanelUser, $CpanelPassword
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
$headers = @{ Authorization = "Basic $auth" }

foreach ($suffix in $databaseSuffixes) {
    $uri = "https://$CpanelHost`:$CpanelPort/execute/Mysql/create_database?name=$suffix"
    $response = Invoke-RestMethod -Method Get -Uri $uri -Headers $headers
    if ($response.status -ne 1) {
        throw "Failed to create database suffix '$suffix': $($response.errors -join '; ')"
    }
    Write-Host "Ensured cPanel database suffix: $suffix"
}

Write-Host "HostGator databases ensured. Create users and privileges according to least privilege policy."

