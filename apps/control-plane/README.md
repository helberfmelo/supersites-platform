# SuperSites Control Plane

Laravel 13 application for the SuperSites control plane and portfolio API.

## Local

Use the shared Docker stack from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ..\..\scripts\start-local-docker.ps1
```

The local `.env` file is ignored by Git. Keep real passwords out of committed files.

## API base

Versioned API routes live under `/api/v1`.

- `GET /api/v1/me`: authenticated user, roles and effective permissions.
- `GET /api/v1/sites`: portfolio site inventory for users with `sites.view`; creates an `api.sites.index` audit event.

Initial seeders create 12 portfolio records, 5 permissions and 4 roles: `owner`, `operator`, `analyst` and `site-admin`.

## Validation

```powershell
composer validate --strict
php artisan test
php artisan route:list --path=api/v1
php artisan route:list --path=health
```

The default test database is SQLite in memory through `phpunit.xml`; local PHP must load `pdo_sqlite` and `sqlite3`.
