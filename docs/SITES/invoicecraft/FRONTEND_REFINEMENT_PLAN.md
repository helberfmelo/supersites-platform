# InvoiceCraft Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make invoice, quote and receipt creation feel like a polished document editor while keeping data local and the free PDF complete.

## P0

- Refine form plus preview layout.
- Improve item row ergonomics, totals and manual adjustment display.
- Make PDF download state clear and accessible.
- Add visible local-data/privacy note.
- Add related flows between invoice, quote and receipt.

## P1

- Plan optional local autosave with explicit consent, but do not enable by default in this sprint.
- Add template selection placeholders without paid lock on the basic document.

## P2

- Prepare saved clients/products, branding, recurrence, team and payment workflows as gated paid backlog.

## Impact expected

Better completion for high-intent business users and stronger future conversion to saved workflows.

## Technical risk

Medium because PDF rendering and responsive preview can regress.

## AdSense/compliance risk

Medium. Ads/support cannot sit near document fields, preview or download button.

## Tests needed

- InvoiceCraft unit tests/build.
- PDF rendering smoke.
- Preview smoke and Playwright.
- No analytics from document data.

## Acceptance metrics

- PDF download works locally.
- Basic document can be completed without signup.
- No document field persists or leaves the browser.

## Dashboard backlog

- PDF UX readiness.
- Tax/legal gate.
- Branding/payment upgrade readiness.
