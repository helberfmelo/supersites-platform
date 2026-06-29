# ADR 0034 - Paid webhook dry-run foundation

## Status

Accepted on 2026-06-29.

## Context

Phase 14 needs billing webhook readiness before any paid upgrade can exist, but real provider activation remains blocked by KYC, tax, legal, vault-managed secrets and payment-provider approval. The existing schema already had a `billing_webhook_events` ledger for idempotency and payload hashes.

## Decision

Add a public versioned endpoint at `/api/v1/billing/webhooks/{provider}` that only runs in explicit dry-run mode. It supports Stripe, Mercado Pago and Paddle identifiers, requires `X-Supersites-Webhook-Timestamp` plus `X-Supersites-Webhook-Signature`, validates an HMAC over `timestamp.payload`, enforces a replay window, and records only signed dry-run events into `billing_webhook_events`.

The endpoint stores provider, external event id, event type, idempotency key, signature status, processing status, payload hash and timestamps. It never stores raw payloads, provider secrets, customer payment data, invoices, cards, tax data or billing addresses. Replays of the same payload are idempotent; replays with the same event id and a different payload hash are rejected.

## Consequences

- Real billing provider webhooks remain disabled.
- The dry-run receiver defaults to disabled and requires environment configuration; no secret value is versioned.
- Accepted events use `processing_status=dry_run` and perform no entitlement, checkout, invoice, subscription or revenue mutation.
- Real provider secrets, endpoint approval, replay policy, provider account configuration and rollback remain `HUMAN_ACTION_REQUIRED` before go-live.
