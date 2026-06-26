# SEO

Canonical, hreflang, sitemap, robots, Open Graph and structured data helpers.

## Sprint 1.3 baseline

- `absoluteUrl` and `createCanonicalLink` normalize transitional HostGator URLs.
- `createLocaleAlternates` creates reciprocal hreflang links plus `x-default`.
- `createPageMetadata` builds baseline description and Open Graph metadata.
- `createSitemapXml` centralizes XML escaping and sitemap rendering.

Run:

```powershell
pnpm --filter @supersites/seo test
pnpm --filter @supersites/seo typecheck
```
