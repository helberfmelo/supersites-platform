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

## Current bootstrap gate

Until application-specific tests exist, the first CI gate runs:

- `scripts/validate-no-secrets.ps1`
- `scripts/validate-structure.ps1`

When Laravel/Nuxt apps are scaffolded, expand the gate with lint, typecheck, tests, build, security scan, deploy dry-run and smoke checks.
