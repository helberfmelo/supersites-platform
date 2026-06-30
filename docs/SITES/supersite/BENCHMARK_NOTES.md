# SuperSites Hub Benchmark Notes

Data-base: 2026-06-27

## References

- Product discovery: ProductHunt, AlternativeTo, SaaSHub, ThereIsAnAIForThat and Similarweb category/ranking patterns.
- Admin analytics: GA4, Search Console, AdSense, Cloudflare Analytics, Plausible, Umami, PostHog, Metabase, Grafana and Stripe.
- Local reference docs: `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`, `docs/STATUS.md`, `docs/METRICS.md`.

## Screenshots available

- No Hub-specific external screenshots are present yet.
- Existing NetProbe screenshots still inform dashboard needs for benchmark evidence and per-site result quality.

## Useful patterns to learn

- Compact cards with strong category, status, language and tool-count signals.
- Search and filters that support quick comparison without turning the catalog into a blog.
- KPI cards, period comparison and drilldown by site/language/page/tool.
- Opportunity tables with impact, effort, confidence, risk and status.
- Clear separation between estimated, delayed, finalized and unavailable metrics.

## Do not copy

- Product directory branding, iconography, rankings, copy or layout.
- Provider dashboard visual identity or metric naming that implies real GA4/AdSense/billing imports.

## Opportunities

- Make the public catalog read as a curated utility network.
- Make the first public Hub scan behave more like a practical utility index: task-first, direct tools, fewer internal operating signals.
- Add benchmark readiness and SEO/AIO/AdSense readiness in the admin.
- Feed executive reports from local evidence without provider imports.

## Sprint 7.2 implementation notes

- Hub cards now expose compact operating signals for tool tracks, language coverage and gated monetization.
- Control-plane now stores benchmark readiness and opportunities as local estimated evidence, not provider metrics.
- `/admin/benchmark-refinement` gives operators the per-site backlog before the technical site refinements continue.
- Feature CI closed green with Quality Gate `28286110806`, Deploy Dry Run `28286110802` and public smokes for Hub/control-plane/NetProbe.

## Sprint 9.15 implementation notes

- The public Hub now opens with a visual `Top public tools` discovery block before catalog filters, using curated cards and CSS preview blocks for the strongest public surfaces.
- `Choose by workflow` clusters add useful internal paths for diagnostics, document workflows, launch assets and operations without generating thin page sets.
- The global footer now groups products by vertical and keeps legal/editorial links available across localized routes.
- Home, site detail and legal/editorial pages now emit uniform JSON-LD while preserving canonical, hreflang and sitemap behavior.
- Local validation passed through Hub tests/build/preview/Playwright and global structure/secrets/public-copy/dry-run gates. Production deploy `28332214304`, asset `https://opentshost.com/supersites/_nuxt/f2kVvvDG.js` and public/live smokes passed.

## Phase 18 Sprint 18.2 implementation notes

- The public Hub home now includes 11 localized direct links to popular free tools across the portfolio, including What is my IP, DNS Propagation, loan payment, JSON formatter, timezone converter, static QR, invoice builder, SPF checker, website status, image compressor and PDF merge.
- Footer discovery was expanded into nine vertical clusters so users can browse by practical task area instead of only by product name.
- The support/donation block is public but inert: no payment link, QR/PIX, checkout, provider SDK, webhook or billing activation.
- Tests now assert the direct links, JSON-LD tool ItemList, sanitized outbound analytics and home overflow safety.
- Production deploy `28414876705` published release `2719229cf6e1e36c29f5f6f7bd4d153bfcbdb978-28414876705-1`, asset `https://opentshost.com/supersites/_nuxt/C46NIGfN.js`; public smoke, AdSense-safe validation, quick crawler and live desktop/mobile checks passed.

## Corrective Phase 18 benchmark-grade note

