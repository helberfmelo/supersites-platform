# DocShift Monetization Refinement Plan

Data-base: 2026-06-27

## References

- iLovePDF and Smallpdf premium/batch patterns.
- Sejda/PDF24 breadth and task chaining.

## P0

- Add gated CTAs for batch, larger files, OCR, API, workspaces, teams and ad-free use.
- Keep small browser-side PDF tasks free.
- Keep ads/support away from upload, progress, preview and download actions.

## P1

- Define paid quotas for file count, size, OCR pages and API usage.
- Add data-governance backlog for server-side processing.

## P2

- Activate server-side OCR/batch/API only after sandbox, retention, antivirus, billing and provider gates.

## Impact expected

Clear upgrade path for heavy document workflows while preserving privacy-first MVP.

## Technical risk

High for future server-side/OCR processing; low for inert CTAs.

## AdSense/compliance risk

Medium due to document uploads and sensitive content.

## Tests needed

- Verify no upload endpoint, checkout, ad script or payment link.
- Verify analytics excludes document data.

## Acceptance metrics

- Real server uploads remain `0`.
- Real checkout remains `0`.
- Free local PDF output remains complete.

## Dashboard backlog

- OCR provider gate.
- Batch processing gate.
- Document retention matrix.
