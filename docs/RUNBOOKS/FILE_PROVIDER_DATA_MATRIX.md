# File Provider Data Matrix

Data-base: 2026-06-29

## Scope

This runbook governs future PixelBatch and DocShift features that would move file processing from browser-only workflows to server-side queues or third-party providers.

Current state remains unchanged:

- PixelBatch processes one selected image in the browser.
- DocShift processes small PDF/text workflows in the browser.
- No upload API, provider SDK, OCR provider, AI provider, server queue, persistent file storage, paid API, checkout, billing, ads or external analytics is active.

## Hard Gates

Before any file provider/upload workflow is activated, all items below must be approved and implemented:

- Human approval for provider terms, data transfer, cost model, legal basis and public disclosure.
- File-type validation, size quotas, abuse limits and malware/sandbox strategy where applicable.
- Retention policy with short default lifetime, automatic deletion and user-visible deletion/export rules for account-backed jobs.
- Encryption in transit and at rest for queued files, plus secret storage outside the repository.
- Analytics contract confirming no file names, document text, image metadata, page ranges, OCR text, provider result payloads or output bytes are emitted.
- Billing entitlement gate for paid queues/API before charging or exposing production usage.
- Updated privacy/legal copy reviewed for all five locales before public provider launch.

## PixelBatch Matrix

| Future workflow | Current free path | Data if enabled | Required gate |
|---|---|---|---|
| Background cleanup | Browser-side resize/crop/compress/convert/metadata cleanup for one image | Image bytes, derived masks, previews, output files, provider job id | Provider terms, AI disclosure, retention/deletion, cost control, user consent/copy review |
| High-volume conversion | One selected image in browser memory and object URLs | File names, image bytes, dimensions, job metadata, output format, delivery status | Account auth, quotas, upload validation, sandbox, retention/export/delete, billing entitlement |
| API and integrations | No upload API, webhook, connector or saved preset storage | API identity, file payloads, job ids, callback URLs, audit events | Signed requests, rate limits, webhook security, abuse review, terms and billing |

## DocShift Matrix

| Future workflow | Current free path | Data if enabled | Required gate |
|---|---|---|---|
| OCR and table extraction | Browser-side PDF edits and text-to-PDF with pdf-lib | PDF bytes, page images, extracted text, tables, language hints, confidence scores | OCR/provider terms, confidentiality, retention/deletion, accuracy disclaimers, copy review |
| Office and image conversion | Plain text to PDF and browser-side PDF transforms only | Uploaded files, embedded images, metadata, generated PDFs, conversion logs | File-type validation, sandbox, antivirus where applicable, retention/export/delete |
| Batch queue and API | No upload API, saved history, workspace, webhook or server queue | Account identity, file payloads, job ids, status history, callbacks, audit events | Auth, quotas, signed requests, webhook security, billing entitlement, retention and privacy terms |

## Operational Rule

If a future sprint needs any of these workflows, it must reference this runbook, update `docs/DATA_GOVERNANCE.md`, update `docs/HUMAN_ACTION_REQUIRED.md` if human gates remain open, add tests proving fail-closed provider behavior, and pass public-copy/AdSense-safe gates before any deploy.
