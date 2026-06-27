# InvoiceCraft

Browser-side invoice, quote and receipt workflows with local PDF export.

## Current scope

- Nuxt SSG app with localized routes for `en`, `pt-br`, `es`, `fr` and `de`.
- Free tools run without mandatory signup:
  - invoice builder;
  - quote builder;
  - receipt builder.
- Document preview, item totals and PDF download run locally in the browser.
- Tool analytics are limited to `tool_slug`, event name, locale and safe route path.
- Issuer, client, item, amount, tax/adjustment and note fields are not stored or sent to a product API.

## Sprint 7.8 benchmark refinement

- Adds template-style tabs, a document snapshot panel, clearer PDF/download guidance, text-summary copy, related document flows and gated workflow prompts.
- Keeps issuer, client, item, amount, notes and PDF contents local to the browser session.
- Does not activate saved clients/products, official tax templates, fiscal numbering, payment collection, checkout, billing, ads or external analytics.

## Gated scope

Saved clients, product catalogs, recurring invoices, branding, teams, payment collection, fiscal tax templates, billing, ads and external analytics are not active.

Official tax handling, fiscal numbering and jurisdiction-specific invoice requirements must be treated as `HUMAN_ACTION_REQUIRED` before activation.

Public traffic remains on the HostGator placeholder until InvoiceCraft receives app-specific artifact validation, public smoke and rollback/traffic-switch workflows.
