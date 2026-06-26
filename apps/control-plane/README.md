# SuperSites Control Plane

Laravel 13 application for the SuperSites control plane and portfolio API.

## Local

Use the shared Docker stack from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File ..\..\scripts\start-local-docker.ps1
```

The local `.env` file is ignored by Git. Keep real passwords out of committed files.

## Validation

```powershell
composer validate --strict
php artisan test
php artisan route:list --path=health
```
