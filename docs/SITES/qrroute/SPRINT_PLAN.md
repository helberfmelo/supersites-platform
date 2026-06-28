# QRRoute Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-QRROUTE.
- Real number: Sprint 7.7.
- Must run after: Sprint 7.6.

## Current state

- Nuxt SSG app exists with six browser-side QR/barcode/UTM tools and five locales.
- Control-plane has gated redirect-service foundation.
- Public URL is a live Nuxt static app at `https://opentshost.com/supersites/qrroute/` since Fase 8, with app-specific deploy/smoke/rollback available through `Deploy Static App HostGator`.
- Sprint 9.6 is the current benchmark-grade follow-up for a tool-first generator and production rollout.

## Scope

- Type-tab and preview UX refinement.
- Static vs dynamic education.
- SEO/AIO and inert monetization/support structure.

## Validation

- `pnpm test:qrroute`
- `pnpm build:qrroute`
- `pnpm validate:qrroute-preview`
- `pnpm test:e2e:qrroute`
- Backend tests if redirect module changes.
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No public short-link creation or analytics.
- No custom domains, paid API, checkout or ad serving.
- No analytics values from URLs, Wi-Fi passwords, vCards or payloads.

## Sprint 7.7 local implementation note

- Added type tabs, final payload summary, local preview/download/copy affordances, static vs dynamic education, examples, related tools and gated upgrade/support copy.
- Local validation passed with `pnpm test:qrroute`, `pnpm build:qrroute`, `pnpm validate:qrroute-preview`, `pnpm test:e2e:qrroute`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.
- Remote Quality Gate `28288511784`, Deploy Dry Run `28288511790` and public Hub/control-plane/NetProbe smokes passed before Sprint 7.8.

## Sprint 9.6 benchmark-grade implementation note

- Added `QRRouteWorkbench` as the shared above-fold generator for the home and tool detail pages.
- The workbench includes QR/barcode/UTM/vCard/Wi-Fi/preview tabs, dominant SVG preview, payload summary, output copy/download, local privacy strip and inert dynamic/paid workflow panel.
- Tool detail pages now reuse the same workbench with the selected slug while preserving related tools, guide, FAQ, canonical/hreflang and schema.
- Local validation passed with `pnpm test:qrroute`, `pnpm build:qrroute`, `pnpm validate:qrroute-preview`, `pnpm test:e2e:qrroute`, `pnpm typecheck:packages`, `pnpm test:packages`, `pnpm validate:public-copy`, `pnpm validate:structure`, `pnpm validate:secrets` and `pnpm deploy:dry-run`.
- Production deploy and public smoke evidence will be recorded after the Sprint 9.6 feature commit and Fase 9/Sprint 9.6 deploy run.
