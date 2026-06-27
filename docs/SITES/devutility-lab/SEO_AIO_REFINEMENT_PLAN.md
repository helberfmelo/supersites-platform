# DevUtility Lab SEO/AIO Refinement Plan

Data-base: 2026-06-27

## References

- CodeBeautify long-tail utility clustering.
- Developer tool pages with examples, FAQs and related converters.

## P0

- Add direct utility explanation above each tool.
- Add original examples and common error explanations.
- Add FAQ and related tools per page.
- Ensure schema, canonical, hreflang and sitemap remain valid.

## P1

- Add glossaries for JSON, JWT, regex, cron, UUID, timestamp, hashing and encoding concepts.
- Add privacy-first guidance for pasting secrets.

## P2

- Add new dev tools only when they have a real tested implementation.

## Impact expected

Better SEO coverage without creating pages that are just empty apps.

## Technical risk

Low for content; medium for new tools or route taxonomy.

## AdSense/compliance risk

Low to medium; ensure pages have enough educational content before ads.

## Tests needed

- Static page smoke for metadata/schema.
- Tool examples in unit tests.

## Acceptance metrics

- Every tool page has example, FAQ, limitations and related tools.
- No generated mass pages without implementation.

## Sprint 7.5 implementation status

- Each implemented tool page now has original example guidance, common-error guidance, limitations, FAQ and related tools.
- Canonical, hreflang, sitemap and schema remain generated from the existing Nuxt catalog/routes.
- Public-facing primary labels were adjusted to product language instead of internal sprint labels.
- No new mass pages or unimplemented utility routes were created.

## Dashboard backlog

- Tool pages missing FAQ.
- Tool pages missing privacy warning.
- Internal links by utility cluster.
