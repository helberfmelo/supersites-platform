param(
    [string]$CpanelHost = "opentshost.com",
    [int]$CpanelPort = 2083,
    [string]$CpanelUser = $env:SUPERSITES_CPANEL_USER,
    [string]$CpanelPassword = $env:SUPERSITES_CPANEL_PASSWORD,
    [string]$RemoteBase = "/home1/opents62/public_html/supersites",
    [string]$PublicBaseUrl = "https://opentshost.com/supersites"
)

$ErrorActionPreference = "Stop"

if (-not $CpanelUser -or -not $CpanelPassword) {
    throw "Set SUPERSITES_CPANEL_USER and SUPERSITES_CPANEL_PASSWORD in the current shell."
}

$resources = @(
    [PSCustomObject]@{ Folder = ""; Database = "opents62_ss_hub"; User = "opents62_sshub" },
    [PSCustomObject]@{ Folder = "control-plane"; Database = "opents62_ss_control"; User = "opents62_ssctrl" },
    [PSCustomObject]@{ Folder = "netprobe-atlas"; Database = "opents62_ss_netprobe"; User = "opents62_ssnet" },
    [PSCustomObject]@{ Folder = "calcharbor"; Database = "opents62_ss_calc"; User = "opents62_sscalc" },
    [PSCustomObject]@{ Folder = "devutility-lab"; Database = "opents62_ss_devutils"; User = "opents62_ssdev" },
    [PSCustomObject]@{ Folder = "timenexus"; Database = "opents62_ss_time"; User = "opents62_sstime" },
    [PSCustomObject]@{ Folder = "qrroute"; Database = "opents62_ss_qrroute"; User = "opents62_ssqr" },
    [PSCustomObject]@{ Folder = "invoicecraft"; Database = "opents62_ss_invoice"; User = "opents62_ssinv" },
    [PSCustomObject]@{ Folder = "mailhealth"; Database = "opents62_ss_mail"; User = "opents62_ssmail" },
    [PSCustomObject]@{ Folder = "sitepulse-lab"; Database = "opents62_ss_pulse"; User = "opents62_sspuls" },
    [PSCustomObject]@{ Folder = "pixelbatch"; Database = "opents62_ss_pixel"; User = "opents62_sspix" },
    [PSCustomObject]@{ Folder = "docshift"; Database = "opents62_ss_docshift"; User = "opents62_ssdoc" }
)

$pair = "{0}:{1}" -f $CpanelUser, $CpanelPassword
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($pair))
$headers = @{ Authorization = "Basic $auth" }

function New-QueryString {
    param([hashtable]$Parameters)

    $pairs = @()
    foreach ($key in $Parameters.Keys) {
        $pairs += ("{0}={1}" -f [Uri]::EscapeDataString($key), [Uri]::EscapeDataString([string]$Parameters[$key]))
    }

    return $pairs -join "&"
}

function Invoke-CpanelUapi {
    param(
        [string]$Path,
        [hashtable]$Parameters = @{}
    )

    $uri = "https://$CpanelHost`:$CpanelPort/execute/$Path"
    $query = New-QueryString $Parameters
    if ($query) {
        $uri = "$uri`?$query"
    }

    Invoke-RestMethod -Method Get -Uri $uri -Headers $headers -TimeoutSec 60
}

function Assert-UapiSuccess {
    param(
        [object]$Response,
        [string]$Message
    )

    if ($Response.status -ne 1) {
        $errors = @($Response.errors) -join "; "
        throw "$Message $errors"
    }
}

$databases = Invoke-CpanelUapi "Mysql/list_databases"
Assert-UapiSuccess $databases "Failed to list databases."
$users = Invoke-CpanelUapi "Mysql/list_users"
Assert-UapiSuccess $users "Failed to list database users."

$missingDatabases = @()
$missingUsers = @()
$missingFolders = @()
$failedUrls = @()

foreach ($resource in $resources) {
    if ($databases.data.database -notcontains $resource.Database) {
        $missingDatabases += $resource.Database
    }

    if ($users.data.user -notcontains $resource.User) {
        $missingUsers += $resource.User
    }

    $remotePath = if ($resource.Folder) { "$RemoteBase/$($resource.Folder)" } else { $RemoteBase }
    $folder = Invoke-CpanelUapi "Fileman/get_file_information" @{
        path = $remotePath
        include_permissions = "1"
        show_hidden = "1"
    }
    if ($folder.status -ne 1 -or -not $folder.data.exists) {
        $missingFolders += $remotePath
    }

    $url = if ($resource.Folder) { "$PublicBaseUrl/$($resource.Folder)/" } else { "$PublicBaseUrl/" }
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -ne 200 -or $response.Content -notmatch "SuperSites bootstrap placeholder") {
        $failedUrls += $url
    }
}

if ($missingDatabases.Count -gt 0) {
    throw "Missing HostGator databases: $($missingDatabases -join ', ')"
}

if ($missingUsers.Count -gt 0) {
    throw "Missing HostGator database users: $($missingUsers -join ', ')"
}

if ($missingFolders.Count -gt 0) {
    throw "Missing HostGator folders: $($missingFolders -join ', ')"
}

if ($failedUrls.Count -gt 0) {
    throw "Failed HostGator placeholder URLs: $($failedUrls -join ', ')"
}

Write-Host "HostGator bootstrap validation passed: 12 databases, 12 users, 12 folders, 12 HTTP placeholders."
