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

The deploy workflow is still dry-run only until artifact packaging, remote preservation, smoke and rollback are complete.
