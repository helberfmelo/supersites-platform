# SuperSites Hub Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Refine the Hub and control-plane surfaces so operators can scan portfolio quality, benchmark readiness, SEO/AIO gaps and monetization gates quickly.

## P0

- Improve catalog cards with site value, status, language coverage, tool count and primary action. Done in Sprint 7.2.
- Add admin benchmark readiness overview per site. Done in Sprint 7.2.
- Add admin opportunity backlog with priority, impact, effort, confidence, risk and gate status. Done in Sprint 7.2.
- Add a visual Hub discovery block with top public tools, preview frames and workflow clusters before catalog filters. Done in production in Sprint 9.15.
- Add direct localized shortcuts to high-intent free tools above the catalog, aligned to benchmark utility directories. Done in production in Phase 18 Sprint 18.2.
- Replace the public Hub first fold with a real tool finder: search, category filters, direct free tool cards and no operational status/preview/upgrade badges in the main experience. Corrective Phase 18 benchmark-grade sprint in progress on 2026-06-30.
- Replace footer chips/buttons with benchmark-style text menus in columns, using deep links to public tools/subpages instead of only linking product home pages. Done in production in Phase 18 Sprint 18.2c.
- Tune footer typography so column menu links are light and compact at rest, while hover gains weight/scale without underline. Done in production in Phase 18 Sprint 18.2d.
- Convert benchmark-grade catalog detail routes into public landing pages when required by the sprint, starting with NetProbe Atlas network/DNS/IP in Phase 18 Sprint 18.3. Done in production with deploy `28422499578`, public smoke, crawler quick and live desktop/mobile route checks.
- Convert CalcHarbor's catalog detail route into a benchmark-grade calculator landing with search, categories, highlighted real calculators and non-linked future topics. Done in production in Phase 18 Sprint 18.4 with Hub deploy `28424159062`, CalcHarbor deploy `28424625903`, public smoke and crawler quick 0 gaps.
- Convert DevUtility Lab's catalog detail route into a benchmark-grade developer workbench directory with search, category filters, pinned shortcuts and links to existing public tools. Implemented locally in Phase 18 Sprint 18.5; CI/deploy pending.
- Convert institutional pages when their sprint arrives so they read as public trust/content pages, not internal launch-gate surfaces. About was completed in production in Phase 18 Sprint 18.13 with localized mission, how it works, privacy, contact/corrections, languages and responsible growth. Contact was completed in production in Phase 18 Sprint 18.14 with subject-based support, security/abuse, editorial correction, privacy and partnership/legal channels. Privacy Policy was completed in production in Phase 18 Sprint 18.15 with localized six-section current-state policy and live desktop/mobile QA. Cookie Policy was completed in production in Phase 18 Sprint 18.16 with localized storage/consent policy, `#consent-preferences` CMP link and live desktop/mobile QA. Terms of Use was completed in production in Phase 18 Sprint 18.17 with localized permitted use, abuse, limits, informational results, future paid services, responsibility/contact and live desktop/mobile QA. Methodology was completed in production in Phase 18 Sprint 18.18 with localized result-family methodology for network/DNS, calculators, documents/PDF, images, email deliverability and website checks. Editorial Policy was completed in production in Phase 18 Sprint 18.19 with localized useful content, review/update, correction, translation, source/example and quality-standard sections.
- Validate Contact-style mail links in a browser when production uses Cloudflare email protection; raw HTML can obfuscate `mailto:` links even when the user-facing link is correct.
- For the remaining legal/trust pages, keep curated copy out of generic helpers when those helpers would reintroduce `should`, `plans to`, human review, launch status or internal gap language. Human/legal gaps stay in `docs/HUMAN_ACTION_REQUIRED.md`, not in the public first fold.
- Operational rule for the remaining Phase 18 site catalog routes: implement the route, validate screenshots/Playwright/smoke, commit/push, monitor HostGator deploy, run public smoke, then start the next sprint.
- Operational route rule: if the Hub catalog route exposes deep links into a static app, validate or deploy that static app in the same sprint before moving on.
- Operational process rule: when user feedback corrects the delivery cadence, register the rule in the required docs during sprint closeout, then continue the next sprint from that documented base.
- Reduce consent-banner intrusion on the first fold while preserving local/fail-closed consent behavior. Done in production in Sprint 9.15.
- Keep the Blade admin dense, utilitarian and consistent with the current control-plane style.

## P1

- Add filters for category, status, public deploy state, AdSense readiness and benchmark readiness.
- Add per-site detail pages for benchmark findings.
- Add CSV export for backlog items.
- Add richer footer navigation grouped by product vertical. Done in production in Sprint 9.15 and expanded in production in Phase 18 Sprint 18.2.

## P2

- Add before/after comparison fields once technical refinement sprints ship.
- Add richer charts only when data volume justifies them.

## Impact expected

Higher operator clarity and faster prioritization before activating public deploys, ads or billing.

## Technical risk

Medium if new control-plane tables/routes are added; low if the sprint only reuses existing seeded data.

## AdSense/compliance risk

Low if the dashboard stays internal and Hub public placeholders remain inert.

## Tests needed

- Laravel admin feature tests for auth/RBAC/views.
- Hub unit/build/preview/Playwright if public catalog UI changes.
- Structure, secrets, dry-run, change detection and diff checks.

## Acceptance metrics

- Benchmark readiness appears for all 11 public surfaces.
- No provider metrics are shown as real while imports are disabled.
- Admin pages fit desktop and mobile/tablet widths without overlap.
- Hub home exposes a task/discovery path before catalog controls on desktop and mobile.
- Hub home exposes direct links for at least 10 high-intent free tools without requiring signup, checkout or payment-provider activation.
- Hub home first viewport reads as a public tool finder, not an operating catalog: no visible `Available`/`Preview`, launch/status counters, `upgrade path`, billing, ads or rollout wording.
- Hub footer reads as navigation, not controls: text lists in columns, hover state, legal links as text, no chip/button styling for structural navigation, and direct links to tool/subpage URLs across the portfolio.
- Hub footer menu typography stays compact/light at rest, with no underline; hover may increase weight and visual scale, but must not reintroduce underline or button/chip styling.
- Site catalog detail pages must be validated on their canonical routes and cannot show rollout/status/product-sheet language when the sprint calls for a public benchmark-grade landing.
- Site catalog detail pages must link to real tools/subpages when available; future ideas stay non-linked until they have tested useful pages, localized copy and SEO value.
- When a Hub catalog route adds or exposes deep links to a static app, validate or deploy that app in the same sprint so public links are not left pointing at stale releases.
- Institutional pages must keep legal/KYC/provider/payment pending items out of the public first fold. Human-gated items belong in `docs/HUMAN_ACTION_REQUIRED.md`, while public copy should explain current user-facing policy, contact paths and correction paths clearly.
- Legal/trust page smoke markers must track intentional copy changes in the same sprint so preview/deploy validation checks the actual benchmark-grade surface instead of stale wording.
- Methodology pages must explain how public results are calculated or constrained by result family. They must not become launch status, roadmap, readiness, review-gate, release, rollback, ads or billing pages.
- Editorial Policy pages must expose a public correction process and quality standards without surfacing internal review, launch, provider, monetization, billing or rollback process language.
- Desktop/mobile screenshots are inspected before closure and linked from the sprint artifacts or status notes.

## Dashboard backlog

- `benchmark_readiness_by_site`
- `seo_aio_readiness_by_site`
- `adsense_readiness_by_site`
- `monetization_readiness_by_site`
- `growth_opportunities`
