param(
    [string]$Repository = "helberfmelo/supersites-platform",
    [string]$CredentialInventoryPath = "docs/credentials/credentials.local.md",
    [string]$VpsRedisCredentialPath = "docs/credentials/vps-redis.local.json",
    [string]$VpsSshKeyPath = (Join-Path $HOME ".ssh\id_ed25519_vps_hostgator")
)

$ErrorActionPreference = "Stop"

function Invoke-Gh {
    param([string[]]$Arguments)

    & gh @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "gh command failed: gh $($Arguments -join ' ')"
    }
}

function Ensure-Environment {
    param([string]$Name)

    Invoke-Gh -Arguments @("api", "--silent", "--method", "PUT", "repos/$Repository/environments/$Name")
    Write-Host "GitHub environment ensured: $Name"
}

function Set-EnvironmentVariable {
    param(
        [string]$Environment,
        [string]$Name,
        [string]$Value
    )

    Invoke-Gh -Arguments @("variable", "set", $Name, "--repo", $Repository, "--env", $Environment, "--body", $Value)
    Write-Host "GitHub environment variable set: $Environment/$Name"
}

function Set-EnvironmentSecret {
    param(
        [string]$Environment,
        [string]$Name,
        [string]$Value
    )

    if (-not $Value) {
        Write-Host "GitHub environment secret skipped: $Environment/$Name"
        return
    }

    $Value | gh secret set $Name --repo $Repository --env $Environment | Out-Null
    if ($LASTEXITCODE -ne 0) {
        throw "Failed to set GitHub environment secret: $Environment/$Name"
    }

    Write-Host "GitHub environment secret set: $Environment/$Name"
}

function Get-CpanelCredentials {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        return $null
    }

    $content = Get-Content -Raw -LiteralPath $Path
    $sections = [regex]::Matches($content, "(?ims)^##[^\r\n]*(?:cpanel|hostgator|opentshost)[\s\S]*?(?=^##|\z)")
    foreach ($sectionMatch in $sections) {
        $section = $sectionMatch.Value
        if ($section -notmatch "(?i)cpanel|2083|opents62") {
            continue
        }

        $userMatch = [regex]::Match($section, "(?im)(?:usu[aá]rio|usuario|user)\s*[:=-]\s*`?(?<value>[^`\r\n]+)`?")
        $passwordMatch = [regex]::Match($section, "(?im)(?:senha|password)\s*[:=-]\s*`?(?<value>[^`\r\n]+)`?")
        if ($userMatch.Success -and $passwordMatch.Success) {
            return [pscustomobject]@{
                User = $userMatch.Groups["value"].Value.Trim()
                Password = $passwordMatch.Groups["value"].Value.Trim()
            }
        }
    }

    return $null
}

Ensure-Environment "staging-hostgator"
Ensure-Environment "production-hostgator"
Ensure-Environment "production-vps-runtime"

$hostgatorVariables = @{
    SUPERSITES_TARGET_KIND = "hostgator-cpanel"
    SUPERSITES_CPANEL_HOST = "opentshost.com"
    SUPERSITES_CPANEL_PORT = "2083"
    SUPERSITES_REMOTE_BASE = "/home1/opents62/public_html/supersites"
    SUPERSITES_PUBLIC_BASE_URL = "https://opentshost.com/supersites"
    SUPERSITES_DEPLOY_MODE = "dry-run"
}

foreach ($environment in @("staging-hostgator", "production-hostgator")) {
    foreach ($entry in $hostgatorVariables.GetEnumerator()) {
        Set-EnvironmentVariable -Environment $environment -Name $entry.Key -Value $entry.Value
    }
}

$cpanelCredentials = Get-CpanelCredentials -Path $CredentialInventoryPath
if ($cpanelCredentials) {
    foreach ($environment in @("staging-hostgator", "production-hostgator")) {
        Set-EnvironmentSecret -Environment $environment -Name "SUPERSITES_CPANEL_USER" -Value $cpanelCredentials.User
        Set-EnvironmentSecret -Environment $environment -Name "SUPERSITES_CPANEL_PASSWORD" -Value $cpanelCredentials.Password
    }
} else {
    Write-Host "GitHub environment secrets skipped: cPanel credentials were not parsed from local inventory."
}

$vpsVariables = @{
    SUPERSITES_VPS_HOST = "129.121.37.220"
    SUPERSITES_VPS_PORT = "22022"
    SUPERSITES_VPS_USER = "root"
    SUPERSITES_REDIS_HOST = "127.0.0.1"
    SUPERSITES_REDIS_PORT = "6381"
    SUPERSITES_REDIS_USER = "supersites"
}

foreach ($entry in $vpsVariables.GetEnumerator()) {
    Set-EnvironmentVariable -Environment "production-vps-runtime" -Name $entry.Key -Value $entry.Value
}

if (Test-Path -LiteralPath $VpsSshKeyPath) {
    $vpsSshKey = Get-Content -Raw -LiteralPath $VpsSshKeyPath
    Set-EnvironmentSecret -Environment "production-vps-runtime" -Name "SUPERSITES_VPS_SSH_KEY" -Value $vpsSshKey
} else {
    Write-Host "GitHub environment secret skipped: production-vps-runtime/SUPERSITES_VPS_SSH_KEY"
}

if (Test-Path -LiteralPath $VpsRedisCredentialPath) {
    $redisCredential = Get-Content -Raw -LiteralPath $VpsRedisCredentialPath | ConvertFrom-Json
    Set-EnvironmentSecret -Environment "production-vps-runtime" -Name "SUPERSITES_REDIS_PASSWORD" -Value ([string]$redisCredential.password)
} else {
    Write-Host "GitHub environment secret skipped: production-vps-runtime/SUPERSITES_REDIS_PASSWORD"
}

Write-Host "GitHub environments synchronization completed."
