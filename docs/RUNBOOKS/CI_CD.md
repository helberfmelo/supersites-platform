# CI/CD Runbook

## Scope

Sprint 0.5 created the first CI/CD foundation. The current pipeline validates code, produces deploy dry-run plans and has manual HostGator deploy workflows for the static Hub and the gated NetProbe static frontend.

## Workflows

### Quality Gate

File: `.github/workflows/quality-gate.yml`.

Runs on `main` pushes and pull requests.

Jobs:

- `Detect changes`: classifies changed paths.
- `Repository safety`: always runs secret scan and structure validation.
- `Frontend / SuperSites Hub`: runs shared package tests/typecheck, including `@supersites/analytics`, plus Nuxt tests/build when frontend, package or deployment files change, installs Chromium for Playwright, then runs `scripts/validate-supersite-preview.ps1` and `pnpm test:e2e:supersite` so SSR HTML, `_nuxt` assets, legal pages, data layer click events and visual smoke are checked from the correct app working directory.
- `Frontend / NetProbe Atlas`: runs shared package tests/typecheck plus NetProbe tests/build, `scripts/validate-netprobe-preview.ps1` and `pnpm test:e2e:netprobe` when NetProbe, packages or deployment files change.
- `Backend / Control Plane`: runs Composer validation and Laravel tests when backend or deployment files change. The Laravel suite covers API, analytics ingest sanitization, metric snapshots, auth/RBAC, admin Blade smoke, site create/update flows and audit log behavior. It uses SQLite in memory and therefore requires `pdo_sqlite`/`sqlite3`.
- `Quality summary`: fails the workflow if any required job fails.

### Deploy Dry Run

File: `.github/workflows/deploy-dry-run.yml`.

Runs on `main` pushes that affect apps, packages, deployment infra, scripts or the workflow itself. It can also be started manually.

The workflow generates an artifact named `supersites-deploy-dry-run` with:

- `supersites-deploy-plan.json`
- `supersites-deploy-plan.md`

The markdown plan is also written to the GitHub job summary. Artifact upload is best-effort because GitHub Actions storage quota may be exhausted; quota exhaustion must not block a non-mutating dry-run.

The dry-run does not upload, delete, move, publish or rewrite remote files.

### Deploy SuperSite HostGator

File: `.github/workflows/deploy-supersite-hostgator.yml`.

Runs only by `workflow_dispatch` against the `production-hostgator` environment.

Actions:

- `deploy`: builds the Nuxt catalog with `NUXT_APP_BASE_URL=/supersites/`, validates the static artifact, uploads it to a new HostGator release directory and switches the managed `/supersites/.htaccess`.
- `rollback-release`: switches `/supersites/.htaccess` back to a previous release id.
- `rollback-placeholder`: disables the managed rewrite and returns `/supersites/` to the bootstrap placeholder.

The workflow uses only the `SUPERSITES_CPANEL_USER` and `SUPERSITES_CPANEL_PASSWORD` environment secrets plus non-secret HostGator variables. It must be run only after the pushed commit passes `Quality Gate`.

Optional `enable_root_redirect` redirects `https://opentshost.com/` to `/supersites/` only if no unmanaged root `.htaccess` exists. If a root `.htaccess` already exists, stop and review before using any forced root change.

### Deploy NetProbe HostGator

File: `.github/workflows/deploy-netprobe-hostgator.yml`.

Runs only by `workflow_dispatch` against the `production-hostgator` environment.

Actions:

- `deploy`: preflights the public NetProbe API, builds with `NUXT_APP_BASE_URL=/supersites/netprobe-atlas/` and explicit HTTPS `NUXT_PUBLIC_NETPROBE_API_BASE_URL`, validates the static artifact, uploads it to a new `_netprobe-releases/<release-id>` directory and switches only `/supersites/netprobe-atlas/.htaccess`.
- `rollback-release`: switches `/supersites/netprobe-atlas/.htaccess` back to a previous NetProbe release id.
- `rollback-placeholder`: disables the managed NetProbe rewrite and returns the app folder to the bootstrap placeholder.

