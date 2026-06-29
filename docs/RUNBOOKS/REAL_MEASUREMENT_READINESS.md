# Real Measurement Readiness

This runbook covers Sprint 12.1 measurement gates for public Lighthouse/LHCI evidence.

## Scope

- Measure public SuperSites pages with versioned `lighthouse` and `@lhci/cli`.
- Store reports under `artifacts/lighthouse-public/` and `artifacts/lhci-public/`.
- Use public URLs only; do not use PageSpeed API, Google properties, AdSense tags, billing providers, donation providers, affiliate providers or credentials.
- Treat scores as point-in-time technical evidence, not revenue, ranking or causality claims.

## Local Commands

Run the quick sample:

```powershell
pnpm measure:lighthouse-public
```

Run the full public sample:

```powershell
pnpm measure:lighthouse-public -- --mode=full
```

Fail the command when configured thresholds are below target:

```powershell
pnpm measure:lighthouse-public -- --mode=quick --fail-on-thresholds
```

Run LHCI with filesystem upload:

```powershell
$env:CHROME_PATH = node -e "const { chromium } = require('@playwright/test'); console.log(chromium.executablePath())"
pnpm measure:lhci-public
```

## CI Workflow

`Public Measurement Readiness` is manual-only (`workflow_dispatch`) and accepts:

- `mode`: `quick` or `full`.
- `fail_on_thresholds`: boolean.

The workflow installs dependencies, installs Chromium through Playwright, configures `CHROME_PATH`, runs `pnpm measure:lighthouse-public`, runs `pnpm measure:lhci-public`, publishes the Markdown summary and uploads artifacts.

## Thresholds

The default review thresholds are:

- Performance: 60.
- Accessibility: 80.
- Best practices: 80.
- SEO: 80.

Threshold misses are recorded as `needs-review`. They only fail the wrapper when `--fail-on-thresholds` is provided.

## Human Gates

The following remain blocked until explicitly approved and documented in `docs/HUMAN_ACTION_REQUIRED.md`:

- PageSpeed API key.
- GA4, GTM, Search Console property creation or verification.
- AdSense publisher ID, `ads.txt`, ad tags or real ad requests.
- Billing, donation or affiliate provider activation.
- Any provider terms acceptance, KYC, tax, bank, PIN or irreversible account action.

## Evidence Handling

- Commit code, configs and docs only.
- Do not commit files under `artifacts/`.
- Record local run directory, CI run ID and public smoke result in `docs/STATUS.md` for sprint closure.
