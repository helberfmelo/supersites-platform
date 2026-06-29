param(
    [int] $Port = 8014,
    [string] $OutputRoot = "artifacts/control-plane-admin-audit"
)

$ErrorActionPreference = "Stop"

$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$AppDir = Join-Path $RepoRoot "apps/control-plane"
$RunId = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH-mm-ssZ")
$RunDir = Join-Path (Join-Path $RepoRoot $OutputRoot) $RunId
$DatabasePath = Join-Path $RunDir "control-plane-admin-audit.sqlite"
$BaseUrl = "http://127.0.0.1:$Port"
$Email = "owner@supersites.local"
$Credential = "password"
$ServerOut = Join-Path $RunDir "server.out.log"
$ServerErr = Join-Path $RunDir "server.err.log"

$envNames = @(
    "APP_NAME",
    "APP_ENV",
    "APP_KEY",
    "APP_DEBUG",
    "APP_URL",
    "BCRYPT_ROUNDS",
    "DB_CONNECTION",
    "DB_DATABASE",
    "DB_URL",
    "SESSION_DRIVER",
    "CACHE_STORE",
    "QUEUE_CONNECTION",
    "MAIL_MAILER",
    "LOG_CHANNEL",
    "LOG_LEVEL",
    "SUPERSITES_HEALTH_CHECK_CONNECTIONS"
)
$previousEnv = @{}

foreach ($name in $envNames) {
    $previousEnv[$name] = [Environment]::GetEnvironmentVariable($name, "Process")
}

function Set-ProcessEnv {
    param(
        [string] $Name,
        [string] $Value
    )

    [Environment]::SetEnvironmentVariable($Name, $Value, "Process")
}

function Restore-ProcessEnv {
    foreach ($name in $envNames) {
        [Environment]::SetEnvironmentVariable($name, $previousEnv[$name], "Process")
    }
}

function Invoke-Checked {
    param(
        [string] $FilePath,
        [string[]] $Arguments,
        [string] $WorkingDirectory
    )

    Push-Location $WorkingDirectory
    try {
        & $FilePath @Arguments
        if ($LASTEXITCODE -ne 0) {
            $safeArguments = $Arguments | ForEach-Object {
                if ($_ -like "--credential=*") { "--credential=[seeded-local]" } else { $_ }
            }
            throw "$FilePath $($safeArguments -join ' ') failed with exit code $LASTEXITCODE"
        }
    } finally {
        Pop-Location
    }
}

function Wait-ForServer {
    param([string] $Url)

    for ($i = 0; $i -lt 40; $i++) {
        try {
            $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 2
            if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
                return
            }
        } catch {
            Start-Sleep -Milliseconds 750
        }
    }

    throw "Local control-plane server did not become ready at $Url"
}

function Stop-LocalPhpServer {
    if ($IsWindows -or $env:OS -eq "Windows_NT") {
        Get-CimInstance Win32_Process -Filter "name = 'php.exe'" |
            Where-Object {
                $_.CommandLine -like "*127.0.0.1:$Port*" -and
                $_.CommandLine -like "*$AppDir*"
            } |
            ForEach-Object {
                Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue
            }
    }
}

New-Item -ItemType Directory -Force -Path $RunDir | Out-Null
New-Item -ItemType File -Force -Path $DatabasePath | Out-Null

$server = $null

try {
    Stop-LocalPhpServer

    Set-ProcessEnv "APP_NAME" "SuperSites Control Plane"
    Set-ProcessEnv "APP_ENV" "local"
    Set-ProcessEnv "APP_KEY" "base64:AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
    Set-ProcessEnv "APP_DEBUG" "false"
    Set-ProcessEnv "APP_URL" $BaseUrl
    Set-ProcessEnv "BCRYPT_ROUNDS" "4"
    Set-ProcessEnv "DB_CONNECTION" "sqlite"
    Set-ProcessEnv "DB_DATABASE" $DatabasePath
    Set-ProcessEnv "DB_URL" ""
    Set-ProcessEnv "SESSION_DRIVER" "file"
    Set-ProcessEnv "CACHE_STORE" "array"
    Set-ProcessEnv "QUEUE_CONNECTION" "sync"
    Set-ProcessEnv "MAIL_MAILER" "array"
    Set-ProcessEnv "LOG_CHANNEL" "single"
    Set-ProcessEnv "LOG_LEVEL" "warning"
    Set-ProcessEnv "SUPERSITES_HEALTH_CHECK_CONNECTIONS" "false"

    Invoke-Checked -FilePath "php" -Arguments @("artisan", "config:clear", "--no-interaction") -WorkingDirectory $AppDir
    Invoke-Checked -FilePath "php" -Arguments @("artisan", "migrate:fresh", "--seed", "--force", "--no-interaction") -WorkingDirectory $AppDir

    $startArgs = @{
        FilePath = "php"
        ArgumentList = @("artisan", "serve", "--host=127.0.0.1", "--port=$Port")
        WorkingDirectory = $AppDir
        RedirectStandardOutput = $ServerOut
        RedirectStandardError = $ServerErr
        PassThru = $true
    }

    if ($IsWindows -or $env:OS -eq "Windows_NT") {
        $startArgs["WindowStyle"] = "Hidden"
    }

    $server = Start-Process @startArgs
    Wait-ForServer -Url "$BaseUrl/login"

    Invoke-Checked -FilePath "node" -Arguments @(
        "scripts/audit-control-plane-admin.mjs",
        "--base-url=$BaseUrl",
        "--email=$Email",
        "--credential=$Credential",
        "--output-dir=$RunDir"
    ) -WorkingDirectory $RepoRoot

    $summaryPath = Join-Path $RunDir "admin-audit.json"
    $summary = Get-Content -Raw -LiteralPath $summaryPath | ConvertFrom-Json

    Write-Host "Control-plane admin audit run: $RunId"
    Write-Host "Status: $($summary.status)"
    Write-Host "Pages: $($summary.results.Count)"
    Write-Host "Markdown: $(Join-Path $RunDir 'admin-audit.md')"
    Write-Host "JSON: $summaryPath"
} finally {
    if ($server -and -not $server.HasExited) {
        Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
        $server.WaitForExit(5000) | Out-Null
    }

    Stop-LocalPhpServer

    Restore-ProcessEnv
}
