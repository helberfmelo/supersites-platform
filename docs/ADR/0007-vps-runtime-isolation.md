# ADR 0007 - VPS runtime isolation

Status: Accepted

## Context

The SuperSites platform requires Redis for cache, queues, rate limits, locks and monitor workers. The transitional HostGator cPanel account does not expose Redis and is not a good place for daemon processes.

On 2026-06-26 the HostGator VPS used by the BigShop360 reference project was validated from this workstation with the local SSH key `$HOME/.ssh/id_ed25519_vps_hostgator`. The user approved using the available infrastructure if everything needed for local and production implementation was present.

The VPS already runs BigShop360 services, so any SuperSites runtime must be isolated and must not mutate `/srv/bigshop360`, its systemd service, Nginx configuration or database.

## Decision

Use the HostGator VPS as the initial SuperSites runtime host, with strict isolation:

1. Create a dedicated Linux system user and group named `supersites`.
2. Keep SuperSites files under `/srv/supersites`.
3. Keep Redis data under `/var/lib/supersites-redis`.
4. Keep Redis logs under `/var/log/supersites`.
5. Run Redis as a dedicated systemd service named `supersites-redis.service`.
6. Bind Redis only to `127.0.0.1:6381`.
7. Keep Redis authentication in ACL form and store the generated credential only in ignored local inventory files or a future secret manager.
8. Do not expose Redis ports publicly.
9. Validate with `scripts/validate-vps-runtime.ps1` after provisioning and after relevant deploys.

## Consequences

- SuperSites can use Redis, queues and workers before a managed Redis provider is selected.
- The cPanel account remains focused on web hosting and placeholders until app deploys are ready.
- BigShop360 remains operationally separate from SuperSites.
- Any app that needs to reach Redis from cPanel must use a future secure tunnel, private networking or another approved restricted path; public Redis exposure remains forbidden.
- Backup/restore and worker deployment runbooks must be completed before paid monitoring or production jobs depend on this Redis instance.
