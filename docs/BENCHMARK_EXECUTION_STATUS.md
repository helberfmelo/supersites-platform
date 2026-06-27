# Benchmark Execution Status

Data-base: 2026-06-27

## Current block

- Real phase: Fase 7 - Benchmark-Driven Refinement.
- Current sprint: Sprint 7.3 - NetProbe Atlas benchmark UX.
- Symbolic sprint: BR-NETPROBE.
- Scope: DNS propagation and What is my IP result UX, safe copy/export affordances, related paths and gated upgrade messaging.
- Previous sprint completed: Sprint 7.2 - SuperSites catalog and dashboard refinement.

## Pre-sprint state

- Git branch: `main`.
- Latest completed commit before this block: `36efe77 docs: record executive reports ci validation`.
- Recent CI state: Quality Gate `28285226540` passed for the docs-only Executive Reports closing commit.
- Public live surfaces: SuperSites Hub, control-plane/API and NetProbe Atlas.
- Public placeholder surfaces: CalcHarbor, DevUtility Lab, TimeNexus, QRRoute, InvoiceCraft, MailHealth, SitePulse Lab, PixelBatch and DocShift.
- External activations: zero real ads, zero real billing, zero checkout, zero provider AI, zero GA4/GTM/Search Console imports, zero AdSense serving and zero production workers for this block.

## Benchmark assets

| Asset | Status | Notes |
|---|---|---|
| `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md` | Present; incorporated into this sprint | Canonical benchmark prompt for the refinement block |
| `docs/benchmarks/screenshots/whatsmydns_dns_propagation.png` | Present; reviewed | DNS propagation table, map, education and footer pattern |
| `docs/benchmarks/screenshots/whatismyip_com_br.png` | Present; reviewed | Direct IP answer pattern; avoid dated visual/ad density |
| `docs/benchmarks/screenshots/whatismyipaddress_pt_meu_ip.png` | Present; reviewed | IP card/map/tool-grid pattern; avoid aggressive monetization |

## Sprint queue

| Sprint | Symbol | Status | Exit criteria |
|---:|---|---|---|
| 7.1 | BR-ROADMAP | Completed | Docs created, committed, pushed and docs-only Quality Gate recorded |
| 7.2 | BR-SUPERSITE | Completed | Hub/control-plane benchmark dashboard refined and validated |
| 7.3 | BR-NETPROBE | Planned next | DNS/IP benchmark UX refined and public NetProbe smokes pass |
| 7.4 | BR-CALCHARBOR | Planned | Calculator UX/content refined in local/CI, public deploy still gated |
| 7.5 | BR-DEVUTILITY | Planned | Developer tool UX/content refined in local/CI, public deploy still gated |
| 7.6 | BR-TIMENEXUS | Planned | Time/date UX/content refined in local/CI, public deploy still gated |
| 7.7 | BR-QRROUTE | Planned | QR/UTM UX/content refined in local/CI, dynamic links still gated |
| 7.8 | BR-INVOICECRAFT | Planned | Invoice/quote/receipt UX/content refined in local/CI, taxes/payments gated |
| 7.9 | BR-MAILHEALTH | Planned | Email diagnostic UX/content refined in local/CI, monitoring/API gated |
| 7.10 | BR-SITEPULSE | Planned | Web diagnostic UX/content refined in local/CI, uptime workers gated |
| 7.11 | BR-PIXELBATCH | Planned | Image UX/content refined in local/CI, server/batch/AI gated |
| 7.12 | BR-DOCSHIFT | Planned | PDF UX/content refined in local/CI, OCR/server/batch gated |

## Non-copying controls

- Use benchmark screenshots only for internal learning and planning.
- Do not embed benchmark images into public app UI.
- Do not copy benchmark text, palette, iconography, layout, code or legal copy.
- Document learning as patterns: hierarchy, workflow, result structure, education, internal linking and safe monetization.

## Open risks

- Public placeholders for nine apps mean benchmark refinements for those sites will validate in local/CI until app-specific deploy gates are built.
- Real PageSpeed/GTmetrix measurements require public non-placeholder deploys; local Lighthouse/preview checks are the interim gate.
- External benchmark availability can change; technical sprints should refresh live observations when network access is needed.
- Donations and affiliates require human approval before real links or payment providers are configured.

## Local validation

Sprint 7.1 local docs-only validation passed:

- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- `git diff --cached --check`

Remote validation:

- Commit: `2e6e0be docs: add benchmark refinement sprint plan`.
- Quality Gate: `28285643895`, success.
- Deploy Dry Run workflow: not triggered by docs-only push; local `pnpm deploy:dry-run` passed.
- Public smokes: Hub, control-plane/API and NetProbe passed after push.
- Closing docs commit: `daba393 docs: record benchmark refinement ci validation`.
- Closing docs-only Quality Gate: `28285708661`, success.

Sprint 7.2 local validation passed:

- `composer validate --strict`
- `php artisan migrate:fresh --seed --force`
- `php artisan test --filter=AdminPanelTest`
- `php artisan test`
- `pnpm --filter @supersites/supersite test`
- `pnpm --filter @supersites/supersite build`
- `pnpm validate:supersite-preview`
- `pnpm test:e2e:supersite`
- `pnpm test:packages`
- `pnpm typecheck:packages`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- Desktop/mobile Hub screenshots captured and inspected under `artifacts/`.

Sprint 7.2 remote validation:

- Feature commit: `e63e110 feat: add benchmark refinement dashboard`.
- Quality Gate: `28286110806`, success.
- Deploy Dry Run: `28286110802`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push.
- Closing docs commit: `dc33adc docs: record supersite benchmark ci validation`.
- Closing docs-only Quality Gate: `28286232069`, success.
