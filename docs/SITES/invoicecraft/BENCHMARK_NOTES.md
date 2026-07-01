# InvoiceCraft Benchmark Notes

Data-base: 2026-06-30

## References

- Invoice Generator
- OnlineInvoices
- FreeInvoiceBuilder
- Billdu
- Zoho free invoice generator
- Wave invoice generator

## Screenshots available

- `artifacts/invoicecraft-catalog-qa/invoicecraft-catalog-local-desktop.png`
- `artifacts/invoicecraft-catalog-qa/invoicecraft-catalog-local-mobile-pt-br.png`
- `artifacts/invoicecraft-catalog-qa/invoicecraft-catalog-live-desktop.png`
- `artifacts/invoicecraft-catalog-qa/invoicecraft-catalog-live-mobile-pt-br.png`

## Useful patterns to learn

- The editor and live document preview are the core product.
- Basic invoice/quote/receipt PDF should not require signup.
- Users expect item rows, quantity, price, discount/adjustment and total clarity.
- Paid value naturally comes from saved clients/products, recurrence, branding and payments.

## Do not copy

- Templates, legal text, invoice examples, iconography, pricing copy or branded document layouts.

## Opportunities

- Improve form/preview ergonomics and PDF download clarity.
- Plan templates and local autosave carefully without storing sensitive data by default.
- Strengthen legal/tax disclaimers per locale.

## Sprint 9.9 benchmark-grade response

- The editor and live document preview are now the first substantial experience on the home and tool pages.
- The free flow supports editable item rows, currency, locale context, discount, shipping/freight, manual tax/adjustment and local PDF export.
- Paid SaaS behaviors remain visibly planned but inactive: saved clients/products, recurrence, branding, teams, payment links and fiscal numbering.
- Production evidence: Sprint 9.9 deploy `28319247622`, final asset `CAuTAoAj.js`, public smokes and live invoice-builder/mobile UX smoke passed.

## Sprint 18.8 catalog response

- The Hub catalog route now uses the same mental model as invoice-generator benchmarks: action first, document preview visible, then workflow navigation.
- Invoice, quote and receipt are exposed as real deep links instead of a generic site page.
- Legal/tax/payment constraints moved below the main value in a short review note; the top no longer reads like an internal tax/legal gate.
- Production evidence: Hub deploy `28434690625`, release `de22452861a113981ebb373da06764c017df020d-28434690625-1`, Hub asset `B_-TzziU.js`, InvoiceCraft asset `D2cnhdLE.js`, public smokes, 6 deep links, crawler quick and live desktop/mobile visual QA passed.

## Sprint 18.60-18.63 tool response

- The app home now behaves more like invoice-generator benchmarks: the document editor and preview are the primary experience, and the catalog sits below.
- Invoice, quote and receipt share the same editor/preview model while using flow-specific cues: due date, valid-until quote, paid-date receipt and paid status.
- PDF export remains a free local action, with optional local PNG/JPEG logo support and no account requirement.
- Tax, fiscal numbering, payment processing and future workflow limits were moved below the useful document result instead of appearing as top-page technical status.
- Local evidence: `pnpm test:invoicecraft`, `pnpm build:invoicecraft`, `pnpm validate:invoicecraft-preview` asset `/_nuxt/DzUEzIxj.js`, `pnpm validate:public-copy`, `pnpm validate:secrets`, `pnpm test:e2e:invoicecraft` after the remote gate exposed a selector ambiguity, and `git diff --check`.
