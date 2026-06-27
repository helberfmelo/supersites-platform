# QRRoute Monetization Refinement Plan

Data-base: 2026-06-27

## References

- QR dynamic plan upsells.
- TinyURL link-management monetization.

## P0

- Add gated CTAs for dynamic QR, editable destination, analytics, custom domain, batch, branding and API.
- Keep free static QR and UTM builder fully functional.
- Keep ads/support away from QR preview, fields and download buttons.

## P1

- Define abuse-review requirements for public short links.
- Add dashboard backlog for phishing/spam reporting and takedown process.

## P2

- Activate billing/short links only after auth, entitlements, antiabuse, retention and legal gates.

## Impact expected

Clear paid differentiation without hiding the basic static QR result.

## Technical risk

High for future public redirects; low for inert CTAs.

## AdSense/compliance risk

Medium to high if short links are public without controls. Keep gated.

## Tests needed

- Verify no public short-link creation.
- Verify no active checkout/ad serving/donation payment.
- Redirect guard regression.

## Acceptance metrics

- Public dynamic QR creation remains disabled.
- Real ad serving remains `0`.
- Abuse controls are documented before any public redirect expansion.

## Dashboard backlog

- Dynamic QR readiness.
- Abuse/takedown workflow.
- Custom domain gate.
