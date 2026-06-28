# SuperSites Hub SEO/AIO Refinement Plan

Data-base: 2026-06-27

## References

- Product discovery category pages and comparison pages.
- Google Search internationalization, canonical, hreflang and AI optimization guidance listed in the main playbook.

## P0

- Keep each site page original, curated and useful.
- Add clearer related-tool and category paths without mass low-value pages. Sprint 7.2 improves catalog scan signals without adding thin pages.
- Ensure localized metadata, canonical and hreflang remain correct after catalog refinements.
- Add uniform JSON-LD for Hub home, site detail and legal/editorial pages. Done locally in Sprint 9.15.
- Add workflow clusters and footer verticals as curated internal links instead of programmatic thin content. Done locally in Sprint 9.15.

## P1

- Add editorial snippets that explain who each tool is for and when to use it.
- Add glossary/use-case links where the Hub can add real context.

## P2

- Add benchmark/readiness public summaries only after they are useful and not misleading.

## Impact expected

Better crawlability and stronger portfolio discovery without creating thin programmatic pages.

## Technical risk

Low for metadata/content refinements; medium for new routing or sitemap logic.

## AdSense/compliance risk

Medium if pages become thin directory listings. Mitigation: each page needs original context and clear utility.

## Tests needed

- SSR/SSG HTML checks for title, meta, canonical and hreflang.
- Sitemap validation.
- Playwright smoke for catalog navigation.

## Acceptance metrics

- No empty site pages.
- Every listed app has localized title/description and useful internal links.
- `x-default` and locale alternates remain stable.
- Home/detail/legal pages include valid JSON-LD scripts in generated HTML.

## Dashboard backlog

- Pages missing localized metadata.
- Pages without related tools.
- Pages with thin-content risk.
- Pages with stale review dates.
