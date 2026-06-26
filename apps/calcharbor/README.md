# CalcHarbor

Financial and business calculators with formulas and interpretation.

## Local commands

```powershell
pnpm --filter @supersites/calcharbor test
pnpm --filter @supersites/calcharbor build
pwsh -NoProfile -ExecutionPolicy Bypass -File scripts\validate-calcharbor-preview.ps1
pnpm test:e2e:calcharbor
```

The MVP runs calculations in the browser. No account, external analytics, ads,
billing, API, worker or production cron is active in Sprint 3.1.
