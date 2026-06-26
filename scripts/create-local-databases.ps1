param(
    [string]$Mysql = "mysql",
    [string]$HostName = "127.0.0.1",
    [int]$Port = 3317,
    [string]$User = "root",
    [string]$Password = $env:SUPERSITES_LOCAL_MYSQL_PASSWORD,
    [string]$SqlFile = "infra/docker/mysql/init/01-create-local-databases.sql"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $SqlFile)) {
    throw "SQL file not found: $SqlFile"
}

$args = @("-h", $HostName, "-P", "$Port", "-u", $User)

$previousMysqlPwd = $env:MYSQL_PWD
if ($Password) {
    $env:MYSQL_PWD = $Password
}

try {
    Get-Content $SqlFile | & $Mysql @args
    if ($LASTEXITCODE -ne 0) {
        throw "mysql exited with code $LASTEXITCODE. Check local credentials and rerun with SUPERSITES_LOCAL_MYSQL_PASSWORD if needed."
    }
} finally {
    if ($null -eq $previousMysqlPwd) {
        Remove-Item Env:MYSQL_PWD -ErrorAction SilentlyContinue
    } else {
        $env:MYSQL_PWD = $previousMysqlPwd
    }
}

Write-Host "Local SuperSites databases ensured."
