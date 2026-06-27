# Billing

Provider-agnostic billing contracts, entitlements, usage and webhook primitives.

Sprint 6.4 implements fail-closed local contracts only. Stripe, Mercado Pago and Paddle are represented as provider ids and readiness gates; no SDK, API key, checkout session, signed webhook endpoint, payment method collection, tax calculation or real entitlement sale is activated by this package.
