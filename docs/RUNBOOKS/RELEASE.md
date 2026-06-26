# Release Runbook

Use this runbook after a sprint passes local validation.

## Standard cycle

1. Check `git status --short --branch`.
2. Run local validations for the sprint.
3. Run `scripts/validate-no-secrets.ps1`.
4. Commit with a clear title.
5. Push to the tracked branch.
6. Watch GitHub Actions until the relevant run reaches a final state.
7. Run public smoke checks for any deployed target.
8. Update `docs/STATUS.md` with the release result.
9. Read mandatory docs before starting the next sprint.

## Current quality gate

The current CI gate runs:

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

- `Deploy Dry Run` remains the non-mutating plan workflow for all apps.
- `Deploy SuperSite HostGator` publishes the static SuperSites Hub catalog.
- `Deploy NetProbe HostGator` packages the static NetProbe frontend, but deploy must remain on hold until the public NetProbe API preflight passes.

After `Quality Gate` is green for a catalog deploy commit:

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

NetProbe deploy command, only after `Quality Gate` is green and the public API returns healthy JSON for `/ip` and `/dns`:

```powershell
gh workflow run "Deploy NetProbe HostGator" --ref main -f action=deploy -f api_base_url=https://opentshost.com/supersites/control-plane/api/v1/netprobe
```

NetProbe rollback commands:

```powershell
gh workflow run "Deploy NetProbe HostGator" --ref main -f action=rollback-release -f release_id=<release-id> -f api_base_url=https://opentshost.com/supersites/control-plane/api/v1/netprobe
gh workflow run "Deploy NetProbe HostGator" --ref main -f action=rollback-placeholder -f api_base_url=https://opentshost.com/supersites/control-plane/api/v1/netprobe
```
