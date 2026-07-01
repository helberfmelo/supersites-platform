# QRRoute Frontend Refinement Plan

Data-base: 2026-06-30

## Objective

Make static QR, barcode, UTM, vCard, Wi-Fi and preview workflows feel immediate, trustworthy and safe.

## P0

- Done in Sprint 9.6: shared tool-first workbench with QR/barcode/UTM/vCard/Wi-Fi/preview tabs and concise field sets.
- Done in Sprint 9.6: dominant local SVG preview, download and copy affordances on the home and tool pages.
- Done in Sprint 9.6: static vs dynamic explanation next to the inert upgrade panel.
- Done in Sprint 9.6: UTM final URL preview, payload summary and copy state preserved in the unified workbench.
- Done in Sprint 9.6: related tools remain below the workbench on detail pages, while the home catalog stays available after the generator.
- Done in Sprint 18.7: Hub catalog route opens as a task-first QRRoute landing with a live static preview, asset-type navigation, search/filter controls, direct links to the 6 public QRRoute tools and contextual footer links.
- Done in Sprint 18.53-18.59: QRRoute app workbench now auto-renders local previews, supports SVG/PNG/copy/print actions, uses structured UTM/vCard/Wi-Fi fields, includes barcode label/size controls and gives Preview Lab scheme/size/risk/destination diagnostics.
- Done in Sprint 18.53-18.59: home top copy removed residual internal/commercial status wording, added QR/barcode/UTM/guide footer links and kept support/donation UI inert with no provider link.

## P1

- Add safe custom-style controls without breaking scan reliability.
- Add more examples for common QR payloads beyond the current safe samples and UTM presets.

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
- Sprint 9.6 local Playwright confirmed home desktop generation, UTM mobile generation, localized mobile pages and no horizontal overflow.
- Sprint 18.7 live Hub catalog validation passed with desktop/mobile screenshots, 12 EN/PT-BR deep links, QRRoute static app smoke, public copy scan, AdSense-safe scan and benchmark quick crawler 0 gaps.
- Sprint 18.53-18.59 local validation passed with QRRoute unit tests, Nuxt build, QRRoute preview smoke, public copy scan over 951 HTML files and `git diff --check`.

## Dashboard backlog

- Static QR UX readiness.
- Dynamic QR gate.
- Short-link abuse/takedown readiness.
