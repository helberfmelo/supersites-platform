# ADR 0009 - Shared foundation packages

Status: Accepted

## Context

Sprint 1.3 begins the shared platform layer for all SuperSites apps. The catalog already duplicated locale routing, hreflang, sitemap and visual status conventions inside `apps/supersite`.

The roadmap requires shared `ui`, `i18n`, `seo` and `consent` packages before the hub, control plane and first product sites grow independently.

## Decision

Create TypeScript workspace packages:

- `@supersites/ui` for design tokens, component recipes and status badge variants.
- `@supersites/i18n` for locale definitions, route helpers, language selector options and Intl formatters.
- `@supersites/seo` for canonical URLs, hreflang alternates, page metadata and sitemap XML helpers.
- `@supersites/consent` for consent categories, Consent Mode state mapping, region checks and ad placement safety rules.

Keep these packages source-first for now, exporting `src/index.ts` directly inside the monorepo. Add unit tests and typecheck scripts to each package, and run them in the frontend CI gate.

## Consequences

- The hub can reuse shared contracts without adding a package build pipeline yet.
- Future sites should import these packages instead of copying locale, SEO, consent or design rules.
- The package filter in root scripts uses explicit package names because the initial generic pnpm path filter did not match workspaces on Windows.
- A later packaging sprint can add compiled outputs if external publishing or stricter artifact boundaries become necessary.
