# MailHealth Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-MAILHEALTH.
- Real number: Sprint 7.9.
- Must run after: Sprint 7.8.

## Current state

- Nuxt SSG app exists with seven email diagnostic tools and five locales.
- Control-plane has bounded DNS/blacklist/SMTP endpoints.
- Public URL is live as a Nuxt static app at `https://opentshost.com/supersites/mailhealth/`.
- Sprint 7.9 local refinement adds health score, signal checklist, severity labels, fix guidance, planned record-builder boundaries and related checks.
- Sprint 9.10 production refinement adds a home-level unified domain report across SPF, DKIM, DMARC, MX, blacklist, SMTP and local headers.
- Sprint 13.3 local refinement turns SPF/DMARC record-builder boundaries into active local TXT builders with review warnings, DNS steps and guide-only limits for provider-dependent checks.

## Scope

- Health score/checklist UX refinement.
- Fix guidance and educational content.
- Local SPF TXT and DMARC TXT builders with no DNS publishing, storage or analytics values.
- Inert monitoring/support/ads structure.

## Validation

- `pnpm test:mailhealth`
- `pnpm build:mailhealth`
- `pnpm validate:mailhealth-preview`
- `pnpm test:e2e:mailhealth`
- Backend tests if MailHealth endpoints change.
- Standard structure/secrets/dry-run/ci/diff gates.
- Sprint 7.9 validation passed for unit, build, preview smoke, Playwright, final local gates, Quality Gate `28289435994`, Deploy Dry Run `28289435995` and public Hub/control-plane/NetProbe smokes.
- Sprint 9.10 validation passed: `pnpm test:mailhealth`, `pnpm build:mailhealth`, `pnpm validate:mailhealth-preview`, `pnpm test:e2e:mailhealth`, package gates, public-copy, structure, secrets, deploy dry-run, ci:changes and diff check; feature commit `55721b1`, Quality Gate `28319796608`, Deploy Dry Run `28319796624`, deploy `28319881701`, release `55721b1aa2d0e020f73c3823d580427a48708ab4-28319881701-1`, asset `https://opentshost.com/supersites/mailhealth/_nuxt/fseKxIDq.js` and live UX smoke passed.
- Sprint 13.3 validation passed: `pnpm test:mailhealth` with 10 tests, `pnpm build:mailhealth`, `pnpm validate:mailhealth-preview` with asset `/_nuxt/NxyQf1L0.js`, `pnpm test:e2e:mailhealth` with 6 tests, public-copy in 951 HTML files, AdSense-safe in 13 pages, structure, secrets, deploy dry-run, ci:changes and diff check; feature commit `9259dd9`, Quality Gate `28354998649`, Deploy Dry Run `28354998680` and public Hub/MailHealth/NetProbe/control-plane smokes passed.

## Gates

- No open relay tests, broad blacklist scans or recurring monitoring.
- No alert delivery, DMARC ingestion, DNS publishing, checkout, ad serving or paid API.
- No analytics values from domains, selectors, headers or records.
- Sprint 9.10 kept the unified report point-in-time only; no recurring monitor, alert delivery, DMARC ingestion, paid API, white-label, account, storage, checkout, ad serving or external analytics was activated.
- Sprint 13.3 keeps builders local-only; DNSBL/provider policy, DKIM rotation automation, MX migration automation and DMARC report processing remain gated.
