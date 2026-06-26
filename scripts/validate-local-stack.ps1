$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$controlPlane = Join-Path $root "apps/control-plane"

$containers = @("supersites-mysql", "supersites-redis", "supersites-mailpit")
foreach ($container in $containers) {
    $health = docker inspect --format "{{.State.Health.Status}}" $container
    if ($health -ne "healthy") {
        throw "Container $container is not healthy: $health"
    }
}

$server = Start-Process -FilePath "php" `
    -ArgumentList @("artisan", "serve", "--host=127.0.0.1", "--port=8013") `
    -WorkingDirectory $controlPlane `
    -PassThru `
    -WindowStyle Hidden

try {
    Start-Sleep -Seconds 3
    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:8013/health" -UseBasicParsing -TimeoutSec 20
    }
    catch {
        if ($_.Exception.Response) {
            $statusCode = [int]$_.Exception.Response.StatusCode
            throw "Control plane health returned HTTP $statusCode"
        }

        throw
    }

    if ($response.StatusCode -ne 200) {
        throw "Control plane health returned HTTP $($response.StatusCode): $($response.Content)"
    }

    $health = $response.Content | ConvertFrom-Json
    if ($health.status -ne "ok") {
        throw "Control plane health status is $($health.status)"
    }

    Write-Host "Local Docker services and control-plane health are ok."
}
finally {
    if ($server -and -not $server.HasExited) {
        Stop-Process -Id $server.Id -Force
    }
}
