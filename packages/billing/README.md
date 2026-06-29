# Billing

Provider-agnostic billing contracts, entitlements, usage and webhook primitives.

Sprint 6.4 implements fail-closed local contracts only. Stripe, Mercado Pago and Paddle are represented as provider ids and readiness gates; no SDK, API key, checkout session, signed webhook endpoint, payment method collection, tax calculation or real entitlement sale is activated by this package.

Sprint 14.2 adds a deterministic quota decision helper for local plan entitlements. It resolves numeric limits from sanitized plan entitlements with bounded fallback values; it does not activate checkout, metered billing, provider sync or paid upgrades.
