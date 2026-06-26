# SuperSites

Portfolio monorepo for the SuperSites hub, control plane and the first ten utility sites.

Mandatory reading before any sprint:

1. `AGENTS.md`
2. `docs/MEGA_PROMPT_SUPERSITES.md`
3. `docs/OPERATING_CONTEXT.md`
4. `docs/STATUS.md`
5. `docs/ROADMAP.md`
6. `docs/ARCHITECTURE.md`
7. `docs/SECURITY.md`
8. `docs/DATA_GOVERNANCE.md`
9. `docs/ADSENSE_PLAYBOOK.md`
10. `docs/SEO_AIO_PLAYBOOK.md`
11. Current ADRs in `docs/ADR/`
12. `docs/METRICS.md`
13. `docs/HUMAN_ACTION_REQUIRED.md`
14. `docs/RUNBOOKS/SPRINT_EXECUTION.md`

The project is intentionally starting as a monorepo. Deployments, databases, environments, secrets and rollback plans remain independent per app/site.

## Bootstrap validation

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-no-secrets.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-structure.ps1
pnpm test:packages
pnpm typecheck:packages
pnpm --filter @supersites/supersite test
pnpm --filter @supersites/supersite build
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts/validate-supersite-preview.ps1
pnpm test:e2e:supersite
```

Open the checked visual report after Playwright runs:

```powershell
pnpm test:e2e:report
```

Run the live catalog locally:

```powershell
pnpm dev:supersite
```

Open `http://127.0.0.1:3001`.

Laravel validation:

```powershell
cd apps/control-plane
composer validate --strict
php artisan test
php artisan route:list --path=admin
```

Laravel tests use SQLite in memory; local PHP must load `pdo_sqlite` and `sqlite3`.

Run the local control plane:

```powershell
cd apps/control-plane
php artisan migrate --seed --force
php artisan serve --host=127.0.0.1 --port=8013
```

Open `http://127.0.0.1:8013/admin`.

Local Docker smoke:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-local-stack.ps1
```

The GitHub Actions gate runs the same safety checks plus shared package tests/typecheck, Nuxt tests/build, preview smoke, Playwright visual smoke and Laravel validation.
