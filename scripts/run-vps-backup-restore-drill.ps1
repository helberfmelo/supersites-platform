param(
    [string]$SshHost = "129.121.37.220",
    [int]$SshPort = 22022,
    [string]$SshUser = "root",
    [string]$SshKeyPath = (Join-Path $HOME ".ssh\id_ed25519_vps_hostgator"),
    [string]$RedisCredentialPath = "docs/credentials/vps-redis.local.json",
    [string]$OutputDirectory = "",
    [int[]]$PublicRedisPorts = @(6379, 6380, 6381),
    [switch]$SkipPublicPortCheck
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $OutputDirectory) {
    $OutputDirectory = Join-Path $repoRoot "artifacts/vps-backup-restore-drill"
}

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
        throw "Remote SSH backup/restore drill failed with exit code $LASTEXITCODE."
    }

    return @($output)
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

function Convert-KeyValueOutput {
    param([string[]]$Lines)

    $values = @{}
    foreach ($line in $Lines) {
        if ($line -match "^([A-Z0-9_]+)=(.*)$") {
            $values[$Matches[1]] = $Matches[2]
        }
    }

    return $values
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

BACKUP_ROOT="/srv/supersites/backups/redis-drills"
REDIS_DATA_DIR="/var/lib/supersites-redis"
SUPERSITES_ROOT="/srv/supersites"

for guarded_path in "${BACKUP_ROOT}" "${REDIS_DATA_DIR}" "${SUPERSITES_ROOT}"; do
  case "${guarded_path}" in
    /srv/bigshop360*|/var/lib/mysql*|/etc/nginx*|/etc/httpd*)
      echo "Refusing guarded path: ${guarded_path}" >&2
      exit 1
      ;;
  esac
done

systemctl is-active --quiet supersites-redis.service
REDIS_PING="$(REDISCLI_AUTH="${REDIS_PASSWORD}" redis-cli -h "${REDIS_HOST}" -p "${REDIS_PORT}" --user "${REDIS_USER}" PING)"
if [ "${REDIS_PING}" != "PONG" ]; then
  echo "Redis PING failed." >&2
  exit 1
fi

test -d "${REDIS_DATA_DIR}"
test -d "${SUPERSITES_ROOT}/releases"
test -d "${SUPERSITES_ROOT}/shared/logs"
test -d "${SUPERSITES_ROOT}/backups"

RUN_ID="$(date -u +%Y-%m-%dT%H-%M-%SZ)"
RUN_ROOT="${BACKUP_ROOT}/${RUN_ID}"
RESTORE_ROOT="${RUN_ROOT}/restore-test"
ARCHIVE_PATH="${RUN_ROOT}/supersites-redis-data.tar.gz"
SOURCE_MANIFEST="${RUN_ROOT}/redis-source-manifest.tsv"
RESTORE_MANIFEST="${RUN_ROOT}/redis-restore-manifest.tsv"
LAYOUT_MANIFEST="${RUN_ROOT}/supersites-layout.tsv"
PERSISTENCE_REPORT="${RUN_ROOT}/redis-persistence.txt"
REMOTE_REPORT="${RUN_ROOT}/drill-report.txt"

mkdir -p "${RUN_ROOT}"
chmod 700 "${RUN_ROOT}"

find "${REDIS_DATA_DIR}" -maxdepth 3 -printf '%y\t%P\t%s\n' | LC_ALL=C sort > "${SOURCE_MANIFEST}"
find "${SUPERSITES_ROOT}" -maxdepth 2 -type d -printf '%P\n' | LC_ALL=C sort > "${LAYOUT_MANIFEST}"
REDISCLI_AUTH="${REDIS_PASSWORD}" redis-cli -h "${REDIS_HOST}" -p "${REDIS_PORT}" --user "${REDIS_USER}" INFO persistence \
  | tr -d '\r' \
  | awk -F: '/^(loading|rdb_last_bgsave_status|rdb_last_save_time|aof_enabled):/ { print $1 "=" $2 }' \
  > "${PERSISTENCE_REPORT}"

tar -czf "${ARCHIVE_PATH}" -C / var/lib/supersites-redis
ARCHIVE_SHA256="$(sha256sum "${ARCHIVE_PATH}" | awk '{ print $1 }')"
ARCHIVE_SIZE_BYTES="$(stat -c '%s' "${ARCHIVE_PATH}")"

mkdir -p "${RESTORE_ROOT}"
tar -xzf "${ARCHIVE_PATH}" -C "${RESTORE_ROOT}"
find "${RESTORE_ROOT}/var/lib/supersites-redis" -maxdepth 3 -printf '%y\t%P\t%s\n' | LC_ALL=C sort > "${RESTORE_MANIFEST}"

