# ADR 0040 - Growth provider ingestion readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 16 starts the continuous growth loop, but GA4, Search Console, AdSense, billing providers, tokens, quotas, retention rules and legal approvals are still human-gated. The platform needs an operator-visible ingestion contract without calling provider APIs, starting workers or storing real provider payloads.

## Decision

Add local `growth_provider_ingestions` readiness records per site and source: `ga4`, `search_console`, `adsense` and `billing`.

Expose an authenticated snapshot at `/api/v1/growth/ingestion-readiness` behind `dashboard.view`. The snapshot validates access, vault token status, quota, data contract, retention, import status and feature flag, but always reports:

- `provider_activation=false`
- `side_effects=none`
- `sources_importing=0`
- `provider_requests_enabled=0`
- `workers_enabled=0`
- `automatic_retry_enabled=false`
- `should_import=false`

`@supersites/analytics` owns the deterministic growth ingestion source list and fail-closed gate helper for future provider import code.

## Consequences

Operators can see exactly which provider imports remain blocked before enabling the growth loop. Real GA4/Search Console/AdSense/billing ingestion still requires approved accounts, tokens in vault, quotas, data-governance matrix, retention, retry/backoff, smoke/rollback and human approval.
