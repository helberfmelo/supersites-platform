# Executive Report Evidence

This runbook covers Sprint 12.4 evidence handling for executive reports.

## Scope

- Keep executive reports limited to internal documents, public watchdog artifacts, local measurement artifacts, control-plane seeders and explicit `provider-unavailable:*` markers.
- Preserve `causality_status=not_inferred` in reports, print views and CSV exports.
- Keep GA4, Search Console, AdSense, billing providers and other external sources unavailable until the relevant human gates exist.
- Show/export evidence sources and summaries instead of reporting only an opaque evidence count.

## Allowed Sources

- Internal docs: `docs/...`, `README.md`, `AGENTS.md` and package README files.
- Public watchdog artifacts: `artifacts/benchmark-crawl/`, `artifacts/adsense-safe-public/`, `artifacts/uptime-incident-readiness/`.
- Local measurement artifacts: `artifacts/lighthouse-public/`, `artifacts/lhci-public/`, `artifacts/control-plane-admin-audit/`, `artifacts/google-readiness/`, `artifacts/executive-evidence/`.
- Control-plane seeders: `apps/control-plane/database/seeders/*.php`.
- Explicit unavailable markers: `provider-unavailable:ga4`, `provider-unavailable:gtm`, `provider-unavailable:search-console`, `provider-unavailable:adsense`, `provider-unavailable:billing`, `provider-unavailable:pagespeed`.

## Blocked Sources

Active provider sources such as `ga4:`, `google-analytics:`, `search-console:`, `adsense:`, `stripe:`, `mercado-pago:`, `paddle:` or their provider URLs are blocked by `@supersites/executive-reports` until human approval, credentials, terms, data governance and provider import contracts exist.

## Validation

Run the package contract:

```powershell
pnpm --filter @supersites/executive-reports test
pnpm --filter @supersites/executive-reports typecheck
```

Run Laravel/admin validation:

```powershell
cd apps/control-plane
composer validate --strict
php artisan test
cd ../..
pnpm measure:admin-audit
```

Run repository gates:

```powershell
pnpm test:packages
pnpm typecheck:packages
pnpm validate:structure
pnpm validate:secrets
pnpm deploy:dry-run
pnpm ci:changes
git diff --check
```

## Evidence Handling

- Do not commit files under `artifacts/`.
- Record package test, Laravel test, admin audit run ID, Quality Gate, Deploy Dry Run and public smoke results in `docs/STATUS.md`.
- Do not infer revenue, ranking, traffic growth or cause/effect from readiness, smoke, crawler, Lighthouse or admin audit evidence.
