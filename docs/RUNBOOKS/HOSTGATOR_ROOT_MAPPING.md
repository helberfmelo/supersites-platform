# HostGator Root Mapping Runbook

## Purpose

Plan the safest path for `https://opentshost.com/` to point to the SuperSites Hub served from `/supersites/`, without overwriting an unmanaged root `.htaccess` or activating direct product-folder mapping by accident.

Sprint 11.2 is dry-run only. It does not change DNS, document root, cPanel files, `.htaccess`, redirects, ads, analytics, billing, workers or provider state.

## Current Safe State

- Canonical transitional Hub URL: `https://opentshost.com/supersites/`.
- Current root URL: `https://opentshost.com/`.
- Direct product folder URLs such as `https://opentshost.com/netprobe-atlas/` remain unmapped until a separate strategy exists.
- The existing Hub deploy script can create a minimal root bridge only with `-EnableRootRedirect`, and only when no root `.htaccess` already exists.

## Dry-Run

Run locally without cPanel secrets:

```powershell
pnpm ops:root-mapping-dry-run
```

This writes:

- `artifacts/root-mapping-dry-run/root-mapping-dry-run.json`
- `artifacts/root-mapping-dry-run/root-mapping-dry-run.md`

The script checks public HTTP status for the root, the Hub fallback and product direct/fallback URLs, then writes the proposed root bridge:

```apache
# SuperSites managed root bridge.
RewriteEngine On
RewriteRule ^$ /supersites/ [R=302,L]
```

Run with cPanel metadata inspection only from a controlled environment that already has HostGator secrets loaded as environment variables:

```powershell
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\plan-hostgator-root-mapping.ps1 -ProbeCpanel
```

The cPanel probe must never print secret values or root `.htaccess` content. It records only whether the file exists, whether it is confirmed as SuperSites-managed and whether metadata/content was readable.

## Apply Gate

A future apply is allowed only when all are true:

- `Quality Gate` passed for the commit being deployed.
- `Deploy Dry Run` passed when deployment-affecting files changed.
- Public Hub smoke passed before the change.
- Root `.htaccess` is absent or is already confirmed as `SuperSites managed root bridge`.
- The change uses the existing guarded deploy path with `-EnableRootRedirect`.
- Public root smoke confirms `https://opentshost.com/` redirects to `/supersites/`.
- `docs/STATUS.md` records run IDs, smoke results and rollback instructions.

Do not use `-ForceRootRedirect` unless a human-reviewed root `.htaccess` diff is attached to the sprint notes and rollback is explicit.

## Out Of Scope

- DNS changes.
- cPanel document-root changes.
- Symlinks or aliases in `public_html`.
- Direct product paths like `/netprobe-atlas/`.
- Permanent 301 redirect choice.
- AdSense, GA4/GTM, billing, donation, affiliate, workers, crons or paid APIs.

## Rollback

If a future root bridge causes trouble, remove the root bridge through the same controlled HostGator path and validate:

```powershell
pnpm deploy:smoke-supersite-public
```

If the root `.htaccess` contains unmanaged rules, stop and review before editing. Preserve a copy of the unmanaged file outside Git and record the recovery steps in `docs/STATUS.md`.
