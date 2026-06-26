# i18n

Locale routing, translations, formatting and translation QA helpers.

## Sprint 1.3 baseline

- Canonical initial locales: `en`, `pt-br`, `es`, `fr`, `de`.
- Locale metadata includes `htmlLang`, `hreflang` and Intl locale codes.
- Route helpers generate stable localized URLs without IP-based redirects.
- Language selector options and Intl date/number/currency formatters are shared by apps.

Run:

```powershell
pnpm --filter @supersites/i18n test
pnpm --filter @supersites/i18n typecheck
```
