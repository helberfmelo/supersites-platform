# Local Development Runbook

## Target

Local development should use Docker Compose with MySQL 8.4, Redis, Mailpit, Laravel and Nuxt.

## Databases

Initial database names are documented in `infra/environments/local/databases.md` and SQL bootstrap lives in `infra/docker/mysql/init/01-create-local-databases.sql`.

## Bootstrap order

1. Create local `.env` files from `.env.example`.
2. Start Docker Compose.
3. Create databases.
4. Run backend migrations.
5. Start frontend apps.
6. Run smoke tests.

## Current status

Docker and MySQL CLI exist on this workstation. Local Docker services are configured in `infra/docker/compose.local.yml`.

Use:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\start-local-docker.ps1
```

Local ports:

- MySQL Docker: `127.0.0.1:3317`
- Redis Docker: `127.0.0.1:6381`
- Mailpit SMTP: `127.0.0.1:1035`
- Mailpit UI: `http://127.0.0.1:8035`

Validated on 2026-06-26:

- `supersites-mysql`: healthy
- `supersites-redis`: healthy
- `supersites-mailpit`: healthy
- Local SuperSites databases: 12/12 created
