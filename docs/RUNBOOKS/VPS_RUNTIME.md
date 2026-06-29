# VPS Runtime Runbook

## Scope

This runbook covers the initial HostGator VPS runtime used by SuperSites for Redis and future queues/workers.

Do not edit BigShop360 paths or services while operating SuperSites:

- `/srv/bigshop360`
- `bigshop360-api.service`
- existing Nginx virtual host files
- existing MariaDB databases owned by BigShop360

## Current SuperSites layout

- SSH endpoint: `129.121.37.220:22022`.
- SSH key path on this workstation: `$HOME/.ssh/id_ed25519_vps_hostgator`.
- SuperSites user/group: `supersites`.
- App layout: `/srv/supersites`.
- Releases: `/srv/supersites/releases`.
- Shared files/logs: `/srv/supersites/shared`.
- Backups: `/srv/supersites/backups`.
- Redis service: `supersites-redis.service`.
- Redis endpoint on the VPS: `127.0.0.1:6381`.
- Redis data: `/var/lib/supersites-redis`.
- Redis logs: `/var/log/supersites/redis.log`.

## Local credential inventory

Redis credentials are stored only in ignored local files:

- `docs/credentials/vps-redis.local.json`
- `docs/credentials/credentials.local.md`

Never copy these values to Git, logs, issues, screenshots or CI output.

## Validate runtime

Run from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-vps-runtime.ps1
```

Expected result:

- `supersites-redis.service` is active.
- Authenticated Redis `PING` returns `PONG`.
- Redis listens only on `127.0.0.1:6381`.
- Public TCP ports `6379`, `6380` and `6381` are closed or filtered.
- `/srv/supersites` layout exists.

## Backup/Restore Drill

Run from the repository root:

```powershell
pnpm ops:vps-backup-restore-drill
```

The drill:

- checks `supersites-redis.service` and authenticated Redis `PING`;
- creates a timestamped Redis data archive under `/srv/supersites/backups/redis-drills/<run>/supersites-redis-data.tar.gz`;
- records source and restore manifests without copying Redis data to Git;
- extracts the archive only into `/srv/supersites/backups/redis-drills/<run>/restore-test`;
- compares the restored manifest to the source manifest;
- removes only the temporary `restore-test` extraction after comparison;
- writes local metadata artifacts to `artifacts/vps-backup-restore-drill/`.

The drill does not stop or restart Redis, does not overwrite `/var/lib/supersites-redis`, does not touch `/srv/bigshop360`, Nginx/HTTPD, MariaDB or BigShop360 services and must not print credentials.

Expected result:

- restore manifest match is `true`;
- service interrupted is `no`;
- BigShop360 touched is `no`;
- public Redis ports remain closed or filtered.

## Operational commands

Check service status:

```bash
systemctl status supersites-redis.service --no-pager -l
```

View Redis logs:

```bash
journalctl -u supersites-redis.service -n 100 --no-pager
tail -n 100 /var/log/supersites/redis.log
```

Restart Redis after a controlled config change:

```bash
systemctl restart supersites-redis.service
systemctl is-active supersites-redis.service
```

## Guardrails

- Redis must never bind to `0.0.0.0`.
- Keep the SuperSites Redis port at `6381` unless an ADR changes it.
- Do not create workers or crons until the app code and queue names exist.
- Backups and restore tests are required before production monitors or paid jobs depend on Redis state.
