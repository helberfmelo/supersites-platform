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
