param(
    [string]$SshHost = "129.121.37.220",
    [int]$SshPort = 22022,
    [string]$SshUser = "root",
    [string]$SshKeyPath = (Join-Path $HOME ".ssh\id_ed25519_vps_hostgator"),
    [string]$RedisCredentialPath = "docs/credentials/vps-redis.local.json",
    [int[]]$PublicRedisPorts = @(6379, 6380, 6381),
    [switch]$SkipPublicPortCheck
)

$ErrorActionPreference = "Stop"

function Assert-Path {
    param(
        [string]$Path,
        [string]$Description
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "$Description not found: $Path"
    }
}

function Invoke-SshScript {
    param([string]$Script)

    $normalizedScript = $Script -replace "`r`n", "`n"
    $output = $normalizedScript | ssh `
        -o BatchMode=yes `
        -o StrictHostKeyChecking=accept-new `
        -o ConnectTimeout=12 `
        -i $SshKeyPath `
        -p $SshPort `
        "$SshUser@$SshHost" `
        "bash -s"

    if ($LASTEXITCODE -ne 0) {
        throw "Remote SSH validation failed with exit code $LASTEXITCODE."
    }

    return $output
}

function Test-TcpPortOpen {
    param(
        [string]$HostName,
        [int]$Port,
        [int]$TimeoutMs = 2500
    )

    $client = [System.Net.Sockets.TcpClient]::new()
    try {
        $async = $client.BeginConnect($HostName, $Port, $null, $null)
        $completed = $async.AsyncWaitHandle.WaitOne($TimeoutMs, $false)
        if (-not $completed) {
            return $false
        }

        try {
            $client.EndConnect($async)
        }
        catch {
            return $false
        }

        return $client.Connected
    }
    finally {
        $client.Close()
    }
}

Assert-Path $SshKeyPath "SSH key"
Assert-Path $RedisCredentialPath "Redis credential inventory"

$redisCredential = Get-Content -Raw -LiteralPath $RedisCredentialPath | ConvertFrom-Json
if (-not $redisCredential.user -or -not $redisCredential.password) {
    throw "Redis credential inventory is missing user or password."
}

$redisPasswordBase64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes([string]$redisCredential.password))
$redisUser = [string]$redisCredential.user
$redisHost = if ($redisCredential.host) { [string]$redisCredential.host } else { "127.0.0.1" }
$redisPort = if ($redisCredential.port) { [int]$redisCredential.port } else { 6381 }

$remoteScriptTemplate = @'
set -euo pipefail

REDIS_USER='__REDIS_USER__'
REDIS_HOST='__REDIS_HOST__'
REDIS_PORT='__REDIS_PORT__'
REDIS_PASSWORD="$(printf '%s' '__REDIS_PASSWORD_BASE64__' | base64 -d)"

systemctl is-active --quiet supersites-redis.service
REDISCLI_AUTH="${REDIS_PASSWORD}" redis-cli -h "${REDIS_HOST}" -p "${REDIS_PORT}" --user "${REDIS_USER}" PING | grep -qx PONG

LISTEN_LINES="$(ss -ltnp | grep ":${REDIS_PORT}" || true)"
if echo "${LISTEN_LINES}" | grep -Eq "0\\.0\\.0\\.0:${REDIS_PORT}|\\*:${REDIS_PORT}"; then
  echo "Unsafe Redis bind detected on public interfaces." >&2
  echo "${LISTEN_LINES}" >&2
  exit 1
fi

if ! echo "${LISTEN_LINES}" | grep -q "127\\.0\\.0\\.1:${REDIS_PORT}"; then
  echo "Expected local Redis bind was not detected." >&2
  echo "${LISTEN_LINES}" >&2
  exit 1
fi

test -d /srv/supersites/releases
test -d /srv/supersites/shared/logs
test -d /srv/supersites/backups
test -d /var/lib/supersites-redis
test -d /var/log/supersites
id supersites >/dev/null

printf 'VPS Redis service active.\n'
printf 'VPS Redis PING passed.\n'
printf 'VPS Redis bind local-only on %s:%s.\n' "${REDIS_HOST}" "${REDIS_PORT}"
printf 'VPS SuperSites layout exists.\n'
'@

$remoteScript = $remoteScriptTemplate.
    Replace("__REDIS_USER__", $redisUser).
    Replace("__REDIS_HOST__", $redisHost).
    Replace("__REDIS_PORT__", [string]$redisPort).
    Replace("__REDIS_PASSWORD_BASE64__", $redisPasswordBase64)

Invoke-SshScript -Script $remoteScript | ForEach-Object { Write-Host $_ }

if (-not $SkipPublicPortCheck) {
    foreach ($port in $PublicRedisPorts) {
        if (Test-TcpPortOpen -HostName $SshHost -Port $port) {
            throw "Public TCP port $port is open on $SshHost."
        }

        Write-Host "Public TCP port $port closed or filtered."
    }
}

Write-Host "VPS runtime validation passed."
