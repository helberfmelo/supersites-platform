# InvoiceCraft Sprint Plan

Data-base: 2026-06-27

## Real sprint

- Symbol: BR-INVOICECRAFT.
- Real number: Sprint 7.8.
- Must run after: Sprint 7.7.

## Current state

- Nuxt SSG app exists with invoice, quote and receipt builders and local PDF output.
- Public URL remains placeholder-only until app-specific deploy/smoke/rollback exists.

## Scope

- Editor/preview/PDF UX refinement.
- Tax/legal-safe SEO/AIO content.
- Inert monetization/support structure.

## Validation

- `pnpm test:invoicecraft`
- `pnpm build:invoicecraft`
- `pnpm validate:invoicecraft-preview`
- `pnpm test:e2e:invoicecraft`
- Standard structure/secrets/dry-run/ci/diff gates.

## Gates

- No official tax templates or fiscal numbering.
- No payment collection, checkout, webhooks or saved customer data.
- No analytics values from document fields or PDFs.

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