The deploy action must not be run while the public API smoke fails. On 2026-06-26, `https://opentshost.com/supersites/control-plane/api/v1/netprobe/ip` returned HTTP 500, so NetProbe real deploy remains on hold even though the static artifact gate exists.

## Deployment Manifest

Source: `infra/deployment/apps.json`.

The manifest is the source of truth for:

- app ids;
- local app paths;
- app kind;
- transitional HostGator remote paths;
- fallback public URLs under `/supersites/...`.

Validate and generate a dry-run plan locally:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\prepare-deploy-dry-run.ps1
```

## GitHub Environments

Expected environments:

- `staging-hostgator`
- `production-hostgator`
- `production-vps-runtime`

Synchronize environment variables and available local secrets:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\sync-github-environments.ps1
```

The script never prints secret values. It sets only GitHub environment secrets and variables.

HostGator environment secret names:

- `SUPERSITES_CPANEL_USER`
- `SUPERSITES_CPANEL_PASSWORD`

HostGator environment variable names:

- `SUPERSITES_TARGET_KIND`
- `SUPERSITES_CPANEL_HOST`
- `SUPERSITES_CPANEL_PORT`
- `SUPERSITES_REMOTE_BASE`
- `SUPERSITES_PUBLIC_BASE_URL`
- `SUPERSITES_DEPLOY_MODE`

VPS runtime environment secret names:

- `SUPERSITES_VPS_SSH_KEY`
- `SUPERSITES_REDIS_PASSWORD`

VPS runtime environment variable names:

- `SUPERSITES_VPS_HOST`
- `SUPERSITES_VPS_PORT`
- `SUPERSITES_VPS_USER`
- `SUPERSITES_REDIS_HOST`
- `SUPERSITES_REDIS_PORT`
- `SUPERSITES_REDIS_USER`

## Obstacles And Contours

- Branch protection is blocked by the current GitHub plan. Continue with monitored `Quality Gate` runs until GitHub Pro, public repo or another approved ruleset path exists.
- GitHub Actions artifact storage quota can block uploads. Continue by using the job summary as the dry-run audit trail and keep artifact upload best-effort until storage is cleared or quota changes.
- Nuxt preview must run from `apps/supersite`. Running the built server from the repository root can return 404 for `_nuxt` assets and leave the catalog unhydrated; the preview smoke now catches this.
- The local package command for the preview smoke uses `pwsh`; Windows PowerShell 5 returned an opaque subprocess exit during Sprint 1.1, while `pwsh` exposed normal logs and exit codes.
- Playwright reports are local artifacts under `artifacts/playwright-report`. They are not uploaded by default while GitHub Actions artifact quota remains an active contour.
- The shared package test/typecheck root scripts use explicit package filters. The generic `./packages/*` pnpm filter returned no matches on Windows during Sprint 1.3 and was replaced before commit.
- Local PHP on Windows may have SQLite DLLs present but disabled in `php.ini`. Enable `extension=pdo_sqlite` and `extension=sqlite3` before relying on `php artisan test`; this workstation was fixed during Sprint 1.4.
- Direct site folder mapping like `https://opentshost.com/<site-folder>` remains pending. Keep app links on the safe fallback URLs under `/supersites/...`.
- Real deploy is implemented for the SuperSites Hub static catalog. NetProbe Atlas has static packaging, preservation, smoke and rollback gates, but public traffic remains on hold until the control-plane/API production deploy is healthy.
- NetProbe static builds must not contain `localhost:8013`, `127.0.0.1:8013` or a local `/api/v1/netprobe` URL. Local API usage belongs in dev/test env vars, not in production artifacts.
- Human-gated actions stay in `docs/HUMAN_ACTION_REQUIRED.md`; technical reversible blockers should be worked around with dry-runs, validation scripts or degraded mode.

## Pre-Real-Deploy Checklist

- Build artifact exists for the app being deployed.
- Remote `.env` and user uploads are preserved.
- Rollback path is documented and tested in dry-run.
- Smoke URL is defined and monitored.
- Browser-facing API base URL is HTTPS and public when the deployed app needs an API.
- Secret values are available only through GitHub environments or ignored local inventory.
- `scripts/validate-hostgator-bootstrap.ps1` passes.
- `scripts/validate-vps-runtime.ps1` passes when runtime services are touched.
