# Benchmark Execution Status

Data-base: 2026-06-27

## Current block

- Real phase: Fase 7 - Benchmark-Driven Refinement.
- Current sprint: Sprint 7.12 - DocShift benchmark UX.
- Symbolic sprint: BR-DOCSHIFT.
- Scope: PDF/document UX refinement with dropzone clarity, file states, result/download, privacy, related tools and gated OCR/server/batch messaging.
- Previous sprint completed: Sprint 7.11 - PixelBatch benchmark UX, including docs-only Quality Gate `28290486528`.

## Pre-sprint state

- Git branch: `main`.
- Latest completed commit before this sprint: `fbea050 feat: refine pixelbatch benchmark ux`.
- Recent CI state: Quality Gate `28290373756` and Deploy Dry Run `28290373766` passed for PixelBatch benchmark refinement.
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
| 7.3 | BR-NETPROBE | Completed | DNS/IP benchmark UX refined and public NetProbe smokes pass |
| 7.4 | BR-CALCHARBOR | Completed | Calculator UX/content refined in local/CI, public deploy still gated |
| 7.5 | BR-DEVUTILITY | Completed | Developer tool UX/content refined in local/CI, public deploy still gated |
| 7.6 | BR-TIMENEXUS | Completed | Time/date UX/content refined in local/CI, public deploy still gated |
| 7.7 | BR-QRROUTE | Completed | QR/UTM UX/content refined in local/CI, dynamic links still gated |
| 7.8 | BR-INVOICECRAFT | Completed | Invoice/quote/receipt UX/content refined in local/CI, taxes/payments gated |
| 7.9 | BR-MAILHEALTH | Completed | Email diagnostic UX/content refined in local/CI, monitoring/API gated |
| 7.10 | BR-SITEPULSE | Completed | Web diagnostic UX/content refined in local/CI, uptime workers gated |
| 7.11 | BR-PIXELBATCH | Completed | Image UX/content refined in local/CI, server/batch/AI gated |
| 7.12 | BR-DOCSHIFT | Local validation passed | PDF UX/content refined locally, OCR/server/batch gated; remote CI pending |

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

Sprint 7.3 local validation passed:

- `pnpm --filter @supersites/netprobe-atlas test`
- `pnpm --filter @supersites/netprobe-atlas build`
- `pnpm validate:netprobe-preview`
- `pnpm test:e2e:netprobe`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- Desktop/mobile NetProbe screenshots captured and inspected under `artifacts/`.

Sprint 7.3 remote validation:

- Feature commit: `dcb4005 feat: refine netprobe benchmark ux`.
- Quality Gate: `28286547715`, success.
- Deploy Dry Run: `28286547705`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push.
- Closing docs commit: `e434ea8 docs: record netprobe benchmark ci validation`.
- Closing docs-only Quality Gate: `28286684290`, success.

Sprint 7.4 local validation passed:

- `pnpm --filter @supersites/calcharbor test`
- `pnpm --filter @supersites/calcharbor build`
- `pnpm validate:calcharbor-preview`
- `pnpm test:e2e:calcharbor`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- Desktop/mobile CalcHarbor screenshots captured and inspected under `artifacts/`.

Sprint 7.4 remote validation:

- Feature commit: `17774eb feat: refine calcharbor benchmark ux`.
- Quality Gate: `28286999292`, success.
- Deploy Dry Run: `28286999285`, success with non-blocking artifact upload quota annotation.
- Public smokes: Hub, control-plane/API and NetProbe passed after push.

Sprint 7.5 local validation passed:

