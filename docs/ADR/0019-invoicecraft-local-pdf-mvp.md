# ADR 0019 - InvoiceCraft local PDF MVP

Date: 2026-06-27

## Status

Accepted

## Context

Sprint 4.2 starts the workflow-products phase after QRRoute. The free InvoiceCraft surface must solve the basic need of creating and downloading an invoice, quote or receipt without mandatory signup, while paid value is reserved for saved clients/products, recurrence, branding, teams, payments and history.

The product handles names, addresses, item descriptions, amounts and possible tax/adjustment labels. Those fields can be sensitive business data and may also trigger jurisdiction-specific tax, legal or accounting requirements.

## Decision

InvoiceCraft Sprint 4.2 is implemented as a Nuxt SSG/browser-side MVP in `apps/invoicecraft`.

- The free scope includes three tools: `invoice-builder`, `quote-builder` and `receipt-builder`.
- Document calculation, preview and PDF download run in the browser.
- The app uses `jspdf` through dynamic client-side import for PDF generation.
- Document fields are not stored, not sent to a product API, not written to browser storage and not included in analytics.
- Analytics events are limited to `tool_viewed`, `tool_started`, `tool_completed`, `tool_failed` and `file_downloaded` with `tool_slug`, locale and sanitized route path only.
- Tax/fiscal behavior is limited to a manual adjustment line with visible disclaimers.
- Official tax templates, fiscal numbering, jurisdictional tax logic and payment collection are `HUMAN_ACTION_REQUIRED` before activation.

## Consequences

The MVP is cheap to operate, privacy-preserving and useful before accounts or billing exist. It does not provide saved clients/products, recurrence, branding, team collaboration, payment collection, official fiscal invoices, history or API access.

Real public deployment remains gated behind app-specific HostGator artifact validation, public smoke and rollback, even though the deployment manifest and dry-run now know the InvoiceCraft SSG build output.
