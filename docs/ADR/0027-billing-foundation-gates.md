# ADR 0027 - Billing foundation gates

Date: 2026-06-27
Status: Accepted

## Context

Sprint 6.4 prepares monetization upgrades, but provider accounts, KYC, taxes, payment profiles, bank details and legal acceptance are human or irreversible gates. The platform also must not store card data or accept unauthenticated provider webhooks.

## Decision

Create provider-agnostic contracts in `@supersites/billing` and local readiness storage in the control-plane. Providers supported as identifiers are Stripe, Mercado Pago and Paddle. Checkout and webhook processing fail closed unless all human and configuration gates are explicitly true. Seed only free-preview plans and local entitlement definitions. Do not add provider SDKs, secrets, checkout endpoints, public webhook endpoints, payment links, tax automation, invoice/refund/dunning flows or paid entitlements in this sprint.

## Consequences

The admin can see provider, plan and entitlement readiness, and future implementation has an idempotency ledger shape for signed webhooks. Real billing still requires human action, secrets in approved stores, signed webhook verification, replay protection, legal/tax review, cancellation/refund/dunning policy and production smoke/rollback.
