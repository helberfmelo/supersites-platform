# Deployment

Deployment configuration starts with a dry-run foundation and now includes the first controlled real deploy path for the SuperSites Hub catalog.

## Files

- `apps.json`: source of truth for app ids, local paths, transitional HostGator paths and fallback public URLs.

## Dry Run

Generate the current deploy plan:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\prepare-deploy-dry-run.ps1
```

The generated artifact is written to `artifacts/deploy-dry-run/` and is ignored by Git.

## SuperSites Hub Static Deploy

The transitional catalog deploy uses versioned static releases under HostGator:

```text
/home1/opents62/public_html/supersites/_supersites-releases/<release-id>/
```

Build and validate the HostGator artifact locally:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\build-supersite-hostgator-artifact.ps1
```

Publish from a shell that has cPanel credentials in environment variables, or from the ignored local credential inventory:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-supersite-hostgator.ps1
```

The publish script:

- builds Nuxt with `NUXT_APP_BASE_URL=/supersites/`;
- validates that generated assets use `/supersites/_nuxt/...`;
- uploads files into a new release directory;
- switches `/supersites/` through a managed `.htaccess`;
- preserves remote `.env`, placeholders and user-managed folders;
- runs public smoke after switching traffic.

Optional root redirect:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-supersite-hostgator.ps1 -EnableRootRedirect
```

This creates a root bridge only when no unmanaged root `.htaccess` exists. Use `-ForceRootRedirect` only after reviewing root rules.

## Rollback

Switch back to a previous release:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-supersite-hostgator.ps1 -RollbackReleaseId <release-id> -SkipBuild
```

Return `/supersites/` to the bootstrap placeholder:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-supersite-hostgator.ps1 -RollbackToPlaceholder -SkipBuild
```

Then rerun public smoke:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\smoke-supersite-public.ps1
```

## Current Rule

Real deploy is allowed only for the SuperSites Hub static catalog after artifact validation, remote preservation, smoke and rollback checks pass. Other apps remain dry-run or placeholder-only until they receive app-specific deploy scripts.
