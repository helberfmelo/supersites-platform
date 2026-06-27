# PixelBatch

Sprint 5.1 MVP for browser-side image resize, crop, compression, conversion, metadata cleaning and social presets.

## Scope

- Free browser tools:
  - image compressor;
  - image resizer;
  - image cropper;
  - image converter;
  - metadata remover;
  - social preset generator.
- One image at a time, up to 10 MB, using PNG, JPEG, WebP or browser-supported AVIF.
- Worker planning validates type, size, dimensions and output limits before Canvas renders the result.
- Selected files, pixels, file names, dimensions and output values are not sent to a product API or analytics.
- No localStorage, sessionStorage, account, upload endpoint, batch worker, billing, ads or external analytics are active.

## Upgrade Boundary

Batch folders, larger files, saved presets, integrations, API, high-resolution queues, background jobs and AI credits are not active in this sprint.

Server-side processing, API access, AI/background-removal providers or larger file queues require upload validation, sandboxing, antivirus where applicable, retention/deletion rules, quotas, billing and legal/provider review before activation.

Public traffic remains on the HostGator placeholder until PixelBatch receives app-specific artifact validation, public smoke and rollback/traffic-switch workflows.
