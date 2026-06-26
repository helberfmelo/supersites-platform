param(
    [string]$CpanelHost = "opentshost.com",
    [int]$CpanelPort = 2083,
    [string]$CpanelUser = $env:SUPERSITES_CPANEL_USER,
    [string]$CpanelPassword = $env:SUPERSITES_CPANEL_PASSWORD,
    [string]$RemoteBase = "/home1/opents62/public_html/supersites",
    [string]$CredentialMapPath = "docs/credentials/hostgator-db-users.local.json",
    [switch]$SkipPlaceholders
)

$ErrorActionPreference = "Stop"

if (-not $CpanelUser -or -not $CpanelPassword) {
    throw "Set SUPERSITES_CPANEL_USER and SUPERSITES_CPANEL_PASSWORD in the current shell."
}

$resources = @(
    [PSCustomObject]@{ App = "SuperSites Hub"; Folder = ""; DatabaseSuffix = "ss_hub"; UserSuffix = "sshub" },
    [PSCustomObject]@{ App = "Control Plane"; Folder = "control-plane"; DatabaseSuffix = "ss_control"; UserSuffix = "ssctrl" },
    [PSCustomObject]@{ App = "NetProbe Atlas"; Folder = "netprobe-atlas"; DatabaseSuffix = "ss_netprobe"; UserSuffix = "ssnet" },
    [PSCustomObject]@{ App = "CalcHarbor"; Folder = "calcharbor"; DatabaseSuffix = "ss_calc"; UserSuffix = "sscalc" },
    [PSCustomObject]@{ App = "DevUtility Lab"; Folder = "devutility-lab"; DatabaseSuffix = "ss_devutils"; UserSuffix = "ssdev" },
    [PSCustomObject]@{ App = "TimeNexus"; Folder = "timenexus"; DatabaseSuffix = "ss_time"; UserSuffix = "sstime" },
    [PSCustomObject]@{ App = "QRRoute"; Folder = "qrroute"; DatabaseSuffix = "ss_qrroute"; UserSuffix = "ssqr" },
    [PSCustomObject]@{ App = "InvoiceCraft"; Folder = "invoicecraft"; DatabaseSuffix = "ss_invoice"; UserSuffix = "ssinv" },
    [PSCustomObject]@{ App = "MailHealth"; Folder = "mailhealth"; DatabaseSuffix = "ss_mail"; UserSuffix = "ssmail" },
    [PSCustomObject]@{ App = "SitePulse Lab"; Folder = "sitepulse-lab"; DatabaseSuffix = "ss_pulse"; UserSuffix = "sspuls" },
    [PSCustomObject]@{ App = "PixelBatch"; Folder = "pixelbatch"; DatabaseSuffix = "ss_pixel"; UserSuffix = "sspix" },
    [PSCustomObject]@{ App = "DocShift"; Folder = "docshift"; DatabaseSuffix = "ss_docshift"; UserSuffix = "ssdoc" }
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

function Invoke-CpanelApi2 {
    param(
        [string]$Module,
        [string]$Function,
        [hashtable]$Parameters = @{}
    )

    $baseParameters = @{
        cpanel_jsonapi_user = $CpanelUser
        cpanel_jsonapi_apiversion = "2"
        cpanel_jsonapi_module = $Module
        cpanel_jsonapi_func = $Function
    }

    foreach ($key in $Parameters.Keys) {
        $baseParameters[$key] = $Parameters[$key]
    }

    $uri = "https://$CpanelHost`:$CpanelPort/json-api/cpanel?" + (New-QueryString $baseParameters)
    Invoke-RestMethod -Method Get -Uri $uri -Headers $headers -TimeoutSec 60
}

function Get-FileInfo {
    param([string]$Path)

    $response = Invoke-CpanelUapi "Fileman/get_file_information" @{
        path = $Path
        include_permissions = "1"
        show_hidden = "1"
    }

    if ($response.status -ne 1) {
        return $null
    }

    return $response.data
}

function Split-RemotePath {
    param([string]$Path)

    $normalized = $Path.TrimEnd("/")
    $index = $normalized.LastIndexOf("/")
    if ($index -le 0) {
        throw "Cannot split remote path: $Path"
    }

    [PSCustomObject]@{
        Parent = $normalized.Substring(0, $index)
        Name = $normalized.Substring($index + 1)
    }
}

function Ensure-RemoteDirectory {
    param([string]$Path)

    $info = Get-FileInfo $Path
    if ($info -and $info.exists) {
        Write-Host "Remote folder exists: $Path"
        return
    }

    $parts = Split-RemotePath $Path
    $response = Invoke-CpanelApi2 "Fileman" "mkdir" @{
        path = $parts.Parent
        name = $parts.Name
        permissions = "0755"
    }

    if ($response.cpanelresult.error) {
        throw "Failed to create remote folder '$Path': $($response.cpanelresult.error)"
    }

    $info = Get-FileInfo $Path
    if (-not $info -or -not $info.exists) {
        throw "Remote folder '$Path' was not confirmed after creation."
    }

    Write-Host "Created remote folder: $Path"
}

function New-SecretPassword {
    $alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!#%+-_=."
    $bytes = [byte[]]::new(28)
    $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
    try {
        $rng.GetBytes($bytes)
    }
    finally {
        $rng.Dispose()
    }
    $chars = foreach ($byte in $bytes) {
        $alphabet[$byte % $alphabet.Length]
    }
    -join $chars
}

function Read-PasswordMap {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        return @{}
    }

    $raw = Get-Content -Raw -LiteralPath $Path
    if (-not $raw.Trim()) {
        return @{}
    }

    $object = $raw | ConvertFrom-Json
    $map = @{}
    foreach ($property in $object.PSObject.Properties) {
        $map[$property.Name] = $property.Value
    }

    return $map
}

