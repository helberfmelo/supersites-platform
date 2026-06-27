# QRRoute Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Make static QR, barcode, UTM, vCard, Wi-Fi and preview workflows feel immediate, trustworthy and safe.

## P0

- Add type tabs with concise field sets.
- Improve live SVG preview and download affordances.
- Add static vs dynamic explanation next to the upgrade CTA.
- Improve UTM final URL preview and copy state.
- Add related tools between QR, UTM, barcode and preview.

## P1

- Add safe custom-style controls without breaking scan reliability.
- Add examples for common QR payloads.

## P2

- Prepare dynamic QR, short links, analytics, custom domain, batch and API as gated paid backlog.

## Impact expected

Better conversion from one-off QR creation into future dynamic QR/analytics interest.

## Technical risk

Medium because payload validation, QR readability and mobile preview sizing need care.

## AdSense/compliance risk

Medium. Ads/support must stay away from URL fields, QR preview, download buttons and copy actions.

## Tests needed

- QRRoute unit tests/build.
- Preview smoke and Playwright.
- Redirect guard tests if redirect logic changes.

## Acceptance metrics

- Static QR remains free and complete without signup.
- No payload goes to analytics/backend.
- Preview does not overflow mobile.

## Dashboard backlog

- Static QR UX readiness.
- Dynamic QR gate.
- Short-link abuse/takedown readiness.
