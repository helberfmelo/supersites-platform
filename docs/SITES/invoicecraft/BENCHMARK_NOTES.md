# InvoiceCraft Benchmark Notes

Data-base: 2026-06-27

## References

- Invoice Generator
- OnlineInvoices
- FreeInvoiceBuilder
- Billdu
- Zoho free invoice generator
- Wave invoice generator

## Screenshots available

- No InvoiceCraft-specific screenshots are present yet.

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
