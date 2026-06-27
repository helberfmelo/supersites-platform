# InvoiceCraft Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-INVOICECRAFT.
- Real number: Sprint 7.8.
- Must run after: Sprint 7.7.

## Current state

- Nuxt SSG app exists with invoice, quote and receipt builders and local PDF output.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Editor/preview/PDF UX refinement.
- Tax/legal-safe SEO/AIO content.
- Inert monetization/support structure.

## Validation

- `pnpm test:invoicecraft`
- `pnpm build:invoicecraft`
- `pnpm validate:invoicecraft-preview`
- `pnpm test:e2e:invoicecraft`
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No official tax templates or fiscal numbering.
- No payment collection, checkout, webhooks or saved customer data.
- No analytics values from document fields or PDFs.
