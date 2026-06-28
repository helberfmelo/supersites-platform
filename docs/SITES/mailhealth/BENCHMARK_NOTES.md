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

- No MailHealth-specific screenshots are present yet.

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
- Monitoring, alerting, DMARC ingestion, API and white-label remain visibly planned but inactive.
- Production release `55721b1aa2d0e020f73c3823d580427a48708ab4-28319881701-1` is live at `/supersites/mailhealth/` with public asset `fseKxIDq.js`.
