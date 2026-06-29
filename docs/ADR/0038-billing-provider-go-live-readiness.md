# ADR 0038 - Billing provider go-live readiness

## Status

Accepted on 2026-06-29.

## Context

Phase 15 includes Stripe, Mercado Pago and Paddle go-live, but provider accounts, KYC, tax profile, payment profile, terms, secrets, checkout activation and live webhook activation remain human-gated. The platform needs an authenticated readiness view without creating checkout sessions, loading provider SDKs, processing live webhooks or importing revenue.

## Decision

Add an authenticated billing provider go-live readiness snapshot at `/api/v1/billing/go-live-readiness` behind `dashboard.view`.

The snapshot validates provider records, account/KYC/tax/payment/terms states, API key and webhook secret readiness markers, webhook endpoint approval, checkout/webhook feature flags and paid plan mappings. It always reports:

- `provider_activation=false`
- `side_effects=none`
- `checkout_sessions_enabled=0`
- `live_webhooks_enabled=0`
- `provider_sdk_loaded=0`
- `revenue_import_enabled=0`
- `should_create_checkout_session=false`
- `should_process_live_webhooks=false`
- `should_import_revenue=false`

The admin dashboard shows provider and paid-plan readiness next to the existing billing panel. `@supersites/billing` exposes deterministic provider price reference normalization for future plan mapping checks.

## Consequences

- Operators can see whether provider and plan records are ready for human activation without triggering payment-provider side effects.
- Paid plan mappings only count as ready when a supported provider, positive amount, ready status and valid price reference exist.
- Public checkout, subscriptions, invoices, refunds, dunning, settlement/revenue import and live webhook processing remain unavailable until all human gates and provider-specific smoke/rollback steps pass.
