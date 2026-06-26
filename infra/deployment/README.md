# Deployment

Deployment configuration starts with a dry-run foundation and now includes controlled HostGator deploy paths for the SuperSites Hub catalog, the Laravel control-plane/API and the gated NetProbe Atlas frontend. CalcHarbor and DevUtility Lab have Nuxt SSG manifest entries after Sprints 3.1 and 3.2, but no real traffic switch workflow yet.

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

## NetProbe Atlas Static Gate

NetProbe static releases use a separate release directory under the app folder:

```text
/home1/opents62/public_html/supersites/netprobe-atlas/_netprobe-releases/<release-id>/
```

Build and validate the HostGator artifact locally:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\build-netprobe-hostgator-artifact.ps1
```

Publish only when the public API preflight is healthy:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-netprobe-hostgator.ps1
```

The publish script switches only `/supersites/netprobe-atlas/.htaccess`, preserves the bootstrap placeholder and refuses deploy when the configured public API does not answer IP/DNS smoke checks.

## Control Plane API Deploy

Control-plane Laravel releases use a separate protected release directory under the app folder:

```text
/home1/opents62/public_html/supersites/control-plane/_control-plane-releases/<release-id>/
```

Build and validate the HostGator artifact locally:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\build-control-plane-hostgator-artifact.ps1
```

Publish from a shell that has cPanel and control-plane production settings in environment variables, or through the manual GitHub workflow:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-control-plane-hostgator.ps1
```

The publish script:

- builds a no-secret Laravel ZIP with Composer production dependencies;
- uploads and extracts it into a new release directory with cPanel file operations;
- writes release `.env` remotely from GitHub/local secret inputs;
- preserves an existing base remote `.env`;
- protects `_control-plane-releases` from direct web access;
- switches `/supersites/control-plane/` through managed `index.php` and `.htaccess`;
- runs public smoke for `/health`, NetProbe `/ip` and NetProbe `/dns`.

Rollback:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-control-plane-hostgator.ps1 -RollbackReleaseId <release-id> -SkipBuild
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\publish-control-plane-hostgator.ps1 -RollbackToPlaceholder -SkipBuild
```

## Current Rule

Real deploy is allowed for the SuperSites Hub static catalog, control-plane/API and NetProbe Atlas after artifact validation, remote preservation, smoke and rollback checks pass. CalcHarbor, DevUtility Lab and the remaining apps remain dry-run or placeholder-only until they receive app-specific packaging, smoke and rollback scripts.