if ! cmp -s "${SOURCE_MANIFEST}" "${RESTORE_MANIFEST}"; then
  echo "Restored Redis manifest does not match source manifest." >&2
  exit 1
fi

case "${RESTORE_ROOT}" in
  "${RUN_ROOT}/restore-test")
    rm -rf "${RESTORE_ROOT}"
    RESTORE_CLEANUP="removed"
    ;;
  *)
    echo "Unexpected restore path: ${RESTORE_ROOT}" >&2
    exit 1
    ;;
esac

REDIS_FILE_COUNT="$(find "${REDIS_DATA_DIR}" -type f | wc -l | tr -d ' ')"
LAYOUT_DIR_COUNT="$(find "${SUPERSITES_ROOT}" -maxdepth 2 -type d | wc -l | tr -d ' ')"

{
  printf 'run_id=%s\n' "${RUN_ID}"
  printf 'created_at_utc=%s\n' "${RUN_ID}"
  printf 'remote_run_root=%s\n' "${RUN_ROOT}"
  printf 'remote_archive=%s\n' "${ARCHIVE_PATH}"
  printf 'archive_sha256=%s\n' "${ARCHIVE_SHA256}"
  printf 'archive_size_bytes=%s\n' "${ARCHIVE_SIZE_BYTES}"
  printf 'redis_file_count=%s\n' "${REDIS_FILE_COUNT}"
  printf 'layout_dir_count=%s\n' "${LAYOUT_DIR_COUNT}"
  printf 'restore_manifest_match=true\n'
  printf 'restore_cleanup=%s\n' "${RESTORE_CLEANUP}"
  printf 'bigshop360_touched=false\n'
} > "${REMOTE_REPORT}"

printf 'DRILL_RUN_ID=%s\n' "${RUN_ID}"
printf 'REMOTE_RUN_ROOT=%s\n' "${RUN_ROOT}"
printf 'REMOTE_ARCHIVE=%s\n' "${ARCHIVE_PATH}"
printf 'ARCHIVE_SHA256=%s\n' "${ARCHIVE_SHA256}"
printf 'ARCHIVE_SIZE_BYTES=%s\n' "${ARCHIVE_SIZE_BYTES}"
printf 'SOURCE_MANIFEST=%s\n' "${SOURCE_MANIFEST}"
printf 'RESTORE_MANIFEST=%s\n' "${RESTORE_MANIFEST}"
printf 'LAYOUT_MANIFEST=%s\n' "${LAYOUT_MANIFEST}"
printf 'PERSISTENCE_REPORT=%s\n' "${PERSISTENCE_REPORT}"
printf 'REMOTE_REPORT=%s\n' "${REMOTE_REPORT}"
printf 'RESTORE_MANIFEST_MATCH=true\n'
printf 'RESTORE_CLEANUP=%s\n' "${RESTORE_CLEANUP}"
printf 'REDIS_FILE_COUNT=%s\n' "${REDIS_FILE_COUNT}"
printf 'LAYOUT_DIR_COUNT=%s\n' "${LAYOUT_DIR_COUNT}"
printf 'REDIS_SERVICE_ACTIVE=true\n'
printf 'REDIS_PING=PONG\n'
printf 'BIGSHOP360_TOUCHED=false\n'
'@

$remoteScript = $remoteScriptTemplate.
    Replace("__REDIS_USER__", $redisUser).
    Replace("__REDIS_HOST__", $redisHost).
    Replace("__REDIS_PORT__", [string]$redisPort).
    Replace("__REDIS_PASSWORD_BASE64__", $redisPasswordBase64)

$remoteOutput = Invoke-SshScript -Script $remoteScript
$remoteValues = Convert-KeyValueOutput -Lines $remoteOutput

$requiredKeys = @(
    "DRILL_RUN_ID",
    "REMOTE_RUN_ROOT",
    "REMOTE_ARCHIVE",
    "ARCHIVE_SHA256",
    "ARCHIVE_SIZE_BYTES",
    "RESTORE_MANIFEST_MATCH",
    "RESTORE_CLEANUP",
    "REDIS_SERVICE_ACTIVE",
    "REDIS_PING",
    "BIGSHOP360_TOUCHED"
)

foreach ($key in $requiredKeys) {
    if (-not $remoteValues.ContainsKey($key)) {
        throw "Remote drill output is missing $key."
    }
}

if ($remoteValues["RESTORE_MANIFEST_MATCH"] -ne "true") {
    throw "Remote restore manifest did not match."
}
if ($remoteValues["BIGSHOP360_TOUCHED"] -ne "false") {
    throw "BigShop360 guard failed."
}

