# MailHealth SEO/AIO Refinement Plan

Data-base: 2026-06-27

## References

- MxToolbox educational diagnostics.
- EasyDMARC/dmarcian DMARC education.
- Mail-Tester score explanation pattern.

## P0

- Add direct answers for "is my email domain configured correctly?".
- Add original explanations of SPF, DKIM, DMARC, MX, blacklist, SMTP and headers.
- Add FAQ and fix guidance by severity.
- Keep canonical/hreflang/schema stable.

## P1

- Add glossary for SPF alignment, DKIM selector, DMARC policy, MX priority and DNSBL.
- Add examples with safe demo domains only.

## P2

- Add advanced deliverability pages only with provider-policy review.

## Impact expected

Better coverage for high-intent email authentication queries while avoiding false guarantees.

## Technical risk

Low for content; medium for new diagnostic flows.

## AdSense/compliance risk

Medium because deliverability claims can be sensitive. Avoid guaranteed inbox-placement claims.

## Tests needed

- Metadata/schema checks.
- Fixture-based example tests.

## Acceptance metrics

- Each checker has explanation, fix guidance, FAQ and limitations.
- No claim of exhaustive blacklist or open relay testing.
- Sprint 7.9 public copy removes internal sprint labels while preserving review dates, canonical/hreflang/schema and gated upgrade boundaries.

## Sprint 9.10 update

- The home now has a clear primary action for a unified domain health report, improving task-first relevance without creating shallow pages.
- Existing localized tool pages remain canonical/hreflang/schema-backed, while the report summarizes the main entities: SPF, DKIM, DMARC, MX, blacklist, SMTP and headers.
- Copy remains point-in-time and avoids guaranteed deliverability claims.
- Public smoke confirmed the live localized Nuxt app and API after Fase 9/Sprint 9.10 deploy.

## Dashboard backlog

- DMARC education coverage.
- DNSBL limitation coverage.
- Fix guidance completeness.
