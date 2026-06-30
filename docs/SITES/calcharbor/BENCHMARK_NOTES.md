# CalcHarbor Benchmark Notes

Data-base: 2026-06-27

## References

- Calculator.net
- Omni Calculator
- CalculatorSoup
- UnitConverters
- Finance and business calculators listed in `docs/BENCHMARK_FRONTEND_REFINEMENT_PROMPT.md`.

## Screenshots available

- No CalcHarbor-specific screenshots are present yet.

## Useful patterns to learn

- Put the calculator and primary result above the fold.
- Show formula, assumptions and step-by-step memory near the result.
- Use examples and interpretation to make financial outputs understandable.
- Cross-link calculators by business intent, not just by generic category.
- Add disclaimers when finance, tax, labor or legal interpretation may vary.

## Do not copy

- Calculator layouts, formula text, examples, icons or proprietary educational copy.

## Opportunities

- Standardize a result card and formula block across calculators.
- Add related calculator clusters and localized disclaimers.
- Prepare export/scenario upsell without limiting the free calculation.

## Sprint 7.4 implementation notes

- Standardized result card, secondary metrics, interpretation card and calculation memory across the four MVP calculators.
- Related calculators are cross-linked by category/order without copying benchmark layouts.
- Workflow upgrade panel is inert and gated; no checkout, ads, donation or affiliate activation was added.

## Sprint 9.12 benchmark-grade implementation notes

- Home now starts with a calculator workbench instead of a catalogue-only first impression: tabs, editable fields, live result, supporting metrics, scenario bars and comparison table are above the catalogue.
- Detail pages now include a scenario snapshot built from the same tested formulas, giving each calculator a denser benchmark-style result area without copying competitor layout or educational text.
- Public copy now avoids MVP/catalogue wording and names browser-side processing, operating principles and workflow checks in user-facing language.
- Free calculation remains complete without signup, storage, checkout, ads, donations, exports, API access or external analytics.
- Remaining benchmark gaps: broader calculator depth, richer schema coverage across generated pages and additional original educational content belong to later Phase 9 sprints.

## Phase 18 Sprint 18.4 catalog route correction notes

- The Hub catalog route `/supersites/en/sites/calcharbor` now behaves like a public calculator directory, not an internal product sheet.
- The first fold is task-first: localized H1, search input, category filters and featured links for Loan Payment, Break-even Point, Gross Margin and ROI.
- The page links only to the 8 existing public calculator routes; future calculator topics are presented as editorial direction without URLs so the Hub does not create thin pages.
- Internal language such as `Temporary public URL`, `Launch order`, `Quality check`, rollout status, billing and ads is blocked by unit/e2e assertions for this route.
- Local evidence before CI/deploy: `artifacts/calcharbor-catalog-qa/calcharbor-catalog-desktop.png` and `artifacts/calcharbor-catalog-qa/calcharbor-catalog-mobile-pt-br.png`; Playwright checked desktop EN/mobile PT-BR, no overflow and localized labels.
