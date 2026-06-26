# ADR 0004 - Redis production placement

Status: Accepted

## Context

The target architecture uses Redis for cache, queues, rate limit, locks and scheduled monitor workloads.

The transitional HostGator account `opents62` is a cPanel/shared-style environment for `opentshost.com`. Read-only cPanel checks on 2026-06-26 returned service entries for cPanel, FTP, mail, DNS and queueprocd, but no Redis service. The cPanel feature list for the account did not contain Redis.

HostGator's official compatibility table marks Redis as not compatible with Shared/Reseller and compatible with Dedicated/VPS. HostGator also says VPS is appropriate when additional software or server modifications are needed beyond shared hosting.

On 2026-06-26 a HostGator VPS candidate was discovered in `D:\Projetos\bigshop360`: IP `129.121.37.220`, SSH port `22022`, documented plan `VPS OCI NVMe 4`. Read-only tests confirmed public HTTP/API availability and that Redis ports `6379` and `6380` are not exposed publicly. Direct SSH from this workstation is not validated yet because the needed private key exists only as a GitHub secret in the BigShop360 repository.

## Decision

Use Redis in production for the full SuperSites platform, but do not depend on Redis inside the current shared HostGator/cPanel account.

Deployment split:

1. The current HostGator/cPanel account can host the transitional static/SSR-exported public catalog and simple PHP endpoints that do not require daemon processes.
2. Redis, queue workers, monitor workers, Horizon, websockets and long-running services must run on the other HostGator VPS/VPN server or a managed Redis provider. The BigShop360 HostGator VPS is the current preferred candidate, pending explicit approval, direct deploy access and isolation from the BigShop360 application.
3. Apps must support a degraded mode for early catalog launch: database/file cache and no background monitors until the Redis runtime is available.

## Consequences

- The first catalog launch can remain simple and low-risk.
- NetProbe, MailHealth, SitePulse, AI growth jobs and paid monitoring require the VPS/VPN layer before production launch.
- Deployment docs must separate web-only hosting from worker/cache hosting.
- Secrets and network access between cPanel apps and VPS Redis must be handled through private networking or tightly restricted firewall rules when available.
- SuperSites must use its own Linux users, directories, ports, backups and deployment secrets on the VPS; do not share BigShop360 app directories or mutate that project while provisioning.
