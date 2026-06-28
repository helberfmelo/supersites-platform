# ADR 0031 - Benchmark crawler baseline

Date: 2026-06-28

Status: Accepted

## Context

Fase 9 requires benchmark-grade refinement based on evidence rather than visual impression alone. The live audit identified missing crawler coverage for screenshots, console errors, broken links, canonical, hreflang, sitemap, robots, title, description, schema and local performance proxies.

The portfolio has many public static Nuxt surfaces under the transitional HostGator URL family. Screenshots and raw crawl JSON can become large and should not be versioned on every run.

## Decision

Add `scripts/benchmark-crawl.mjs` as the deterministic Playwright crawler for Fase 9.

- `pnpm benchmark:crawl:quick` samples EN/PT-BR, home/status pages and the first tool per product for fast validation.
- `pnpm benchmark:crawl` covers all locales, all tool/calculator pages and localized content/status pages.
- Raw JSON, screenshots and generated markdown go under `artifacts/benchmark-crawl/`.
- A lightweight latest report can be intentionally written to `docs/benchmarks/our-sites/latest-baseline.md` with `--write-docs`.
- The crawler records browser timing proxies for TTFB, load, LCP, CLS and long tasks, but does not claim to be official Lighthouse, PageSpeed or GTmetrix.
- The crawler does not log in, submit private payloads, activate ads, call external analytics providers, start billing, create donation links, trigger paid APIs, run workers or mutate production.

## Consequences

Sprint 9.x refinements can now cite a repeatable baseline for public pages. Large screenshots remain local artifacts and can be inspected without adding repository weight or risking accidental publication of sensitive local files.

Official Lighthouse/PageSpeed/GTmetrix, provider imports, recurring crawlers and dashboard automation remain future gates.
