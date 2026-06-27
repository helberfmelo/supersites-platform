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
pnpm test:packages
pnpm typecheck:packages
pnpm --filter @supersites/supersite test
pnpm --filter @supersites/supersite build
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\validate-supersite-preview.ps1
pnpm test:e2e:supersite
```

Run CalcHarbor checks:

```powershell
pnpm test:calcharbor
pnpm build:calcharbor
pnpm validate:calcharbor-preview
pnpm test:e2e:calcharbor
```

Run DevUtility Lab checks:

```powershell
pnpm test:devutility
pnpm build:devutility
pnpm validate:devutility-preview
pnpm test:e2e:devutility
```

Run TimeNexus checks:

```powershell
pnpm test:timenexus
pnpm build:timenexus
pnpm validate:timenexus-preview
pnpm test:e2e:timenexus
```

Run QRRoute checks:

```powershell
pnpm test:qrroute
pnpm build:qrroute
pnpm validate:qrroute-preview
pnpm test:e2e:qrroute
```

Run InvoiceCraft checks:

```powershell
pnpm test:invoicecraft
pnpm build:invoicecraft
pnpm validate:invoicecraft-preview
pnpm test:e2e:invoicecraft
```

Run MailHealth checks:

```powershell
pnpm test:mailhealth
pnpm build:mailhealth
pnpm validate:mailhealth-preview
pnpm test:e2e:mailhealth
```

Run SitePulse Lab checks:

```powershell
pnpm test:sitepulse
pnpm build:sitepulse
pnpm validate:sitepulse-preview
pnpm test:e2e:sitepulse
```

Run PixelBatch checks:

```powershell
pnpm test:pixelbatch
pnpm build:pixelbatch
pnpm validate:pixelbatch-preview
pnpm test:e2e:pixelbatch
```

Run DocShift checks:

```powershell
pnpm test:docshift
pnpm build:docshift
pnpm validate:docshift-preview
pnpm test:e2e:docshift
```

The root package scripts use explicit filters for `@supersites/ui`, `@supersites/i18n`, `@supersites/seo`, `@supersites/consent`, `@supersites/analytics` and `@supersites/ads`. A generic pnpm path filter did not match the package workspaces on Windows during Sprint 1.3.

Install the Playwright browser once per workstation if needed:

```powershell
pnpm exec playwright install chromium
```

Open the checked visual report:

```powershell
pnpm test:e2e:report
```

Preview the built Nuxt server:

```powershell
cd apps\supersite
$env:HOST = "127.0.0.1"
$env:PORT = "3001"
node .output\server\index.mjs
```

Run the built server from `apps/supersite`; running it from the repository root can serve HTML while returning 404 for `_nuxt` assets, which breaks hydration.
Use `pwsh` for the preview smoke. Windows PowerShell 5 can execute the script directly, but subprocess usage through package scripts returned an opaque exit in Sprint 1.1.

For live visual development, run:

```powershell
pnpm dev:supersite
```

Then open `http://127.0.0.1:3001`. The public transitional domain will become visually followable after the real catalog deploy sprint.

For local CalcHarbor development, run:

```powershell
pnpm dev:calcharbor
```

Then open `http://127.0.0.1:3003/en/calculators/loan-payment`. Inputs and results remain browser-side in Sprint 3.1.

For local DevUtility Lab development, run:

```powershell
pnpm dev:devutility
```

Then open `http://127.0.0.1:3004/en/tools/structured-data-formatter`. Snippets and results remain browser-side in Sprint 3.2.

For local TimeNexus development, run:

```powershell
pnpm dev:timenexus
```

Then open `http://127.0.0.1:3005/en/tools/timezone-converter`. Dates, zones, values and results remain browser-side in Sprint 3.3.

For local QRRoute development, run:

```powershell
pnpm dev:qrroute
```

Then open `http://127.0.0.1:3006/en/tools/static-qr-code`. QR, barcode, UTM, vCard, Wi-Fi and preview payloads remain browser-side in Sprint 4.1.

For local InvoiceCraft development, run:

```powershell
pnpm dev:invoicecraft
```

Then open `http://127.0.0.1:3007/en/tools/invoice-builder`. Document fields, totals and PDF generation remain browser-side in Sprint 4.2.

