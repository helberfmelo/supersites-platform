param(
    [string]$CpanelHost = "opentshost.com",
    [int]$CpanelPort = 2083,
    [string]$CpanelUser = $env:SUPERSITES_CPANEL_USER,
    [string]$CpanelPassword = $env:SUPERSITES_CPANEL_PASSWORD
)

$ErrorActionPreference = "Stop"

Write-Warning "This script is superseded by scripts/hostgator-bootstrap.ps1."

& "$PSScriptRoot/hostgator-bootstrap.ps1" `
    -CpanelHost $CpanelHost `
    -CpanelPort $CpanelPort `
    -CpanelUser $CpanelUser `
    -CpanelPassword $CpanelPassword `
    -SkipPlaceholders
