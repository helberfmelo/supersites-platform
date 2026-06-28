# DocShift SEO/AIO Refinement Plan

Data-base: 2026-06-27

## References

- iLovePDF task-grid and related-tool clustering.
- Smallpdf premium tool-page UX.
- PDF24 breadth of utility tasks.

## P0

- Add direct explanations for each PDF task.
- Add original content on privacy, local processing, limitations and safe document handling.
- Add FAQ and related tools per page.
- Keep metadata, schema, canonical and hreflang stable.

## P1

- Add glossary for merge, split, compress, watermark, OCR, metadata and page ranges.
- Add examples for safe non-sensitive documents.

## P2

- Add OCR/conversion pages only when implementation and provider gates exist.

## Impact expected

Better SEO/AIO match for PDF utility queries without becoming a generic clone.

## Technical risk

Low for content; medium for future conversion/OCR routes.

## AdSense/compliance risk

Medium if upload pages are thin or ads are close to file actions.

## Tests needed

- Metadata/schema checks.
- Static route checks.

## Acceptance metrics

- Every PDF page has use case, limitations, FAQ and related tools.
- No OCR/server-side promise before gates.

## Sprint 7.12 result

- Every tool page now exposes related document tools to support safe task chaining and internal linking.
- Copy was updated to avoid dated public sprint labels and preserve local-processing/privacy explanations.
- OCR, server-side conversion, batch, history, teams and API are described only as gated future workflow value.
- Structured data remains free/browser-side; no new route promises OCR or server-side upload.

## Sprint 9.7 result

- Home now presents the primary PDF action before the catalog while keeping the dense tool grid, category filters and operating principles for discovery.
- Tool pages keep canonical, hreflang, WebApplication/FAQ schema, guide sections, FAQ and related document links while using the shared workbench for the above-fold task.
- Public copy emphasizes browser-side processing, visible limits and safe document handling without promising OCR, server-side upload, forensic redaction or advanced compression.
- `pnpm validate:public-copy` passed across 876 generated HTML files after the final DocShift build.

## Dashboard backlog

- PDF privacy content coverage.
- Tool chaining internal links.
- OCR opportunity gate.