function Write-PasswordMap {
    param(
        [string]$Path,
        [hashtable]$Map
    )

    $directory = Split-Path -Parent $Path
    if ($directory -and -not (Test-Path -LiteralPath $directory)) {
        New-Item -ItemType Directory -Path $directory | Out-Null
    }

    $ordered = [ordered]@{}
    foreach ($key in ($Map.Keys | Sort-Object)) {
        $ordered[$key] = $Map[$key]
    }

    $ordered | ConvertTo-Json | Set-Content -LiteralPath $Path -Encoding UTF8
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

function Ensure-Database {
    param(
        [string]$DatabaseSuffix,
        [array]$ExistingDatabases,
        [string]$Prefix
    )

    $fullName = "$Prefix$DatabaseSuffix"
    if ($ExistingDatabases.database -contains $fullName) {
        Write-Host "Database exists: $fullName"
        return
    }

    $response = Invoke-CpanelUapi "Mysql/create_database" @{ name = $fullName }
    Assert-UapiSuccess $response "Failed to create database '$fullName'."
    Write-Host "Created database: $fullName"
}

function Ensure-DatabaseUser {
    param(
        [string]$UserSuffix,
        [string]$Password,
        [array]$ExistingUsers,
        [string]$Prefix
    )

    $fullName = "$Prefix$UserSuffix"
    if ($ExistingUsers.user -contains $fullName) {
        Write-Host "Database user exists: $fullName"
        return
    }

    $response = Invoke-CpanelUapi "Mysql/create_user" @{
        name = $fullName
        password = $Password
    }
    Assert-UapiSuccess $response "Failed to create database user '$fullName'."
    Write-Host "Created database user: $fullName"
}

function Ensure-DatabasePrivileges {
    param(
        [string]$DatabaseName,
        [string]$UserName
    )

    $response = Invoke-CpanelUapi "Mysql/set_privileges_on_database" @{
        database = $DatabaseName
        user = $UserName
        privileges = "ALL PRIVILEGES"
    }
    Assert-UapiSuccess $response "Failed to set privileges for '$UserName' on '$DatabaseName'."
    Write-Host "Ensured privileges: $UserName -> $DatabaseName"
}

function Save-Placeholder {
    param(
        [string]$FolderPath,
        [string]$Title
    )

    $content = @"
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex">
  <title>$Title - SuperSites bootstrap</title>
</head>
<body>
  <h1>$Title</h1>
  <p>SuperSites bootstrap placeholder. Production app deploy is pending.</p>
</body>
</html>
"@

    $response = Invoke-CpanelUapi "Fileman/save_file_content" @{
        dir = $FolderPath
        file = "index.html"
        content = $content
    }
    Assert-UapiSuccess $response "Failed to save placeholder for '$Title'."
    Write-Host "Ensured placeholder: $FolderPath/index.html"
}

$restrictions = Invoke-CpanelUapi "Mysql/get_restrictions"
Assert-UapiSuccess $restrictions "Failed to read MySQL restrictions."
$prefix = $restrictions.data.prefix

Ensure-RemoteDirectory $RemoteBase
foreach ($resource in $resources | Where-Object { $_.Folder }) {
    Ensure-RemoteDirectory "$RemoteBase/$($resource.Folder)"
}

$databases = Invoke-CpanelUapi "Mysql/list_databases"
Assert-UapiSuccess $databases "Failed to list databases."
$users = Invoke-CpanelUapi "Mysql/list_users"
Assert-UapiSuccess $users "Failed to list database users."

$passwordMap = Read-PasswordMap $CredentialMapPath
$passwordMapChanged = $false

foreach ($resource in $resources) {
    $fullUser = "$prefix$($resource.UserSuffix)"
    if (-not $passwordMap.ContainsKey($fullUser)) {
        $passwordMap[$fullUser] = New-SecretPassword
        $passwordMapChanged = $true
    }

    Ensure-Database $resource.DatabaseSuffix @($databases.data) $prefix
    Ensure-DatabaseUser $resource.UserSuffix $passwordMap[$fullUser] @($users.data) $prefix
    Ensure-DatabasePrivileges "$prefix$($resource.DatabaseSuffix)" $fullUser
}

if ($passwordMapChanged) {
    Write-PasswordMap $CredentialMapPath $passwordMap
    Write-Host "Updated local database credential map: $CredentialMapPath"
}

if (-not $SkipPlaceholders) {
    Save-Placeholder $RemoteBase "SuperSites Hub"
    foreach ($resource in $resources | Where-Object { $_.Folder }) {
        Save-Placeholder "$RemoteBase/$($resource.Folder)" $resource.App
    }
}

Write-Host "HostGator bootstrap completed."
