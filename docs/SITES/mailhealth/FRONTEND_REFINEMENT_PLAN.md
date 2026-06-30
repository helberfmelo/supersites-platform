# MailHealth Frontend Refinement Plan

Data-base: 2026-06-27

## Objective

Turn SPF/DKIM/DMARC/MX/blacklist/SMTP/header checks into a clear health report for non-specialists and technical operators.

## P0

- Add top-level score/status summary for domain checks.
- Add severity badges and issue checklist.
- Add raw records and technical details in progressive disclosure.
- Add fix guidance without overclaiming deliverability.
- Improve header analyzer error and privacy states.

## P1

- Add safe record-builder planning for SPF/DMARC.
- Add related tools and monitoring CTA after diagnosis.

## P2

- Prepare DMARC report ingestion, alerts, batch, API and white-label as gated paid backlog.

## Impact expected

Higher trust for email-auth diagnostics and clearer upgrade fit for monitoring.

## Technical risk

Medium if API response contracts change; high for future monitoring/DMARC ingestion.

## AdSense/compliance risk

Medium; placements must avoid domain fields, headers, results and copy/fix controls.

## Tests needed

- MailHealth unit tests/build.
- Backend DNS/SMTP bounded tests if APIs change.
- Preview smoke and Playwright.

## Acceptance metrics

- Score/checklist appears in the tool flow, and post-result findings mirror severity labels in the result table.
- Header content stays browser-side.
- No domains/selectors/records in analytics.
- Related checks and planned record builders are visible without activating monitoring, API, billing or storage.

## Sprint 9.10 update

- The home now opens with a unified domain report before the catalog.
- The report combines SPF, DKIM, DMARC, MX, blacklist, SMTP and optional local headers into one score/checklist.
- Desktop and mobile Playwright screenshots passed with no overflow, and the report keeps headers local.
- Production deploy `28319881701` and live UX smoke passed with sanitized analytics, empty browser storage and mobile layout without horizontal overflow.

## Sprint 18.9 catalog update

- The Hub catalog route now opens as a public MailHealth landing instead of a generic product card.
- The first fold shows a domain health report, sample score, SPF/DKIM/DMARC/MX signals and shortcuts to authentication, receiving and evidence checks.
- The route links directly to the 7 public checks: SPF, DKIM, DMARC, MX, blacklist, SMTP and header analyzer.
- EN/PT-BR/ES/FR/DE copy was localized and the PT-BR accent regression found in live QA was corrected before closeout.
- Final production evidence: commit `681734b`, Hub deploy `28438325239`, release `681734b85cabc8defa91c54cef4b0c14f0ea3584-28438325239-1`, public smoke, AdSense-safe, 14 deep links and crawler quick `2026-06-30T10-47-16-555Z` passed.
- Screenshots: `artifacts/mailhealth-catalog-qa/mailhealth-catalog-live-desktop.png` and `artifacts/mailhealth-catalog-qa/mailhealth-catalog-live-mobile-pt-br.png`.
- Monitoring, DMARC ingestion, API, billing, ads, donation and provider activation remain gated and inactive.

## Dashboard backlog

- Domain health score readiness.
- Record builder readiness.
- DNSBL/provider policy gate.
