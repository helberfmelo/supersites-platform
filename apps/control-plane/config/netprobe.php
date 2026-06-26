<?php

return [
    'monitoring' => [
        'default_frequency_minutes' => 60,
        'minimum_frequency_minutes' => 60,
        'maximum_frequency_minutes' => 1440,
        'due_dispatch_limit' => 50,
    ],

    'quotas' => [
        'free_preview' => [
            'max_monitors' => 3,
            'allowed_types' => ['dns', 'ssl', 'domain'],
        ],
    ],

    'alerts' => [
        'email_delivery_enabled' => env('NETPROBE_ALERT_EMAIL_ENABLED', true),
        'webhook_delivery_enabled' => env('NETPROBE_ALERT_WEBHOOK_ENABLED', false),
    ],
];
