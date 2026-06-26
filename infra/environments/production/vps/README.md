# HostGator VPS Candidate

Do not mutate this server before roadmap approval and an explicit SuperSites provisioning sprint.

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
- SSH authentication from this workstation failed in `BatchMode` because the current local keys do not include the VPS private key.

## SuperSites use

This VPS is the preferred candidate for production runtime components that cannot run safely on the cPanel/shared HostGator account:

- Redis.
- Queue workers.
- Scheduled monitor workers.
- Horizon or equivalent queue dashboard.
- Websocket or long-running services.
- Internal health checks and deployment automation.

Before reuse, create a SuperSites-specific deployment layout instead of sharing BigShop360 directories:

- `/srv/supersites`
- `/srv/supersites/releases/<sha>`
- `/srv/supersites/current`
- `/srv/supersites/shared/.env`
- `/srv/supersites/shared/logs`
- `/srv/supersites/backups`

Also validate firewall rules before any Redis deployment. Redis must remain private or restricted to known application hosts; never expose Redis on `0.0.0.0` without network-level controls.

## Current blockers

- Direct SSH is not validated from this workstation.
- The private key appears to exist as GitHub repository secrets in `helberfmelo/bigshop360`, but GitHub does not expose secret values.
- Need a SuperSites-owned SSH key, GitHub environment secret, or another approved deploy path before provisioning.
- Need an explicit decision on whether SuperSites may share this VPS with BigShop360 and which resource limits, users, ports, and backups apply.
