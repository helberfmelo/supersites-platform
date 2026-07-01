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

## Document studio refinement

- Adds editor/preview layout, template-style tabs, a document snapshot panel, local logo upload, clearer PDF/download guidance, text-summary copy and related document flows.
- Keeps issuer, client, item, amount, notes and PDF contents local to the browser session.
- Does not activate saved clients/products, official tax templates, fiscal numbering, payment collection, checkout, advertising or external analytics.

## Future account scope

Saved clients, product catalogs, recurring invoices, branding, teams, payment collection, fiscal tax templates, advertising and external analytics require separate review before activation.

Official tax handling, fiscal numbering and jurisdiction-specific invoice requirements require explicit owner/legal review before activation.

Public traffic uses the versioned HostGator static app flow after app-specific artifact validation, public smoke and rollback/traffic-switch workflows.
