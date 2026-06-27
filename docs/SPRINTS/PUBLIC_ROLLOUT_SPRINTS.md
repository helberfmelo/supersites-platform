# Public Rollout Sprints

Data-base: 2026-06-27

## Numbering

Fase 7 - Benchmark-Driven Refinement is complete through Sprint 7.12.
The next mapped phase is therefore Fase 8 - Public Rollout e Production Visibility.

## Sprint map

| Symbol | Sprint | Scope | Status |
|---|---:|---|---|
| PROD-ROADMAP | Sprint 8.1 | Roadmap, gates and production rollout documentation | Completed |
| PROD-STATIC-FRAMEWORK | Sprint 8.2 | Generic HostGator static deploy framework for remaining Nuxt apps | Completed |
| PROD-BATCH-A | Sprint 8.3 | Publish CalcHarbor, DevUtility Lab and TimeNexus | Completed |
| PROD-BATCH-B | Sprint 8.4 | Publish QRRoute, InvoiceCraft, MailHealth and SitePulse Lab | Completed |
| PROD-BATCH-C | Sprint 8.5 | Publish PixelBatch and DocShift | Completed |
| PROD-CLOSURE | Sprint 8.6 | Public smoke consolidation, docs closure and remaining operations gates | Planned |

## Production guardrails

- Public deploys in this phase are limited to reversible HostGator static app releases under `/supersites/<app>/`.
- Do not enable AdSense, GTM, GA4, Search Console imports, affiliate links, donations, checkout, billing, paid APIs, external AI providers, upload storage, workers/crons or recurring monitors in this phase.
- Each app must publish into a new versioned remote release folder.
- The active public app must switch via a managed `.htaccess` in the app folder.
- The bootstrap placeholder must remain recoverable through `rollback-placeholder`.
- A previous app release must remain recoverable through `rollback-release`.
- Public smoke must prove the app is no longer the bootstrap placeholder, has no `noindex`, serves `_nuxt` assets over HTTPS and exposes the expected tool/content markers.
- Secrets must remain in GitHub environments or ignored local credential inventory only.
- Direct root paths such as `https://opentshost.com/calcharbor/` remain out of scope until a separate rewrite/domain decision is made.

## Acceptance by sprint

### Sprint 8.1

- Fase 8 is added to `docs/ROADMAP.md`.
- This sprint map is created.
- `docs/STATUS.md` and `docs/METRICS.md` record the production visibility gap and rollout plan.
- Local documentation gates pass.
- Commit, push and docs-only Quality Gate are monitored.

### Sprint 8.2

- A generic HostGator static deployment path exists for non-NetProbe Nuxt SSG apps.
- Artifact validation is driven by `infra/deployment/apps.json` and per-app content markers.
- Public smoke can target any static app by app id.
- A manual GitHub workflow can deploy, rollback to release and rollback to placeholder for each supported app id.
- Local artifact gates pass for all nine placeholder apps before any traffic switch.

### Sprint 8.3

- CalcHarbor, DevUtility Lab and TimeNexus are deployed as real Nuxt static apps under `/supersites/<app>/`.
- Public smokes pass for all three apps.
- Rollback commands and release IDs are recorded.

### Sprint 8.4

- QRRoute, InvoiceCraft, MailHealth and SitePulse Lab are deployed as real Nuxt static apps under `/supersites/<app>/`.
- Public smokes pass for all four apps.
- Endpoint-backed tools remain bounded and antiabuse controls remain unchanged.
- Rollback commands and release IDs are recorded.

### Sprint 8.5

- PixelBatch and DocShift are deployed as real Nuxt static apps under `/supersites/<app>/`.
- Public smokes pass for both apps.
- Browser-side processing remains local; no upload/storage/OCR server path is activated.
- Rollback commands and release IDs are recorded.
- Completed with `Deploy Static App HostGator` runs `28295611998` and `28295818189`; releases `a04d21d9a4a4989825da41c26859abaf84ccddce-28295611998-1` and `a04d21d9a4a4989825da41c26859abaf84ccddce-28295818189-1`.

### Sprint 8.6

- Consolidated public smoke status is recorded for Hub, control-plane/API, NetProbe and all nine newly published apps.
- Remaining operations and human gates are explicitly separated from the completed public rollout.
- Docs-only Quality Gate passes.