- Audit feedback after Sprint 18.2 showed the Hub was still visually closer to an operating catalog than a benchmark-grade public tool finder.
- The first fold must prioritize search, categories and direct tool use. Product/network status, rollout counters, preview badges, tool-count badges, `free value` and `upgrade path` do not belong in the public home main experience.
- The corrected Hub pattern is: concise user-facing H1, prominent tool search, category chips, filtered direct tool cards, workflow clusters and only then a compact site directory.
- New guardrail: `docs/PHASE18_BENCHMARK_GRADE_ACCEPTANCE.md` is mandatory for every remaining Phase 18 sprint; technical pass plus added sections is not enough without visual first-fold acceptance.

## Phase 18 Sprint 18.2c footer correction notes

- Benchmark feedback on the Hub footer requires text navigation, not chip/button controls. Footer links should feel like a mature utility-site directory footer.
- The footer now uses localized text columns with 38 deep links per locale to public tools/subpages across the 10 sites, plus a separate text-only legal row.
- Future footer refinements must not regress to product-home-only navigation. Prefer practical tool links such as DNS Propagation, JSON Formatter, PDF Merge, SPF Checker, Image Compressor and similar task routes.
- Visual acceptance requires desktop and mobile screenshots after build/preview; current local evidence is in `artifacts/footer-qa/hub-footer-desktop-wide.png` and `artifacts/footer-qa/hub-footer-mobile-pt-br.png`.
- Production deploy `28419357564` published release `0abf5b6a27fc6e6864866e4d8f857df1b08699d3-28419357564-1`, asset `https://opentshost.com/supersites/_nuxt/DxU4_SPz.js`; public smoke, AdSense-safe validation, crawler quick `2026-06-30T04-08-32-953Z` and live footer screenshots passed.

## Phase 18 Sprint 18.2d footer typography notes

- Follow-up feedback on the Hub footer approved the text-column direction but rejected the visual weight of the menu links and SuperSites description.
- The footer menu default state should stay compact and light: small text, regular weight, no underline and no chip/button affordance.
- Hover may give the user a clear response by increasing weight and slightly scaling/moving the text, but it must remain underline-free.
- Local evidence before CI/deploy: `artifacts/footer-qa/hub-footer-typography-desktop-wide.png` and `artifacts/footer-qa/hub-footer-typography-mobile-pt-br.png`; computed hover check confirmed weight `500` at rest, `700` on hover and no underline in either state.
- Production deploy `28420973782` published release `f13cef7ab668da1166ae1b7fafd86d54fdeaa6ed-28420973782-1`, asset `https://opentshost.com/supersites/_nuxt/CvYAdSlM.js`; public smoke, AdSense-safe validation, crawler quick `2026-06-30T04-56-11-086Z`, live footer screenshots and live hover check passed.

## Phase 18 Sprint 18.3 catalog route correction notes

- Catalog detail routes must not default to an internal product sheet when the sprint asks for benchmark-grade public UX.
- NetProbe Atlas now has a special public landing on `/supersites/en/sites/netprobe-atlas`, with practical first fold, direct tool links and contextual deep-link footer groups.
- This route correction is now part of the Phase 18 gate: validate the canonical catalog route itself, not only the app home, and keep CTAs pointed to real subtools where they exist.
- Local evidence before CI/deploy: `artifacts/netprobe-catalog-qa/netprobe-catalog-desktop.png` and `artifacts/netprobe-catalog-qa/netprobe-catalog-mobile-pt-br.png`; Playwright checked desktop EN/mobile PT-BR, no overflow and negative assertions against internal/rollout language.
- Production deploy `28422499578` published release `36b11f54ef984e6c6098da971cd5df3248cc1b0e-28422499578-1`, asset `https://opentshost.com/supersites/_nuxt/BhQl-Uh-.js`; public smoke, AdSense-safe validation, crawler quick `2026-06-30T05-37-05-797Z` and live desktop/mobile route checks passed.

## Phase 18 Sprint 18.4 CalcHarbor catalog route notes

