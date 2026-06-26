# Consent

CMP, Consent Mode and regional privacy controls.

## Sprint 1.3 baseline

- Consent categories: necessary, preferences, analytics and ads.
- Necessary storage remains enabled; analytics and ads default to denied.
- Consent Mode state mapping is available before GA4/AdSense integration.
- Ad placement safety rules block ads on admin, login, checkout, account, error and upload/progress surfaces.

Run:

```powershell
pnpm --filter @supersites/consent test
pnpm --filter @supersites/consent typecheck
```
