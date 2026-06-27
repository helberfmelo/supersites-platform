# PixelBatch Monetization Refinement Plan

Data-base: 2026-06-27

## References

- TinyPNG API upsell.
- remove.bg credits/API.
- iLoveIMG batch/premium patterns.

## P0

- Add gated CTAs for batch, high-resolution, presets, API, ecommerce integrations and ad-free use.
- Keep one-image browser processing free.
- Keep ads/support away from dropzone, progress, previews and download actions.

## P1

- Define paid quotas for file size, batch count, presets and API.
- Add data-governance backlog for any server-side processing.

## P2

- Activate server upload, AI or API only after sandbox, retention, billing and provider gates.

## Impact expected

Clear upgrade path for volume/ecommerce use while preserving privacy-first free tools.

## Technical risk

High for future server-side/AI processing; low for inert CTAs.

## AdSense/compliance risk

Medium due to uploads and previews. Keep monetization separated.

## Tests needed

- Verify no upload endpoint, checkout, ad script or payment link.
- Verify analytics excludes file data.

## Acceptance metrics

- Real server uploads remain `0`.
- Real checkout remains `0`.
- Free browser output remains complete.

## Dashboard backlog

- Batch processing gate.
- AI/provider cost gate.
- Upload retention matrix.

## Sprint 7.11 execution notes

- Batch, folders, saved presets, API, integrations, high-resolution jobs and AI/background-removal providers remain gated/inert upgrade messaging.
- Free one-image browser processing remains complete without signup.
- No upload endpoint, checkout, billing provider, ad serving, donation/support payment, affiliate link or paid API was activated.
