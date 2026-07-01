# QRRoute Benchmark Notes

Data-base: 2026-06-30

## References

- TinyURL
- ME-QR
- QR Code Generator
- UTM builders and link-management tools listed in the benchmark prompt

## Screenshots available

- Sprint 9.6 Playwright screenshots are available in `artifacts/playwright-qrroute-report/data/` for home desktop, UTM mobile and privacy mobile.
- Sprint 18.7 Hub catalog screenshots are available in `artifacts/qrroute-catalog-qa/qrroute-catalog-live-desktop.png` and `artifacts/qrroute-catalog-qa/qrroute-catalog-live-mobile-pt-br.png`.

## Useful patterns to learn

- QR creation should show type tabs and live preview immediately.
- Users need a clear distinction between static QR and dynamic QR.
- Download PNG/SVG actions should be obvious.
- UTM builders benefit from final URL preview and copy action.
- Short links require antiabuse, reporting and takedown controls before public launch.

## Do not copy

- QR vendor templates, visual identity, sample content, icons, pricing claims or dynamic QR copy.

## Opportunities

- Sprint 9.6 delivered tabs by payload type and a dominant local preview area.
- Sprint 9.6 preserved UTM final URL preview, payload validation and safe copy/download controls.
- Sprint 18.7 converted the Hub catalog detail into a public QRRoute landing: preview first, asset-type grouping, six real tool links, search/filter and contextual deep-link footer.
- Sprint 18.53-18.59 converted the QRRoute app workbench from generic textareas into task-specific builders: live static QR preview, SVG/PNG/copy/print output, barcode label/size controls, structured UTM/vCard/Wi-Fi fields, campaign presets, password visibility control and Preview Lab diagnostics.
- Sprint 18.53-18.59 also removed residual top-level internal/commercial status wording from the app home and added contextual QR/barcode/UTM/guide footer links plus an inert support block without payment provider activation.
- Dynamic QR, short links, analytics, custom domains and batch remain gated backlog until antiabuse, takedown, billing and privacy gates are approved.
