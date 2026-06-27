# CalcHarbor Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-CALCHARBOR.
- Real number: Sprint 7.4.
- Must run after: Sprint 7.3.

## Current state

- Nuxt SSG app exists with four calculators and five locales.
- Sprint 7.4 local implementation adds live browser-side result cards, calculation memory, interpretation states, related calculators and inert workflow-upgrade CTAs.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Calculator result/formula UX refinement.
- SEO/AIO educational content and internal linking.
- Inert monetization/support structure.

## Validation

- `pnpm test:calcharbor`
- `pnpm build:calcharbor`
- `pnpm validate:calcharbor-preview`
- `pnpm test:e2e:calcharbor`
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No real public deploy switch.
- No financial/tax advice claims.
- No checkout, ads, donation payment or analytics values from calculator inputs/results.

## Sprint 7.4 local result

- Implemented and locally validated.
- `pnpm --filter @supersites/calcharbor test`, build, preview smoke and Playwright passed.
- Public deploy remains gated.
