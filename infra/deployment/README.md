# Deployment

Deployment configuration starts with a dry-run foundation.

## Files

- `apps.json`: source of truth for app ids, local paths, transitional HostGator paths and fallback public URLs.

## Dry Run

Generate the current deploy plan:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\prepare-deploy-dry-run.ps1
```

The generated artifact is written to `artifacts/deploy-dry-run/` and is ignored by Git.

## Current Rule

Do not perform real uploads or rewrites until the deploy script preserves remote `.env` files, has rollback, and passes smoke checks.
