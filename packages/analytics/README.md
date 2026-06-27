# Analytics

PII-safe event contracts, data layer helpers and internal metric utilities.

Rules:

- Only allow versioned event names.
- Do not carry PII into data layer payloads.
- Strip URL query strings and fragments before analytics storage.
- Keep browser collection local until consent and external integrations are approved.
- Keep Google Analytics, Google Tag Manager and Search Console behind the Google
  integration gate until human approval, consent, production config and verified
  properties are all present.
- Export only the Google provider allowlist in `googleAllowedEventParameterNames`.
