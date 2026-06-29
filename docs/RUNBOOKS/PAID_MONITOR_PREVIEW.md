# Paid Monitor Preview Runbook

## Purpose

Validate authenticated upgrade previews for NetProbe, MailHealth and SitePulse without activating paid monitoring.

## Endpoints

- `GET /api/v1/monitoring/previews`
- `POST /api/v1/monitoring/previews`

Both require authentication and `operations.manage`.

## POST Input

```json
{
  "site_slug": "mailhealth",
  "monitor_type": "smtp",
  "target": "example.com",
  "frequency_minutes": 60
}
```

Allowed `site_slug` values:

- `netprobe-atlas`
- `mailhealth`
- `sitepulse-lab`

## Expected Behavior

- The preview resolves `monitor-slots` and `monitor-types` from local `billing_entitlements`.
- Hostname targets are normalized with the shared NetProbe host guard.
- SitePulse URL targets are normalized to HTTP/HTTPS, reject credentials, fragments, query strings and non-standard ports, and use the shared hostname guard.
- The response declares `activation_state=preview_only`, `persisted=false`, `queued=false`, `worker_enabled=false` and `alert_delivery_enabled=false`.
- Audit logs store only `target_hash`.
- No MailHealth/SitePulse monitor table, recurring job, alert delivery, checkout, invoice, paid entitlement mutation or usage billing is created.

## Validation

Run:

```powershell
php artisan test --filter=PaidMonitorPreviewTest
php artisan test
composer validate --strict
```

Before real paid monitors, add worker/runtime validation, backup/restore evidence, alert delivery policy, retention/export/delete matrix, customer-facing terms, billing provider gates and production smokes.
