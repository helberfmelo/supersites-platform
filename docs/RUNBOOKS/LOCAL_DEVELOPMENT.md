# Local Development Runbook

## Target

Local development should use Docker Compose with MySQL 8.4, Redis, Mailpit, Laravel and Nuxt.

## Databases

Initial database names are documented in `infra/environments/local/databases.md` and SQL bootstrap lives in `infra/docker/mysql/init/01-create-local-databases.sql`.

## Bootstrap order

1. Start Docker Compose.
2. Install Node dependencies with pnpm.
3. Create local `.env` files from `.env.example`.
4. Run backend migrations.
5. Start frontend apps.
6. Run tests, build and smoke tests.

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

## Node workspace

Use Corepack-managed pnpm:

```powershell
corepack enable
corepack prepare pnpm@11.9.0 --activate
pnpm install
```

Run catalog checks:

```powershell
pnpm --filter @supersites/supersite test
pnpm --filter @supersites/supersite build
```

Preview the built Nuxt server:

```powershell
$env:HOST = "127.0.0.1"
$env:PORT = "3001"
pnpm --filter @supersites/supersite preview
```

## Control plane

Create the ignored local environment from the example and set the Docker MySQL password from `infra/docker/.env.local`.

```powershell
Copy-Item apps\control-plane\.env.example apps\control-plane\.env
cd apps\control-plane
composer install
php artisan key:generate --force
php artisan migrate --force
composer validate --strict
php artisan test
```

For local connection smoke, set `SUPERSITES_HEALTH_CHECK_CONNECTIONS=true` only in the ignored `.env`.

## Local smoke

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-local-stack.ps1
```

The smoke validates Docker health for MySQL, Redis and Mailpit, then starts the Laravel control plane locally and calls `/health`.