- CalcHarbor now follows the corrected catalog-route pattern: `/supersites/en/sites/calcharbor` is a practical calculator landing with search, filters, featured calculators and dense cards for existing public calculators.
- The route intentionally avoids launch/order/status/product-sheet language and does not link future topics until they are real, tested pages with localized useful content.
- For upcoming site catalog sprints, apply this route-level rule first: validate the canonical Hub catalog route, confirm real deep links, inspect desktop/mobile screenshots and keep smoke markers aligned with user-facing copy.
- Local evidence before CI/deploy: `artifacts/calcharbor-catalog-qa/calcharbor-catalog-desktop.png` and `artifacts/calcharbor-catalog-qa/calcharbor-catalog-mobile-pt-br.png`; Playwright checked desktop EN/mobile PT-BR, search/filter behavior, overflow and blocked terms.
- Production deploys `28424159062` for the Hub and `28424625903` for CalcHarbor passed. The extra CalcHarbor deploy was required because the Hub exposes deep links to all 8 calculators; final smoke confirmed no broken CalcHarbor calculator URLs and crawler quick `2026-06-30T06-33-49-205Z` finished with 0 gaps.

## Phase 18 Sprint 18.5 DevUtility Lab catalog route notes

- DevUtility Lab now follows the corrected catalog-route pattern: `/supersites/en/sites/devutility-lab` is a practical developer workbench directory with search, category filters, local shortcuts and direct links to existing public tools.
- The route avoids generic product-sheet, roadmap, launch/status, billing and ads language; privacy is present as a short cue beside the finder, not as the dominant first-fold message.
- Gate reinforcement: Hub catalog routes that expose deep links into a static app must validate those production app routes and deploy the app in the same sprint if the public release is stale.
- Local evidence before CI/deploy: `artifacts/devutility-catalog-qa/devutility-catalog-desktop.png` and `artifacts/devutility-catalog-qa/devutility-catalog-mobile-pt-br.png`; Playwright checked desktop EN/mobile PT-BR, search behavior, overflow and blocked terms.

## Phase 18 Sprint 18.13 About page notes

- The Hub About route now follows the institutional-page benchmark pattern: it explains mission, how the network works, privacy defaults, contact/corrections, languages and responsible growth before any operational detail.
- Public trust pages must not expose legal launch gates such as `Human legal review remains required`, `public review`, `revisao publica` or equivalent human/legal review language. Those pending items stay in `docs/HUMAN_ACTION_REQUIRED.md`.
- The shared trust/i18n helper was adjusted so fallback public copy uses contact/correction language instead of publishing human/legal review requirements.
- Local evidence: `artifacts/about-page-qa/about-en-desktop.png` and `artifacts/about-page-qa/about-pt-br-mobile.png`; live evidence: `artifacts/about-page-qa/about-en-live-desktop.png` and `artifacts/about-page-qa/about-pt-br-live-mobile.png`.
- Production deploy `28451482856` published release `398ef0c516d6e7348420d1238ce85ac92952155a-28451482856-1`, asset `https://opentshost.com/supersites/_nuxt/BQ5vxgN9.js`; public smoke, AdSense-safe validation, five About locale route checks and crawler quick `2026-06-30T14-32-30-580Z` passed.

## Phase 18 Sprint 18.14 Contact page notes

- The Hub Contact route now follows the public-channel benchmark pattern: product support, security/abuse, editorial correction, privacy and partnership/legal are visible as subject-based channels before the longer guidance text.
- Contact pages must not publish launch mailbox status, future-public-mailbox promises or unfinished-form language. If a mailbox, SLA, alias or secure intake path requires owner/provider action, record it in `docs/HUMAN_ACTION_REQUIRED.md`, not on the public page.
- The current architecture uses browser-visible `mailto:` links with subject prefixes because no public form backend exists. Cloudflare may obfuscate the raw HTML, so production validation must use a browser check to confirm links decode to `mailto:contact@opentshost.com`.
- Local evidence: `artifacts/contact-page-qa/contact-en-desktop-clean.png` and `artifacts/contact-page-qa/contact-pt-br-mobile-clean.png`; live evidence: `artifacts/contact-page-qa/contact-en-live-desktop.png` and `artifacts/contact-page-qa/contact-pt-br-live-mobile.png`.
- Production deploy `28454599720` published release `8cef11c0907188662b486121ca66941a5784f0e9-28454599720-1`, asset `https://opentshost.com/supersites/_nuxt/BpxgSDhZ.js`; public smoke, AdSense-safe validation, five Contact browser route checks and crawler quick `2026-06-30T15-17-02-999Z` passed.