For local MailHealth development, run:

```powershell
$env:NUXT_PUBLIC_MAILHEALTH_API_BASE_URL = "http://127.0.0.1:8013/api/v1/mailhealth"
pnpm dev:mailhealth
```

Then open `http://127.0.0.1:3008/en/tools/spf-checker`. Header analysis remains browser-side in Sprint 4.3; DNS, DNSBL and SMTP checks call the bounded local control-plane API when it is running.

For local SitePulse Lab development, run:

```powershell
$env:NUXT_PUBLIC_SITEPULSE_API_BASE_URL = "http://127.0.0.1:8013/api/v1/sitepulse"
pnpm dev:sitepulse
```

Then open `http://127.0.0.1:3009/en/tools/status-checker`. Status, redirects, headers, robots, sitemap, TTFB and performance checks call the bounded local control-plane API when it is running; the app must not store target URLs or send them to analytics.

For local PixelBatch development, run:

```powershell
pnpm dev:pixelbatch
```

Then open `http://127.0.0.1:3010/en/tools/image-compressor`. Selected images, pixels, previews and downloads remain browser-side in Sprint 5.1; the app must not use upload endpoints, browser storage or analytics values from the file.

For local DocShift development, run:

```powershell
pnpm dev:docshift
```

Then open `http://127.0.0.1:3011/en/tools/pdf-merge`. Selected PDFs, pasted text, previews and downloads remain browser-side in Sprint 5.2; the app must not use upload endpoints, browser storage or analytics values from the file/document.

For local NetProbe Atlas tool testing, run:

```powershell
$env:NUXT_PUBLIC_NETPROBE_API_BASE_URL = "http://127.0.0.1:8013/api/v1/netprobe"
pnpm dev:netprobe
```

Then open `http://127.0.0.1:3002/en/tools/dns-lookup`. When the SuperSites Hub is opened locally, the NetProbe detail page also shows a local-only shortcut to this tool surface.

The production-safe default is a relative `/api/v1/netprobe` path so static artifacts cannot accidentally point browser users at `127.0.0.1`. Set `NUXT_PUBLIC_NETPROBE_API_BASE_URL` explicitly for local tool runs.

Current local visual endpoint validated on 2026-06-26:

- `http://127.0.0.1:3001` returned HTTP 200.
- Background dev logs can be written to ignored files under `artifacts/` when the server is started for long local QA.

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

Laravel feature tests use SQLite in memory by default. On Windows/PHP from WinGet, confirm the local extensions are loaded:

```powershell
php -m | Select-String -Pattern "pdo_sqlite|sqlite3"
```

If they are missing but the DLLs exist under the PHP `ext` directory, enable these lines in the loaded `php.ini`:

```ini
extension=pdo_sqlite
extension=sqlite3
```

This workstation was updated on 2026-06-26 and now loads both extensions.

For local connection smoke, set `SUPERSITES_HEALTH_CHECK_CONNECTIONS=true` only in the ignored `.env`.

Run the admin MVP:

```powershell
cd apps\control-plane
php artisan migrate --seed --force
php artisan serve --host=127.0.0.1 --port=8013
```

Open `http://127.0.0.1:8013/admin`. The seeded local owner account is for development only and comes from `DatabaseSeeder`/`UserFactory`; do not reuse it in production.

NetProbe monitoring MVP local checks:

```powershell
cd apps\control-plane
php artisan schedule:list
php artisan netprobe:dispatch-due-monitors --limit=10
php artisan queue:work --queue=netprobe-monitors --once
```

Webhook delivery is disabled by default. Enable only in controlled local/test scenarios with `NETPROBE_ALERT_WEBHOOK_ENABLED=true` and public HTTPS targets that pass the NetProbe host guard.

Build the HostGator control-plane/API artifact locally:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\build-control-plane-hostgator-artifact.ps1
```

The artifact lives under `artifacts/control-plane-hostgator/`, excludes `.env` and includes Composer production dependencies. Public deploy writes release `.env` remotely from secrets; do not copy real credentials into the artifact.

## Local smoke

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\validate-local-stack.ps1
```

The smoke validates Docker health for MySQL, Redis and Mailpit, then starts the Laravel control plane locally and calls `/health`.
