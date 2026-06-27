# QRRoute

Sprint 4.1 MVP for browser-side QR, barcode, UTM, vCard, Wi-Fi and preview workflows.

## Current scope

- Nuxt SSG app with localized routes for `en`, `pt-br`, `es`, `fr` and `de`.
- Free tools run without mandatory signup:
  - static QR code generator;
  - Code 128 barcode generator;
  - UTM builder;
  - vCard QR builder;
  - Wi-Fi QR builder;
  - QR preview lab.
- QR and barcode previews render locally as SVG data URLs.
- Tool analytics are limited to `tool_slug`, locale and safe route path.

## Gated scope

Dynamic QR, short links, scan/click analytics, custom domains, batches, teams, API, billing, ads and external analytics are not active in this sprint.

Public traffic remains on the HostGator placeholder until QRRoute receives app-specific artifact validation, public smoke and rollback/traffic-switch workflows.
