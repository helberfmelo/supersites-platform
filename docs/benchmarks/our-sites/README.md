# Our Sites Benchmark Evidence

This folder stores lightweight, versioned benchmark evidence for SuperSites public surfaces.

Large screenshots, raw Playwright JSON and timing artifacts are generated under `artifacts/benchmark-crawl/` and are intentionally not committed.

## Commands

Quick sample crawl:

```powershell
pnpm benchmark:crawl:quick
```

Full crawl:

```powershell
pnpm benchmark:crawl
```

Refresh the versioned latest baseline after an intentional Sprint 9.x audit:

```powershell
node scripts/benchmark-crawl.mjs --mode=quick --write-docs --sprint=9.x --symbolic-sprint=BGR-SYMBOLIC-NAME
```

For Sprint 9.16 closure after production deploy:

```powershell
node scripts/benchmark-crawl.mjs --mode=full --include-content --write-docs --sprint=9.16 --symbolic-sprint=BGR-PERF-ADSENSE-CLOSURE
```

## Scope

- Public Hub and the 10 public product sites under `https://opentshost.com/supersites/`.
- Desktop `1366x900` and mobile `390x844`.
- HTTP status, console/page errors, title, meta description, canonical, hreflang, robots meta, JSON-LD, basic accessibility smoke, horizontal overflow, same-origin internal links, robots and sitemap fetches.
- Browser timing proxies for TTFB, load, LCP, CLS and long tasks.

The crawler does not log in, submit private payloads, activate ads, call external analytics providers, start billing, create donations, trigger paid APIs, run workers or mutate production.

## Interpretation

This is not an official Lighthouse, PageSpeed or GTmetrix result. It is a deterministic Playwright baseline used to decide which benchmark-grade refinements should happen next.
