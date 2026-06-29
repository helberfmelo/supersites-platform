# Control Plane Admin Audit

This runbook covers Sprint 12.2 authenticated admin browser auditing.

## Scope

- Audit the Laravel control-plane admin through a local browser session.
- Use a local ephemeral SQLite database seeded with repository seeders.
- Start `php artisan serve` on `127.0.0.1` only.
- Authenticate with seeded local credentials: `owner@supersites.local` / `password`.
- Capture screenshots and JSON/Markdown evidence under `artifacts/control-plane-admin-audit/`.

## Command

```powershell
pnpm measure:admin-audit
```

The wrapper:

1. Sets process-local Laravel env vars for SQLite, file sessions, array cache and sync queue.
2. Runs `php artisan config:clear`.
3. Runs `php artisan migrate:fresh --seed --force` against the artifact SQLite file.
4. Starts the local Laravel server on `127.0.0.1:8014`.
5. Runs Playwright against the local admin.
6. Stops only the local `php -S 127.0.0.1:8014` server process for this app.

## Coverage

Desktop:

- `/admin`
- `/admin/benchmark-refinement`
- `/admin/reports`
- first `/admin/reports/{id}` detail discovered from the reports index
- `/admin/sites`
- `/admin/account`

Mobile:

- `/admin`
- `/admin/sites`
- `/admin/account`

Each page records HTTP status, H1, expected text coverage, horizontal overflow, console errors, page errors, external requests and screenshot path.

## Safety

- The Node auditor refuses non-local hosts. Only `127.0.0.1` and `localhost` are allowed.
- No production authenticated URL is accessed.
- No secrets are read from `docs/credentials/credentials.local.md`.
- No external provider, AdSense, Google tag, PageSpeed API, billing, donation or affiliate integration is activated.
- Artifacts are ignored by git.
