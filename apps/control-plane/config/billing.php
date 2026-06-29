<?php

return [
    'webhooks' => [
        'dry_run_enabled' => env('BILLING_WEBHOOK_DRY_RUN_ENABLED', false),
        'dry_run_secret' => env('BILLING_WEBHOOK_DRY_RUN_SECRET'),
        'replay_window_seconds' => (int) env('BILLING_WEBHOOK_REPLAY_WINDOW_SECONDS', 300),
        'max_payload_bytes' => (int) env('BILLING_WEBHOOK_MAX_PAYLOAD_BYTES', 65536),
    ],

    'monitor_previews' => [
        'default_frequency_minutes' => 60,
        'minimum_frequency_minutes' => 60,
        'maximum_frequency_minutes' => 1440,
        'products' => [
            'netprobe-atlas' => [
                'name' => 'NetProbe Atlas',
                'target_kind' => 'hostname',
                'fallback_max_monitors' => 3,
                'allowed_types' => ['dns', 'ssl', 'domain'],
            ],
            'mailhealth' => [
                'name' => 'MailHealth',
                'target_kind' => 'hostname',
                'fallback_max_monitors' => 3,
                'allowed_types' => ['dns', 'blacklist', 'smtp'],
            ],
            'sitepulse-lab' => [
                'name' => 'SitePulse Lab',
                'target_kind' => 'url',
                'fallback_max_monitors' => 3,
                'allowed_types' => ['status', 'headers', 'robots', 'sitemap'],
            ],
        ],
    ],
];
