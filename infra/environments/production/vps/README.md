# HostGator VPS Runtime

SuperSites uses this VPS only for runtime pieces that cannot run in the transitional cPanel/shared HostGator account. BigShop360 remains a separate production workload on the same server.

## Source

The VPS candidate was discovered on 2026-06-26 from the reference project `D:\Projetos\bigshop360`:

- `docs/deploy_runbook.md`
- `deploy/vps/README.md`
- `docs/architecture_infrastructure.md`
- `.github/workflows/deploy-vps.yml`

## Inventory

- Provider/plan documented by BigShop360: HostGator `VPS OCI NVMe 4`.
- Public IP: `129.121.37.220`.
- SSH endpoint: `129.121.37.220:22022`.
- Deploy/base SSH user documented by BigShop360: `root`.
- Local SSH key validated for this workstation: `$HOME/.ssh/id_ed25519_vps_hostgator`.
- OS validated after provisioning: AlmaLinux `9.8`.
- Kernel validated after provisioning: Linux `5.14.0-611.54.3.el9_7.x86_64`.
- Reference application user: `bigshop360`.
- Reference app root: `/srv/bigshop360`.
- Reference staging URL: `http://129.121.37.220:8084/bigshop360`.
- Reference API edge: `https://api.bigshophost.com/bigshop360`.
- Reference backend local target in docs: `127.0.0.1:3100`.

## Read-only validation on 2026-06-26

- `api.bigshophost.com` resolves to `129.121.37.220`.
- TCP open: `80`, `443`, `8084`, `22022`, `3100`.
- TCP closed from the public internet: `6379`, `6380`.
- Staging web returned HTTP 200.
- API health returned HTTP 200 with application status `degraded`.
- Health checks reported: `api=up`, `database=up`, `runtime=down`, `providers=skipped`.
- Direct backend health on `129.121.37.220:3100` returned HTTP 200.

## Provisioning on 2026-06-26

Sprint 0.4b provisioned only SuperSites-isolated runtime resources:

- Linux user/group: `supersites`.
- App layout: `/srv/supersites`, `/srv/supersites/releases`, `/srv/supersites/shared/logs`, `/srv/supersites/backups`.
- Redis package: Redis `6.2.22`.
- Redis service: `supersites-redis.service`.
- Redis config: `/etc/redis/supersites-redis.conf`.
- Redis ACL: `/etc/redis/supersites-users.acl`.
- Redis data: `/var/lib/supersites-redis`.
- Redis logs: `/var/log/supersites/redis.log`.
- Redis bind: `127.0.0.1:6381`.
- Public Redis ports tested closed/filtered: `6379`, `6380`, `6381`.

No BigShop360 paths, Nginx files, MariaDB databases or BigShop360 systemd services were changed by this provisioning.

## SuperSites use

This VPS is the initial runtime host for production components that cannot run safely on the cPanel/shared HostGator account:

- Redis.
- Queue workers.
- Scheduled monitor workers.
- Horizon or equivalent queue dashboard.
- Websocket or long-running services.
- Internal health checks and deployment automation.

The SuperSites-specific deployment layout is:

- `/srv/supersites`
- `/srv/supersites/releases/<sha>`
- `/srv/supersites/current`
- `/srv/supersites/shared/.env`
- `/srv/supersites/shared/logs`
- `/srv/supersites/backups`

Redis must remain private or restricted to known application hosts; never expose Redis on `0.0.0.0` without network-level controls.

## Validation

Run from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-vps-runtime.ps1
```

The validation checks SSH access, authenticated Redis `PING`, local-only bind, SuperSites directories and public Redis port exposure.

Run the Redis backup/restore drill from the repository root:

```powershell
pnpm ops:vps-backup-restore-drill
```

The drill creates a SuperSites-owned archive under `/srv/supersites/backups/redis-drills/<run>/`, restores it only into a temporary test directory, compares manifests and removes the temporary restore extraction. It does not stop Redis and does not touch BigShop360 paths, services, Nginx or MariaDB.

## Remaining work

- Create a SuperSites-owned deploy key or GitHub environment secret before automated deploys from CI.
- Turn the manual backup/restore drill into a scheduled backup policy before production monitors depend on Redis state.
- Create workers, queues and crons only after the corresponding app code exists.
