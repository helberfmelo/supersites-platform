<?php

return [
    'webhooks' => [
        'dry_run_enabled' => env('BILLING_WEBHOOK_DRY_RUN_ENABLED', false),
        'dry_run_secret' => env('BILLING_WEBHOOK_DRY_RUN_SECRET'),
        'replay_window_seconds' => (int) env('BILLING_WEBHOOK_REPLAY_WINDOW_SECONDS', 300),
        'max_payload_bytes' => (int) env('BILLING_WEBHOOK_MAX_PAYLOAD_BYTES', 65536),
    ],
];
