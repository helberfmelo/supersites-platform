# Release Runbook

Use this runbook after a sprint passes local validation.

## Standard cycle

1. Check `git status --short --branch`.
2. Run focused local validations for the sprint.
3. Run `scripts/validate-no-secrets.ps1`.
4. Commit with a clear title.
5. Push to the tracked branch.
6. For implementation/correction of a HostGator-published app or site, run the specific HostGator deploy workflow for the affected target and watch it to completion.
7. Run `Quality Gate`, `Deploy Dry Run` or public smoke checks only when requested, when closing a PR/release/phase, or when the risk of the change justifies it.
8. Update `docs/STATUS.md` with the release result.
9. Read mandatory docs before starting the next sprint.

## Current quality gate

The current CI gate is manual or pull-request based. It does not run automatically on `main` pushes during the internal-development cadence. When triggered, it runs:

- `scripts/validate-no-secrets.ps1`
- `scripts/validate-structure.ps1`
- `pnpm --filter @supersites/supersite test`
- `pnpm --filter @supersites/supersite build`
- `scripts/validate-supersite-preview.ps1`
- `pnpm test:e2e:supersite`
- `composer validate --strict` and `php artisan test` for `apps/control-plane`

Open the local Playwright visual report after a frontend sprint with:

```powershell
pnpm test:e2e:report
```

## Current deploy paths

- `Deploy Dry Run` remains the manual non-mutating plan workflow for all apps.
- `Deploy SuperSite HostGator` publishes the static SuperSites Hub catalog.
- `Deploy Control Plane HostGator` publishes the Laravel control-plane/API needed by NetProbe public tools.
- `Deploy NetProbe HostGator` publishes the static NetProbe frontend after the public NetProbe API preflight passes.
- `Deploy Static App HostGator` publishes supported static apps after their artifact gates pass.

After focused local validation and push for a catalog implementation/correction:

```powershell
gh workflow run "Deploy SuperSite HostGator" --ref main -f action=deploy -f enable_root_redirect=false
```

Watch the run to completion, then run public smoke locally:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\smoke-supersite-public.ps1
```

Rollback to a previous release id:

```powershell
gh workflow run "Deploy SuperSite HostGator" --ref main -f action=rollback-release -f release_id=<release-id> -f enable_root_redirect=false
```

Rollback to the bootstrap placeholder:

```powershell
gh workflow run "Deploy SuperSite HostGator" --ref main -f action=rollback-placeholder -f enable_root_redirect=false
```

NetProbe static artifact gate:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\build-netprobe-hostgator-artifact.ps1
```

NetProbe public smoke after a successful deploy:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\smoke-netprobe-public.ps1
```

NetProbe deploy command, after focused local validation, push and healthy public API JSON for `/ip` and `/dns`:

```powershell
gh workflow run "Deploy NetProbe HostGator" --ref main -f action=deploy -f api_base_url=https://opentshost.com/supersites/control-plane/api/v1/netprobe
```

NetProbe rollback commands:

```powershell
gh workflow run "Deploy NetProbe HostGator" --ref main -f action=rollback-release -f release_id=<release-id> -f api_base_url=https://opentshost.com/supersites/control-plane/api/v1/netprobe
gh workflow run "Deploy NetProbe HostGator" --ref main -f action=rollback-placeholder -f api_base_url=https://opentshost.com/supersites/control-plane/api/v1/netprobe
```

Control-plane/API artifact gate:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\build-control-plane-hostgator-artifact.ps1
```

Control-plane/API public smoke after deploy:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\smoke-control-plane-public.ps1
```

Control-plane/API deploy command, after focused local validation, push and confirming `production-hostgator` has the required control-plane secrets:

```powershell
gh workflow run "Deploy Control Plane HostGator" --ref main -f action=deploy
```

The active production release validated on 2026-06-26 is `a33fcbfdc31c328d71c6fa046d9fac99ec610575-28264453068-1`. The managed cPanel PHP handler must be `ea-php84___lsphp`.

Control-plane rollback commands:

```powershell
gh workflow run "Deploy Control Plane HostGator" --ref main -f action=rollback-release -f release_id=<release-id>
gh workflow run "Deploy Control Plane HostGator" --ref main -f action=rollback-placeholder
```

NetProbe go-live/redeploy order:

1. Deploy control-plane/API.
2. Run `scripts\smoke-control-plane-public.ps1`.
3. Deploy NetProbe static frontend.
4. Run `scripts\smoke-netprobe-public.ps1`.
5. Run a browser smoke against at least one public tool action.

The active NetProbe production release validated on 2026-06-26 is `decfaa818545203597e74b898741f6114315a624-28265295302-1`.

Generic static app artifact gate:

```powershell
pnpm deploy:build-static-app-hostgator -- -AppId calcharbor
```

Generic static app deploy command, after focused local validation and push. Run `Quality Gate` or `Deploy Dry Run` first only for PR/release/closing, first deploys, rollback planning or deployment-sensitive changes:

```powershell
gh workflow run "Deploy Static App HostGator" --ref main -f app_id=calcharbor -f action=deploy -f skip_api_smoke=false
```

Static app public smoke after deploy:

```powershell
pnpm deploy:smoke-static-app-public -- -AppId calcharbor
```

Static app rollback commands:

```powershell
gh workflow run "Deploy Static App HostGator" --ref main -f app_id=calcharbor -f action=rollback-release -f release_id=<release-id> -f skip_api_smoke=false
gh workflow run "Deploy Static App HostGator" --ref main -f app_id=calcharbor -f action=rollback-placeholder -f skip_api_smoke=true
```

Fase 8 batch order:

1. CalcHarbor, DevUtility Lab, TimeNexus.
2. QRRoute, InvoiceCraft, MailHealth, SitePulse Lab.
3. PixelBatch, DocShift.
