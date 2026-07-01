# QRRoute Sprint Plan

Data-base: 2026-06-30

## Real sprint

- Symbol: BR-QRROUTE.
- Real number: Sprint 7.7.
- Must run after: Sprint 7.6.

## Current state

- Nuxt SSG app exists with six browser-side QR/barcode/UTM tools and five locales.
- Control-plane has gated redirect-service foundation.
- Public URL is a live Nuxt static app at `https://opentshost.com/supersites/qrroute/` since Fase 8, with app-specific deploy/smoke/rollback available through `Deploy Static App HostGator`.
- Sprint 18.53-18.59 is the current benchmark-grade follow-up for live specialized QRRoute tool workflows.

## Scope

- Type-tab and preview UX refinement.
- Static vs dynamic education.
- SEO/AIO and inert monetization/support structure.

## Validation

- `pnpm test:qrroute`
- `pnpm build:qrroute`
- `pnpm validate:qrroute-preview`
- `pnpm validate:public-copy`
- `git diff --check`
- `pnpm test:e2e:qrroute` only when the owner asks or the remote Quality Gate exposes a frontend regression.
- Backend tests if redirect module changes.
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No public short-link creation or analytics.
- No custom domains, paid API, checkout or ad serving.
- No analytics values from URLs, Wi-Fi passwords, vCards or payloads.

## Sprint 18.53-18.59 implementation note

- Refined the shared workbench into specialized local workflows for static QR, barcode, UTM, vCard, Wi-Fi and QR preview inspection.
- Static QR now auto-renders from URL/text/email/phone modes, keeps safe URL validation, exposes optional labels and offers SVG, PNG, copy and print actions.
- Barcode now renders Code 128 previews with label and size controls plus SVG/PNG output while preserving printable ASCII validation.
- UTM, vCard and Wi-Fi now use structured fields; UTM includes campaign presets, vCard previews the generated contact payload, and Wi-Fi includes encryption, hidden-network and show/hide password controls.
- QR Preview Lab now reports payload type, scheme, size, destination and risk notes with a local QR preview.
- Home copy removed top-level internal/commercial status wording, added contextual QR/barcode/UTM/guide footer links and an inert support block with no payment provider.
- Local validation passed with `pnpm test:qrroute`, `pnpm build:qrroute`, `pnpm validate:qrroute-preview`, `pnpm validate:public-copy` and `git diff --check`.

## Sprint 7.7 local implementation note

- Added type tabs, final payload summary, local preview/download/copy affordances, static vs dynamic education, examples, related tools and gated upgrade/support copy.
- Local validation passed with `pnpm test:qrroute`, `pnpm build:qrroute`, `pnpm validate:qrroute-preview`, `pnpm test:e2e:qrroute`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.
- Remote Quality Gate `28288511784`, Deploy Dry Run `28288511790` and public Hub/control-plane/NetProbe smokes passed before Sprint 7.8.

## Sprint 9.6 benchmark-grade implementation note

- Added `QRRouteWorkbench` as the shared above-fold generator for the home and tool detail pages.
- The workbench includes QR/barcode/UTM/vCard/Wi-Fi/preview tabs, dominant SVG preview, payload summary, output copy/download, local privacy strip and inert dynamic/paid workflow panel.
- Tool detail pages now reuse the same workbench with the selected slug while preserving related tools, guide, FAQ, canonical/hreflang and schema.
- Local validation passed with `pnpm test:qrroute`, `pnpm build:qrroute`, `pnpm validate:qrroute-preview`, `pnpm test:e2e:qrroute`, `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.
- Production evidence: feature commit `a6562c3`, Quality Gate `28317041432`, Deploy Dry Run `28317041430`, QRRoute deploy `28317125920`, release `a6562c308416f693dd2a9bd15294a72f6a7f319b-28317125920-1`, public asset `https://opentshost.com/supersites/qrroute/_nuxt/COqZLQg5.js`, QRRoute/Hub/control-plane smokes and live QRRoute home/UTM UX smoke passed.
