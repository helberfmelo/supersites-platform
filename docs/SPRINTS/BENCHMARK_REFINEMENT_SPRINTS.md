# Benchmark-Driven Refinement Sprints

Data-base: 2026-06-27

## Numbering decision

`docs/ROADMAP.md` currently maps Fase 0 through Fase 6. The last mapped sprint is Sprint 6.6 - Executive reports, and `docs/STATUS.md` records it as completed with Quality Gate `28285130303`, Deploy Dry Run `28285130307` and docs-only Quality Gate `28285226540`.

There is no earlier numbered sprint still pending in the roadmap. Operational blockers remain for public deploys, domains, AdSense, billing, providers and production workers, but they are gates, not skipped roadmap sprints.

The benchmark block is therefore mapped as Fase 7 - Benchmark-Driven Refinement.

## Symbolic to real sprint mapping

| Symbolic sprint | Real sprint | Scope | Status |
|---|---:|---|---|
| BR-ROADMAP | Sprint 7.1 | Roadmap, benchmark matrix, per-site plans and readiness KPIs | Completed; closing docs commit pending |
| BR-SUPERSITE | Sprint 7.2 | Supersite catalog and growth dashboard refinement | Planned |
| BR-NETPROBE | Sprint 7.3 | NetProbe DNS/IP benchmark UX refinement | Planned |
| BR-CALCHARBOR | Sprint 7.4 | CalcHarbor calculator benchmark UX refinement | Planned |
| BR-DEVUTILITY | Sprint 7.5 | DevUtility Lab developer-tool UX refinement | Planned |
| BR-TIMENEXUS | Sprint 7.6 | TimeNexus time/date benchmark UX refinement | Planned |
| BR-QRROUTE | Sprint 7.7 | QRRoute QR/barcode/UTM/link UX refinement | Planned |
| BR-INVOICECRAFT | Sprint 7.8 | InvoiceCraft document-builder UX refinement | Planned |
| BR-MAILHEALTH | Sprint 7.9 | MailHealth deliverability diagnostic UX refinement | Planned |
| BR-SITEPULSE | Sprint 7.10 | SitePulse Lab status/performance/security UX refinement | Planned |
| BR-PIXELBATCH | Sprint 7.11 | PixelBatch image-processing UX refinement | Planned |
| BR-DOCSHIFT | Sprint 7.12 | DocShift PDF/document UX refinement | Planned |

## Sprint 7.1 acceptance

Sprint 7.1 is documentation-only and must finish before code changes in this block.

Required outputs:

- `docs/ROADMAP.md` updated with Fase 7.
- `docs/STATUS.md` updated with numbering, benchmark state and risk.
- `docs/METRICS.md` updated with benchmark-readiness KPIs.
- `docs/SPRINTS/BENCHMARK_REFINEMENT_SPRINTS.md` created.
- `docs/BENCHMARK_MATRIX.md` created.
- `docs/BENCHMARK_EXECUTION_STATUS.md` created.
- `docs/SUPERSITE_DASHBOARD_REFINEMENT_PLAN.md` created.
- Per-site planning docs created under `docs/SITES/<site>/`.
- Existing benchmark prompt and screenshots incorporated into the docs commit.
- No real ads, billing, checkout, donations, affiliates, provider imports, workers, public traffic switch or external analytics activated.

## Per-sprint execution rules

Each real sprint in Fase 7 must:

1. Reread the mandatory docs from `AGENTS.md` and this sprint map.
2. Confirm no previous Fase 7 sprint remains pending.
3. Reuse existing Nuxt/Laravel/package patterns.
4. Keep free tools complete without mandatory signup.
5. Keep AdSense, donation, affiliate and paid upgrade surfaces gated and inert unless a future human-approved playbook opens them.
6. Run targeted tests first, then build/preview/Playwright when frontend changes.
7. Run `validate:structure`, `validate:secrets`, `deploy:dry-run`, `ci:changes` and `git diff --check` when applicable.
8. Update status, metrics and affected site docs in the same delivery.
9. Commit, push and monitor Quality Gate and Deploy Dry Run.
10. Run public smokes only for public surfaces that already have approved deploys.

## Cross-cutting gates

- Public real deploys are currently active only for the SuperSites Hub, the control-plane/API and NetProbe Atlas.
- CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch and DocShift remain public placeholders until app-specific HostGator artifact validation, smoke and rollback exist.
- AdSense, GA4/GTM/Search Console imports, billing, paid entitlements, donation payments, affiliate links, AI providers and recurring workers remain disabled.
- Human actions stay in `docs/HUMAN_ACTION_REQUIRED.md`.
