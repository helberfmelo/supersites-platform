# CalcHarbor SEO/AIO Refinement Plan

Data-base: 2026-06-27

## References

- Calculator.net category depth.
- Omni Calculator guided explanations.
- CalculatorSoup formula and step-by-step style.

## P0

- Strengthen direct-answer summaries on each calculator page.
- Add original examples, assumptions, common mistakes and how-to-interpret sections.
- Ensure FAQ schema reflects real FAQ content.
- Keep canonical/hreflang stable for all five locales.

## Sprint 9.12 progress

- Added scenario comparison ranges and detail-page scenario snapshots, improving direct-answer density and making assumptions visible near calculator outputs.
- Reused tested calculator formulas for low/base/high scenarios so the AIO-facing summary remains consistent with on-page results.
- Full live audit before implementation still found broad JSON-LD coverage gaps across the portfolio; CalcHarbor-specific schema expansion remains in the later SEO/AIO sprint rather than this UI-density sprint.

## P1

- Add glossary terms for APR, margin, break-even, ROI and fixed/variable costs.
- Add localized caveats where country-specific rules may vary.

## P2

- Plan additional calculators only when they add original utility and can be tested.

## Impact expected

Improved organic match for business calculator intent while avoiding thin pages.

## Technical risk

Low for content; medium for new calculator routes.

## AdSense/compliance risk

Medium for financial claims. Avoid investment, tax or legal advice.

## Tests needed

- Static route and sitemap checks.
- Formula examples checked by unit tests.
- Metadata and schema checks.

## Acceptance metrics

- Every calculator has formula, example, interpretation, FAQ and related tools.
- Calculator pages expose benchmark-grade scenario context without collecting or storing input values.
- Any tax/legal/fiscal topic is marked human-gated.

## Dashboard backlog

- Pages missing formula block.
- Pages missing localized caveat.
- New calculator opportunities by evidence.
