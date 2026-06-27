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
- Add benchmark readiness and SEO/AIO/AdSense readiness in the admin.
- Feed executive reports from local evidence without provider imports.

## Sprint 7.2 implementation notes

- Hub cards now expose compact operating signals for tool tracks, language coverage and gated monetization.
- Control-plane now stores benchmark readiness and opportunities as local estimated evidence, not provider metrics.
- `/admin/benchmark-refinement` gives operators the per-site backlog before the technical site refinements continue.
- Feature CI closed green with Quality Gate `28286110806`, Deploy Dry Run `28286110802` and public smokes for Hub/control-plane/NetProbe.
