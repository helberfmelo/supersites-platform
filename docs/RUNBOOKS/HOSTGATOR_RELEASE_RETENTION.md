# HostGator Release Retention Runbook

## Purpose

Keep HostGator release folders auditable and bounded without deleting production files during planning sprints.

Sprint 11.3 is dry-run only. It lists release directories, identifies active releases, applies a retention policy and records what would require future review. It does not remove, move, upload, publish, chmod, rewrite `.htaccess`, change DNS, change document roots or run deploys.

## Release Families

| Surface | Release folder |
|---|---|
| SuperSites Hub | `_supersites-releases` |
| Control Plane | `_control-plane-releases` |
| NetProbe Atlas | `_netprobe-releases` |
| Static product apps | `_static-releases` |

The active static release is read from managed `.htaccess` when present. The active control-plane release is read from the managed `index.php` front controller.

## Policy

Default dry-run policy:

- Keep active release always.
- Keep newest 3 releases per surface.
- Keep releases younger than 14 days.
- Mark older non-active releases outside the newest window as `eligible-for-future-removal`.
- Mark releases with missing modification time as `review-only`.

Eligibility is not permission to delete. Any future removal needs a separate audited apply path, fresh dry-run evidence, public smokes and `docs/STATUS.md` update.

## Local Dry-Run

Run without cPanel secrets:

```powershell
pnpm ops:hostgator-retention-dry-run
```

This writes:

- `artifacts/hostgator-retention-dry-run/hostgator-retention-dry-run.json`
- `artifacts/hostgator-retention-dry-run/hostgator-retention-dry-run.md`

Without cPanel secrets, the script records the release families and policy but cannot list remote folders.

## GitHub Dry-Run

Use the manual workflow when remote inventory is needed:

```powershell
gh workflow run "HostGator Retention Dry Run" --ref main -f phase=11 -f sprint=11.3 -f keep_newest=3 -f keep_days=14 -f probe_cpanel=true
```

The workflow runs in the `production-hostgator` environment, reads cPanel secrets from GitHub Actions and uploads artifact `hostgator-retention-dry-run`. It must not print secret values or remote file contents.

## Future Removal Gate

Do not delete remote release folders until a future sprint adds an explicit apply path with:

- denylist for active releases;
- current-release detection immediately before deletion;
- allowlist of managed release folder names only;
- max deletion count per run;
- fresh public smokes after removal;
- rollback/recovery notes;
- documentation commit and monitored Quality Gate.

Manual deletion outside that gate is not approved by this runbook.
