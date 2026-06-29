# Growth Provider Ingestion Readiness

## Purpose

Prepare Phase 16 provider ingestion without activating external providers.

## Endpoint

- `GET /api/v1/growth/ingestion-readiness`
- Requires authentication and `dashboard.view`.
- Returns contract `2026-06-29.16.1`.

## Fail-Closed Rules

- No GA4, Search Console, AdSense or billing API request is made.
- No OAuth token, service-account key, API key, webhook secret or provider payload is stored.
- No worker, cron, queue job, retry loop or scheduled import is enabled.
- `should_import`, `provider_request_enabled` and `worker_enabled` remain false even when a row is ready for human activation.

## Human Gates Before Real Import

- Provider account/access approved.
- Token or secret stored only in an approved vault/secret manager.
- Quota, retry and backoff policy approved.
- Data minimization matrix and retention/deletion rules approved.
- Provider-specific smoke, rollback and incident notes ready.
- Explicit human approval by provider/source/site.

## Validation

Run before relying on the readiness snapshot:

```powershell
pnpm --filter @supersites/analytics test
cd apps\control-plane
php artisan test --filter=GrowthIngestionReadinessTest
```

Broader sprint validation must still run `test:packages`, `typecheck:packages`, `php artisan test`, `composer validate --strict`, admin audit, control-plane artifact build, structure/secret checks, deploy dry-run, `ci:changes`, `git diff --check`, CI monitoring and public smokes.
