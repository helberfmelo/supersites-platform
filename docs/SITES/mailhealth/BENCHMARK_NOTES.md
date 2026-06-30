# MailHealth Benchmark Notes

Data-base: 2026-06-27

## References

- MxToolbox
- Mail-Tester
- EasyDMARC tools
- dmarcian DMARC inspector
- Google Admin Toolbox dig
- MailGenius

## Screenshots available

- `artifacts/mailhealth-catalog-qa/mailhealth-catalog-live-desktop.png`
- `artifacts/mailhealth-catalog-qa/mailhealth-catalog-live-mobile-pt-br.png`

## Useful patterns to learn

- A simple domain health score makes technical email checks understandable.
- Checklist severity helps users prioritize SPF, DKIM, DMARC, MX and blacklist issues.
- Raw records should be accessible but secondary.
- Fix suggestions and record builders increase usefulness.
- Paid monitoring and DMARC reporting are natural upgrades.

## Do not copy

- Scores, report layout, record explanations, fix copy, logos or proprietary diagnostic labels.

## Opportunities

- Combined domain health summary implemented as per-tool score card in Sprint 7.9.
- Severity and fix guidance implemented per issue without changing API contracts.
- Record builders and monitoring CTAs prepared as gated/inert panels with provider-policy gates.

## Sprint 9.10 benchmark-grade response

- A unified report now leads the home experience and mirrors the diagnostic mental model of email health competitors.
- The free flow uses one domain input, DKIM selector, SMTP port and optional local headers to produce a score and per-signal cards.
- Monitoring, alerting, DMARC ingestion, API and white-label remain gated internally; public top sections should not sell roadmap language as availability.
- Production release `55721b1aa2d0e020f73c3823d580427a48708ab4-28319881701-1` is live at `/supersites/mailhealth/` with public asset `fseKxIDq.js`.

## Sprint 18.9 catalog response

- The Hub catalog page now follows the MxToolbox/Mail-Tester mental model at catalog level: one email-health landing, score preview, signal cards and direct diagnostic entry points.
- Free value links directly to SPF, DKIM, DMARC, MX, blacklist, SMTP and header analyzer pages without account gates.
- Technical limits and privacy remain below the practical value; top copy avoids monitoring/API/billing/roadmap claims.
- PT-BR/ES/FR/DE localization was corrected after live visual QA, including real accents in PT-BR.
- Final evidence: commit `681734b`, Hub deploy `28438325239`, release `681734b85cabc8defa91c54cef4b0c14f0ea3584-28438325239-1`, public smoke, AdSense-safe, 14 deep links and crawler quick `2026-06-30T10-47-16-555Z` passed.
