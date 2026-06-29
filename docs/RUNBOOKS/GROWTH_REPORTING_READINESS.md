# Growth Reporting Readiness Runbook

## Scope

Sprint 16.4 adds authenticated, fail-closed readiness for weekly/monthly growth
reporting.

Endpoint:

- `GET /api/v1/growth/reporting-readiness`

Access:

- authenticated user
- `dashboard.view`

## Contract

Contract version:

- `GrowthReportingReadiness::CONTRACT_VERSION` `2026-06-29.16.4`
- `@supersites/executive-reports growthReportingContractVersion`

The default seeded snapshot has:

- 3 reports
- 18 report items
- 3 reports ready for operator review
- 14 before/after-ready items
- 12 finalized, 2 estimated, 1 delayed and 3 unavailable items
- 0 scheduled reports
- 0 emails sent
- 0 provider imports enabled
- `causality_status=not_inferred`

The snapshot always reports:

- `side_effects=none`
- `provider_activation=false`
- `recurring_delivery_enabled=false`
- `external_recipients_enabled=false`
- `revenue_reporting_enabled=false`
- `should_schedule_report=false`
- `should_send_email=false`
- `should_import_provider_data=false`
- `should_infer_causality=false`

## Operating Rules

Use this endpoint only for operator review of reporting readiness.

Before any real scheduled or external report delivery:

- provider/data source gates must be approved per source/site;
- tokens/secrets must be stored only in an approved vault/secret manager;
- retention, export and deletion rules must be approved;
- report recipients, terms, privacy and support process must be approved;
- revenue and traffic fields must be aggregated and reviewed for privacy;
- causality or before/after claims must have a manual evidence contract;
- CI, deploy dry-run and public smokes must be green;
- `docs/HUMAN_ACTION_REQUIRED.md` must show the gate as resolved.

Never use this readiness view to:

- schedule recurring reports;
- send email to external recipients;
- import GA4, Search Console, AdSense or billing provider data;
- report real revenue as active;
- infer or publish causal attribution;
- expose provider payloads, tokens, queries, invoices, clicks or customer data.

## Validation

Focused:

```powershell
pnpm --filter @supersites/executive-reports test
cd apps\control-plane
php artisan test --filter=GrowthReportingReadinessTest
php artisan test --filter=AdminPanelTest
```

Governed sprint:

```powershell
pnpm test:packages
pnpm typecheck:packages
php artisan test
composer validate --strict
pnpm measure:admin-audit
pnpm deploy:build-control-plane-hostgator
pnpm validate:structure
pnpm validate:secrets
pnpm deploy:dry-run
pnpm ci:changes
git diff --check
pnpm validate:adsense-safe-public
```