- `pnpm test:devutility`
- `pnpm build:devutility`
- `pnpm validate:devutility-preview`
- `pnpm test:e2e:devutility`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check` (CRLF warnings only)
- DevUtility Playwright screenshots inspected under `artifacts/playwright-devutility-report/data/`.

Sprint 7.5 remote validation:

- Feature commit: `e006928 feat: refine devutility benchmark ux`.
- Quality Gate: `28287478977`, success.
- Deploy Dry Run: `28287478989`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push.

Sprint 7.6 local validation passed:

- `pnpm test:timenexus`
- `pnpm build:timenexus`
- `pnpm validate:timenexus-preview`
- `pnpm test:e2e:timenexus` (first run hit transient `EADDRINUSE` from the preview port; rerun passed after the port released)
- TimeNexus Playwright screenshots inspected under `artifacts/playwright-timenexus-report/data/`.

Sprint 7.6 remote validation:

- Feature commit: `64b883d feat: refine timenexus benchmark ux`.
- Quality Gate: `28287972198`, success.
- Deploy Dry Run: `28287972209`, success with non-blocking artifact upload quota annotation.
- Public smokes: Hub, control-plane/API and NetProbe passed after push; TimeNexus remains public placeholder pending app-specific deploy/smoke/rollback gates.

Sprint 7.7 local validation passed:

- `pnpm test:qrroute`
- `pnpm build:qrroute`
- `pnpm validate:qrroute-preview`
- `pnpm test:e2e:qrroute`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- QRRoute Playwright screenshots inspected under `artifacts/playwright-qrroute-report/data/`.

Sprint 7.7 remote validation:

- Feature commit: `d257a68 feat: refine qrroute benchmark ux`.
- Quality Gate: `28288511784`, success.
- Deploy Dry Run: `28288511790`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push; QRRoute remains public placeholder pending app-specific deploy/smoke/rollback gates.
- Closing docs commit: `e9940ec docs: record qrroute benchmark ci validation`.
- Closing docs-only Quality Gate: `28288623698`, success.

Sprint 7.8 local validation passed:

- `pnpm test:invoicecraft`
- `pnpm build:invoicecraft`
- `pnpm validate:invoicecraft-preview`
- `pnpm test:e2e:invoicecraft`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- InvoiceCraft Playwright screenshots inspected under `artifacts/playwright-invoicecraft-report/data/`.

Sprint 7.8 remote validation:

- Feature commit: `d47bfe2 feat: refine invoicecraft benchmark ux`.
- Quality Gate: `28288971344`, success.
- Deploy Dry Run: `28288971346`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push; InvoiceCraft remains public placeholder pending app-specific deploy/smoke/rollback gates.
- Closing docs commit: `872d957 docs: record invoicecraft benchmark ci validation`.
- Closing docs-only Quality Gate: `28289084637`, success.

Sprint 7.9 local validation passed:

- `pnpm test:mailhealth`
- `pnpm build:mailhealth`
- `pnpm validate:mailhealth-preview`
- `pnpm test:e2e:mailhealth`
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`
- MailHealth Playwright screenshots inspected under `artifacts/playwright-mailhealth-report/data/`.
Sprint 7.9 remote validation:

- Feature commit: `b451479 feat: refine mailhealth benchmark ux`.
- Quality Gate: `28289435994`, success.
- Deploy Dry Run: `28289435995`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push; MailHealth remains public placeholder pending app-specific deploy/smoke/rollback gates.
- Closing docs commit: `e75a076 docs: record mailhealth benchmark ci validation`.
- Closing docs-only Quality Gate: `28289517336`, success.

Sprint 7.10 local validation passed:

- `pnpm test:sitepulse`
- `pnpm build:sitepulse`
- `pnpm validate:sitepulse-preview`
- `pnpm test:e2e:sitepulse` (first run hit transient `EADDRINUSE` from the preview port; rerun passed after the port released)
- SitePulse Playwright screenshots inspected under `artifacts/playwright-sitepulse-report/data/`.
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`

Sprint 7.10 remote validation:

- Feature commit: `922bf44 feat: refine sitepulse benchmark ux`.
- Quality Gate: `28289874584`, success.
- Deploy Dry Run: `28289874575`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push; SitePulse Lab remains public placeholder pending app-specific deploy/smoke/rollback gates.
- Closing docs commit: `408932a docs: record sitepulse benchmark ci validation`.
- Closing docs-only Quality Gate: `28289986575`, success.

Sprint 7.11 local validation passed:

- `pnpm test:pixelbatch`
- `pnpm build:pixelbatch`
- `pnpm validate:pixelbatch-preview`
- `pnpm test:e2e:pixelbatch` (first run hit transient `EADDRINUSE` from the preview port; rerun passed after the port released)
- PixelBatch Playwright screenshots inspected under `artifacts/playwright-pixelbatch-report/data/`.
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`

Sprint 7.11 remote validation:

- Feature commit: `fbea050 feat: refine pixelbatch benchmark ux`.
- Quality Gate: `28290373756`, success.
- Deploy Dry Run: `28290373766`, success.
- Public smokes: Hub, control-plane/API and NetProbe passed after push; PixelBatch remains public placeholder pending app-specific deploy/smoke/rollback gates.
- Closing docs commit: `160db49 docs: record pixelbatch benchmark ci validation`.
- Closing docs-only Quality Gate: `28290486528`, success.

Sprint 7.12 local validation passed:

- `pnpm test:docshift`
- `pnpm build:docshift`
- `pnpm validate:docshift-preview`
- `pnpm test:e2e:docshift`
- DocShift Playwright screenshots inspected under `artifacts/playwright-docshift-report/data/`.
- `pnpm validate:structure`
- `pnpm validate:secrets`
- `pnpm deploy:dry-run`
- `pnpm ci:changes` (local runAll fallback expected because no base was provided)
- `git diff --check`

Sprint 7.12 remote validation:

- Feature commit: pending.
- Quality Gate: pending.
- Deploy Dry Run: pending.
- Public smokes: pending; DocShift remains public placeholder pending app-specific deploy/smoke/rollback gates.
