# DevUtility Lab

Developer utilities for parsing, encoding, diffs, regex, cron, UUID, timestamp and hashes.

## Sprint 3.2 MVP

- Nuxt app at `apps/devutility-lab` with 9 browser-side tools.
- Free tools cover JSON/XML/YAML/CSV formatting, Base64, JWT inspection, regex, diff, cron, UUID, timestamp and SHA hashes.
- Snippets are processed client-side and routed through a Web Worker when supported.
- Analytics events are limited to `tool_slug`, route, locale and event name; pasted snippets and results are not tracked.
- Ads, billing, private history, workspaces, batch processing, larger files and API access remain gated.

## Sprint 7.5 benchmark refinement

- Tool pages use a split local workbench with examples, input metrics and empty/running/success/error states.
- Successful results can be copied or downloaded as local `.txt` files without product API calls.
- Each tool page includes common-error guidance, related tools and an inert gated upgrade panel.
- Public production remains a placeholder until app-specific artifact validation, smoke and rollback exist.

## Local Commands

```powershell
pnpm --filter @supersites/devutility-lab test
pnpm --filter @supersites/devutility-lab build
pnpm validate:devutility-preview
pnpm test:e2e:devutility
```