$publicPortResults = @()
if (-not $SkipPublicPortCheck) {
    foreach ($port in $PublicRedisPorts) {
        $isOpen = Test-TcpPortOpen -HostName $SshHost -Port $port
        $publicPortResults += [ordered]@{
            port = $port
            open = [bool]$isOpen
        }
        if ($isOpen) {
            throw "Public TCP port $port is open on $SshHost."
        }
    }
}

$gitSha = ""
try {
    $gitSha = (git -C $repoRoot rev-parse --short HEAD 2>$null).Trim()
}
catch {
    $gitSha = "unknown"
}

$result = [ordered]@{
    schemaVersion = 1
    generatedAtUtc = (Get-Date).ToUniversalTime().ToString("o")
    gitSha = $gitSha
    remoteHost = $SshHost
    remotePort = $SshPort
    redisEndpoint = "$($redisHost):$($redisPort)"
    remoteWrites = $true
    remoteWriteScope = $remoteValues["REMOTE_RUN_ROOT"]
    mutatesBigShop360 = $false
    serviceInterrupted = $false
    drillRunId = $remoteValues["DRILL_RUN_ID"]
    remoteArchive = $remoteValues["REMOTE_ARCHIVE"]
    archiveSha256 = $remoteValues["ARCHIVE_SHA256"]
    archiveSizeBytes = [int64]$remoteValues["ARCHIVE_SIZE_BYTES"]
    restoreManifestMatch = $true
    restoreCleanup = $remoteValues["RESTORE_CLEANUP"]
    redisFileCount = [int]$remoteValues["REDIS_FILE_COUNT"]
    layoutDirCount = [int]$remoteValues["LAYOUT_DIR_COUNT"]
    remoteReport = $remoteValues["REMOTE_REPORT"]
    sourceManifest = $remoteValues["SOURCE_MANIFEST"]
    restoreManifest = $remoteValues["RESTORE_MANIFEST"]
    layoutManifest = $remoteValues["LAYOUT_MANIFEST"]
    persistenceReport = $remoteValues["PERSISTENCE_REPORT"]
    publicPortChecks = $publicPortResults
    guardrails = @(
        "Only /var/lib/supersites-redis is archived.",
        "Restore test extracts under /srv/supersites/backups/redis-drills/<run>/restore-test and is removed after manifest comparison.",
        "BigShop360 paths, services, Nginx and MariaDB are not touched.",
        "Redis service is checked but not restarted or stopped."
    )
}

New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null
$jsonPath = Join-Path $OutputDirectory "vps-backup-restore-drill.json"
$markdownPath = Join-Path $OutputDirectory "vps-backup-restore-drill.md"

$result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath $jsonPath -Encoding UTF8

$closedPorts = @($publicPortResults | Where-Object { -not $_.open } | ForEach-Object { $_.port })
$lines = @()
$lines += "# VPS Backup/Restore Drill"
$lines += ""
$lines += '- Drill run ID: `' + $result.drillRunId + '`'
$lines += '- Git SHA: `' + $result.gitSha + '`'
$lines += '- Remote write scope: `' + $result.remoteWriteScope + '`'
$lines += '- Remote archive: `' + $result.remoteArchive + '`'
$lines += '- Archive SHA-256: `' + $result.archiveSha256 + '`'
$lines += "- Archive size bytes: $($result.archiveSizeBytes)"
$lines += "- Restore manifest match: $($result.restoreManifestMatch)"
$lines += "- Restore extraction cleanup: $($result.restoreCleanup)"
$lines += "- Service interrupted: no"
$lines += "- BigShop360 touched: no"
$lines += "- Redis files inventoried: $($result.redisFileCount)"
$lines += "- SuperSites layout directories inventoried: $($result.layoutDirCount)"
if ($closedPorts.Count -gt 0) {
    $lines += "- Public Redis ports closed/filtered: $($closedPorts -join ', ')"
}
$lines += ""
$lines += "## Guardrails"
$lines += ""
foreach ($guardrail in $result.guardrails) {
    $lines += "- $guardrail"
}

$lines | Set-Content -LiteralPath $markdownPath -Encoding UTF8

Write-Host "VPS backup/restore drill passed."
Write-Host "Run ID: $($result.drillRunId)"
Write-Host "Remote archive: $($result.remoteArchive)"
Write-Host "Archive SHA-256: $($result.archiveSha256)"
Write-Host "Restore manifest match: $($result.restoreManifestMatch)"
Write-Host "BigShop360 touched: no"
Write-Host "JSON: $jsonPath"
Write-Host "Markdown: $markdownPath"
