# CI/CD Runbook

## Scope

Sprint 0.5 creates the first CI/CD foundation. The current pipeline validates code and produces deploy dry-run plans; it does not publish application files yet.

## Workflows

### Quality Gate

File: `.github/workflows/quality-gate.yml`.

Runs on `main` pushes and pull requests.

Jobs:

- `Detect changes`: classifies changed paths.
- `Repository safety`: always runs secret scan and structure validation.
- `Frontend / SuperSites Hub`: runs shared package tests/typecheck, including `@supersites/analytics`, plus Nuxt tests/build when frontend, package or deployment files change, installs Chromium for Playwright, then runs `scripts/validate-supersite-preview.ps1` and `pnpm test:e2e:supersite` so SSR HTML, `_nuxt` assets, legal pages, data layer click events and visual smoke are checked from the correct app working directory.
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
- Direct root mapping like `https://opentshost.com/<site-folder>` remains pending. Keep deploy plans on the safe fallback URLs under `/supersites/...`.
- Real deploy must wait until deploy artifacts, remote preservation rules, smoke checks and rollback scripts are implemented.
- Human-gated actions stay in `docs/HUMAN_ACTION_REQUIRED.md`; technical reversible blockers should be worked around with dry-runs, validation scripts or degraded mode.

## Pre-Real-Deploy Checklist

- Build artifact exists for the app being deployed.
- Remote `.env` and user uploads are preserved.
- Rollback path is documented and tested in dry-run.
- Smoke URL is defined and monitored.
- Secret values are available only through GitHub environments or ignored local inventory.
- `scripts/validate-hostgator-bootstrap.ps1` passes.
- `scripts/validate-vps-runtime.ps1` passes when runtime services are touched.
