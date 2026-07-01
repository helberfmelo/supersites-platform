# InvoiceCraft Sprint Plan

Data-base: 2026-06-30

## Real sprint

- Symbol: BR-INVOICECRAFT.
- Real number: Sprint 7.8.
- Must run after: Sprint 7.7.

## Current state

- Nuxt SSG app exists with invoice, quote and receipt document studios and local PDF output.
- Public URL is a versioned HostGator static app under internal development production.
- Fase 18.60-18.63 refined the home, invoice, quote and receipt flows around editor/preview/PDF first.

## Scope

- Editor/preview/PDF UX refinement.
- Tax/legal-safe SEO/AIO content.
- Inert monetization/support structure.

## Validation

- `pnpm test:invoicecraft`
- `pnpm build:invoicecraft`
- `pnpm validate:invoicecraft-preview`
- `pnpm validate:public-copy`
- `pnpm validate:secrets`
- `git diff --check`
- `pnpm test:e2e:invoicecraft` only when requested or when Quality Gate exposes a frontend failure.

## Gates

- No official tax templates or fiscal numbering.
- No payment collection, checkout, webhooks or saved customer data.
- No analytics values from document fields or PDFs.
- Optional logo upload remains local PNG/JPEG in browser memory only.

## Sprint 7.8 local implementation note

- Added template tabs, document snapshot, local PDF/download flow, copy text summary, use-case guidance, related document links and gated paid-workflow prompts.
- Local validation passed with `pnpm test:invoicecraft`, `pnpm build:invoicecraft`, `pnpm validate:invoicecraft-preview`, `pnpm test:e2e:invoicecraft`, `pnpm validate:structure`, `pnpm validate:secrets`, `pnpm deploy:dry-run`, `pnpm ci:changes` and `git diff --check`.
- Remote Quality Gate `28288971344`, Deploy Dry Run `28288971346` and public Hub/control-plane/NetProbe smokes passed before Sprint 7.9.

## Benchmark-grade sprint

- Symbol: BGR-INVOICECRAFT-P0.
- Real number: Sprint 9.9.
- Status: completed in production; feature commit, remote CI, deploy and public smoke passed.

## Sprint 9.9 execution notes

- `InvoiceCraftWorkbench` now powers the home and all localized tool pages with invoice/quote/receipt tabs, editable line rows, locale/currency controls, discount, shipping/freight, manual tax/adjustment fields, document snapshot, local PDF download, copy summary, no-storage privacy copy, inert paid workflow and related documents.
- The home opens with Invoice Builder before the catalog, while tool pages keep canonical/hreflang/schema, guide sections, FAQ and review links around the shared workbench.
- Local validation passed: `pnpm test:invoicecraft`, `pnpm build:invoicecraft`, `pnpm validate:invoicecraft-preview` and `pnpm test:e2e:invoicecraft`; Playwright screenshots were inspected for home desktop, editor mobile and privacy mobile.
- Production closure passed: commit `a57083b`, Quality Gate `28319167672`, Deploy Dry Run `28319167671`, Fase 9/Sprint 9.9 deploy `28319247622`, release `a57083b70a60a34b3fc66394a86d27a0c810db52-28319247622-1`, public asset `https://opentshost.com/supersites/invoicecraft/_nuxt/CAuTAoAj.js` and live UX smoke.
- No account, saved client/product, storage, recurrence, branding checkout, payment link, webhook, fiscal numbering, jurisdictional tax automation, billing, ad serving, external analytics or production worker was activated.

## Sprint 18.60-18.63 implementation note

- Home now opens with a compact InvoiceCraft intro followed immediately by the document studio instead of a status/catalog-first surface.
- The shared workbench now lays out editor left and document preview right on desktop, keeps `Download PDF` visible after calculation, recalculates previews locally and supports optional in-memory PNG/JPEG logo preview/PDF embedding.
- Invoice Builder keeps issuer, client, number, issue date, due date, currency, line items, discount, shipping, manual adjustment, notes and terms visible.
- Quote Builder highlights `Valid until`, renders the preview title as `Quote / Estimate` and includes a future convert-to-invoice account workflow note below the result.
- Receipt Builder uses `Paid date`, adds `Paid` status and states below the result that InvoiceCraft does not process or verify payments.
- Top-page technical language such as `Payments and taxes planned`, `MVP`, `gated`, `billing` and `HUMAN_ACTION_REQUIRED` was removed from app surfaces/checks.
- Local validation passed: `pnpm test:invoicecraft`, `pnpm build:invoicecraft`, `pnpm validate:invoicecraft-preview` with asset `/_nuxt/DzUEzIxj.js`, `pnpm validate:public-copy`, `pnpm validate:secrets` and `git diff --check`.
- After the remote Quality Gate exposed an InvoiceCraft Playwright selector ambiguity, the focused `pnpm test:e2e:invoicecraft` suite passed locally with 3 tests.
- Screenshots, crawler, Lighthouse, deploy dry-run and public smokes were intentionally skipped under the current stage-based default.
