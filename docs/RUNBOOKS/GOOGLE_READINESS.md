# Google Readiness

This runbook covers Sprint 12.3 readiness checks for GA4, GTM, Search Console and AdSense gates.

## Scope

- Verify that Google and AdSense contracts remain fail-closed.
- Verify that public production code does not include active GA4, GTM, Search Console verification or AdSense snippets.
- Verify that control-plane seed data does not configure provider IDs, tags, imports, publisher IDs, ad serving or Management API.
- Produce JSON/Markdown evidence under `artifacts/google-readiness/`.

This check does not create Google properties, GTM containers, Search Console verifications, AdSense accounts, publisher IDs, `ads.txt`, ad requests or external analytics traffic.

## Command

```powershell
pnpm measure:google-ready
```

To write evidence to a fixed directory:

```powershell
pnpm measure:google-ready -- --output-dir artifacts/google-readiness/manual-review
```

## Checks

The command validates:

- `docs/HUMAN_ACTION_REQUIRED.md` keeps Google access, property creation, verification, AdSense publisher setup, Management API and `ads.txt` behind human gates.
- `@supersites/analytics` keeps GA4/GTM delivery blocked until production, consent, human approval, IDs and Search Console verification are present.
- Google event parameters stay limited to the narrow allowlist documented in `docs/ANALYTICS.md`.
- `@supersites/ads` keeps ad slots inert until delivery gates are explicitly enabled and keeps AdSense site submission non-automatic.
- Laravel seeders keep Google and AdSense readiness records unconfigured.
- Public app/control-plane source contains no active GA4/GTM/Search Console/AdSense markers.
- No public `ads.txt` placeholder exists before an approved publisher ID.
- `validate:adsense-safe-public` still blocks ad, analytics, payment, donation and affiliate markers.

## Human Gates

The following remain blocked until explicitly approved and recorded:

- Google account access, project/property/container creation and terms acceptance.
- GA4 measurement ID and GTM container ID configuration.
- Search Console domain or URL-prefix verification.
- PageSpeed API credentials.
- AdSense legal beneficiary, account reuse/creation, terms, tax, payment profile, bank, PIN, publisher ID, Management API, site submission and `ads.txt`.

## Evidence Handling

- Commit only the script, package command and documentation.
- Do not commit `artifacts/google-readiness/`.
- Record the run ID, check count and provider activation state in `docs/STATUS.md` and `docs/METRICS.md`.
