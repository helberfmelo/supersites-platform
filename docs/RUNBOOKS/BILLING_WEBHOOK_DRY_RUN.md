# Billing Webhook Dry-Run Runbook

## Purpose

Validate the billing webhook receiver contract without activating checkout, subscriptions, invoices, payment providers or paid entitlements.

## Endpoint

- Route: `POST /api/v1/billing/webhooks/{provider}`
- Providers: `stripe`, `mercado_pago`, `paddle`
- Mode: dry-run only
- Required headers:
  - `X-Supersites-Webhook-Timestamp`
  - `X-Supersites-Webhook-Signature`
- Signature format: `sha256=<hmac>`
- Signed payload: `<timestamp>.<raw_body>`

## Environment

The receiver is disabled unless all dry-run config exists:

```env
BILLING_WEBHOOK_DRY_RUN_ENABLED=true
BILLING_WEBHOOK_DRY_RUN_SECRET=<local-or-vault-test-secret>
BILLING_WEBHOOK_REPLAY_WINDOW_SECONDS=300
BILLING_WEBHOOK_MAX_PAYLOAD_BYTES=65536
```

Never commit a real provider webhook secret. Production secrets must live only in the approved vault/secret manager.

## Expected Behavior

- Unsigned, stale, malformed or unsupported provider events are rejected.
- Signed dry-run events create one `billing_webhook_events` row.
- The row stores `payload_hash`, `idempotency_key`, `signature_status=verified_test` and `processing_status=dry_run`.
- Replaying the same provider/event id/payload returns an idempotent replay response.
- Replaying the same provider/event id with another payload hash returns conflict.
- No entitlement, invoice, subscription, checkout, revenue, customer, tax or provider-side mutation runs.

## Validation

Run:

```powershell
php artisan test --filter=BillingWebhookDryRunTest
php artisan test
composer validate --strict
```

Before any real provider go-live, add provider-specific signature fixtures, rollback steps, vault-managed secrets, payment-provider dashboard verification and legal/billing approval evidence.
