# ADR 0037 - Google provider go-live readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 15 includes GA4, GTM and Search Console go-live, but Google account access, property/container creation, ownership verification, consent/legal review and provider terms remain human-gated. The platform needs an authenticated way to see readiness without loading Google scripts, creating verification tokens or importing external data.

## Decision

Add an authenticated Google provider go-live readiness snapshot at `/api/v1/google/go-live-readiness` behind `dashboard.view`.

The snapshot validates GA4 measurement IDs, GTM container IDs, Search Console readiness, domain readiness, allowed event contracts and feature flags. It always reports:

- `provider_activation=false`
- `side_effects=none`
- `automatic_tag_injection_enabled=false`
- `automatic_data_import_enabled=false`
- `should_load_ga4=false`
- `should_load_gtm=false`
- `should_import_search_console=false`

The admin dashboard shows the readiness summary next to Google integrations. `@supersites/analytics` owns deterministic normalization for GA4 and GTM IDs.

## Consequences

- Operators can identify which sites are ready for human activation without triggering third-party requests.
- Invalid GA4/GTM identifiers never count as configured.
- Search Console import remains unavailable until ownership verification and a data-governance review are complete.
- Public surfaces continue to have zero GA4/GTM/Search Console snippets or provider traffic.
