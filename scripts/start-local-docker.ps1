param(
    [string]$ComposeFile = "infra/docker/compose.local.yml"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path "infra/docker/.env.local")) {
    throw "Missing infra/docker/.env.local. Copy infra/docker/.env.example and set local-only values."
}

docker compose -f $ComposeFile --env-file infra/docker/.env.local up -d
if ($LASTEXITCODE -ne 0) {
    throw "docker compose up failed with code $LASTEXITCODE."
}

Write-Host "Local Docker services requested."

