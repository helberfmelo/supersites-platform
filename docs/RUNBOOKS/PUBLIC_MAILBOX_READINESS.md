# Runbook - Public mailbox readiness

## Scope

This runbook checks only the public DNS route and encrypted mail ports for `contact@opentshost.com`. It never reads credentials, authenticates, sends mail or changes the provider account.

## Technical check

Run:

```powershell
pnpm ops:mailbox-readiness
```

Expected checks:

- at least one MX record for `opentshost.com`;
- TCP connectivity to `mail.opentshost.com:465` for SMTP over TLS;
- TCP connectivity to `mail.opentshost.com:993` for IMAP over TLS.

Save evidence under `artifacts/` only when an operational review needs it. Do not commit mailbox exports, message content, credentials or provider screenshots containing personal data.

## Human closeout

The technical result does not prove that the mailbox exists or is monitored. A human must still authenticate through the provider, send a harmless delivery test, confirm replies, assign triage ownership and define retention and sensitive-attachment handling. Until then, the corresponding item remains in `docs/HUMAN_ACTION_REQUIRED.md` and no SLA is promised.
