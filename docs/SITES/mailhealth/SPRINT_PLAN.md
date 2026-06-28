# MailHealth Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-MAILHEALTH.
- Real number: Sprint 7.9.
- Must run after: Sprint 7.8.

## Current state

- Nuxt SSG app exists with seven email diagnostic tools and five locales.
- Control-plane has bounded DNS/blacklist/SMTP endpoints.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.
- Sprint 7.9 local refinement adds health score, signal checklist, severity labels, fix guidance, planned record-builder boundaries and related checks.
- Sprint 9.10 local refinement adds a home-level unified domain report across SPF, DKIM, DMARC, MX, blacklist, SMTP and local headers.

## Scope

- Health score/checklist UX refinement.
- Fix guidance and educational content.
- Inert monitoring/support/ads structure.

## Validation

- `pnpm test:mailhealth`
- `pnpm build:mailhealth`
- `pnpm validate:mailhealth-preview`
- `pnpm test:e2e:mailhealth`
- Backend tests if MailHealth endpoints change.
- Standard structure/secrets/dry-run/ci/diff gates.
- Sprint 7.9 validation passed for unit, build, preview smoke, Playwright, final local gates, Quality Gate `28289435994`, Deploy Dry Run `28289435995` and public Hub/control-plane/NetProbe smokes.
- Sprint 9.10 local validation passed: `pnpm test:mailhealth`, `pnpm build:mailhealth`, `pnpm validate:mailhealth-preview`, `pnpm test:e2e:mailhealth`, package gates, public-copy, structure, secrets, deploy dry-run, ci:changes and diff check.

## Gates

- No open relay tests, broad blacklist scans or recurring monitoring.
- No alert delivery, DMARC ingestion, checkout, ad serving or paid API.
- No analytics values from domains, selectors, headers or records.
- Sprint 9.10 kept the unified report point-in-time only; no recurring monitor, alert delivery, DMARC ingestion, paid API, white-label, account, storage, checkout, ad serving or external analytics was activated.
