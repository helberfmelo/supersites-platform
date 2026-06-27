# ADR 0022 - PixelBatch browser image MVP

Date: 2026-06-27

## Status

Accepted

## Context

Sprint 5.1 starts Phase 5, the file-processing phase. PixelBatch must solve a basic image workflow without mandatory signup: resize, crop, compress, convert, remove metadata and provide previews. The paid roadmap includes batch folders, presets, larger files, API, integrations, high-resolution queues and AI features.

Image files may include private photos, product imagery, geolocation metadata, camera identifiers or confidential creative assets. Server-side upload processing would require retention, sandboxing, antivirus where applicable, quotas, temp cleanup and legal/provider review before launch.

## Decision

PixelBatch Sprint 5.1 is implemented as a Nuxt SSG/browser-side MVP in `apps/pixelbatch`.

- The free scope includes six tools: `image-compressor`, `image-resizer`, `image-cropper`, `image-converter`, `metadata-remover` and `social-preset-generator`.
- One image at a time is processed in the browser with a 10 MB free limit.
- A browser worker validates MIME type, size, dimensions and requested output settings, then returns a transform plan.
- Canvas renders and re-encodes the selected image for resize, crop, compression, conversion or metadata-cleaning output.
- The app uses object URLs and revokes them after use; it does not create a product upload API, write to browser storage or persist files.
- Analytics is limited to `tool_viewed`, `tool_started`, `file_processed`, `tool_completed`, `tool_failed` and `file_downloaded` with `tool_slug`, locale and sanitized route path only.
- File names, pixels, dimensions, selected settings, metadata, generated blob sizes and image contents are not sent to analytics, logs, data layer or backend.

No server-side batch worker, API access, large-file queue, saved preset storage, AI provider, billing, AdSense placement, external analytics provider or real PixelBatch traffic switch is activated in Sprint 5.1.

## Consequences

The MVP is useful locally/CI while keeping file-processing risk low and cheap to operate. Metadata removal is implemented as a clean browser re-encode rather than forensic metadata parsing.

Before public launch or paid workflow activation, PixelBatch still needs app-specific HostGator artifact validation, public smoke, rollback, upload validation if server-side processing is introduced, sandboxing/antivirus where applicable, retention/export/deletion rules, quota enforcement, account/billing/entitlement gates, AI/provider review and legal review.
