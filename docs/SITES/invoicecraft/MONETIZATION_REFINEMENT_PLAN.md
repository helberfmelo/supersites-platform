# InvoiceCraft Monetization Refinement Plan

Data-base: 2026-06-27

## References

- Invoice SaaS saved-client, recurrence, payment and branding upsells.

## P0

- Add gated CTAs for clients/products saved, branding, recurrence, teams and payments.
- Keep PDF generation free and complete.
- Keep ad/support placeholders away from document data and download actions.

## P1

- Define billing and account data requirements before saved workflows.
- Add dashboard backlog for tax/legal review by jurisdiction.

## P2

- Activate payments only after provider, KYC, tax, terms, webhook and refund policy gates.

## Impact expected

Clear paid path for repeat business workflows without weakening the free document builder.

## Technical risk

High for future payments/taxes; low for inert CTAs.

## AdSense/compliance risk

Medium due to sensitive business data and download actions.

## Tests needed

- Verify no checkout/payment link/webhook.
- Verify no document data in analytics/logs.

## Acceptance metrics

- Real checkout and webhooks remain `0`.
- Document data remains local.
- Fiscal/tax items remain `HUMAN_ACTION_REQUIRED`.

## Dashboard backlog

- Payment gate.
- Tax/fiscal numbering gate.
- Saved client/product data matrix.
