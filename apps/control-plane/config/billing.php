<?php

return [
    'providers' => [
        'stripe' => [
            'restricted_key' => env('STRIPE_RESTRICTED_KEY'),
            'publishable_key' => env('STRIPE_PUBLISHABLE_KEY'),
            'secret_key' => env('STRIPE_SECRET_KEY'),
            'webhook_secret' => env('STRIPE_WEBHOOK_SECRET'),
            'checkout_sessions_endpoint' => env('STRIPE_CHECKOUT_SESSIONS_ENDPOINT', 'https://api.stripe.com/v1/checkout/sessions'),
            'checkout_enabled' => env('BILLING_STRIPE_CHECKOUT_ENABLED', false),
            'donations_enabled' => env('BILLING_STRIPE_DONATIONS_ENABLED', false),
            'service_checkout_enabled' => env('BILLING_STRIPE_SERVICE_CHECKOUT_ENABLED', false),
            'webhooks_enabled' => env('BILLING_STRIPE_WEBHOOKS_ENABLED', false),
            'revenue_import_enabled' => env('BILLING_STRIPE_REVENUE_IMPORT_ENABLED', false),
            'allowed_donation_amounts' => [
                'USD' => array_values(array_filter(array_map(
                    'intval',
                    explode(',', env('BILLING_STRIPE_ALLOWED_DONATION_AMOUNTS_USD', '500,1000,2500,5000')),
                ), fn (int $amount): bool => $amount > 0)),
                'BRL' => array_values(array_filter(array_map(
                    'intval',
                    explode(',', env('BILLING_STRIPE_ALLOWED_DONATION_AMOUNTS_BRL', '1000,2500,5000,10000')),
                ), fn (int $amount): bool => $amount > 0)),
                'EUR' => array_values(array_filter(array_map(
                    'intval',
                    explode(',', env('BILLING_STRIPE_ALLOWED_DONATION_AMOUNTS_EUR', '500,1000,2500,5000')),
                ), fn (int $amount): bool => $amount > 0)),
            ],
            'service_catalog' => [
                'custom-service-deposit' => [
                    'name' => 'SuperSites custom service deposit',
                    'amount_minor' => (int) env('BILLING_STRIPE_CUSTOM_SERVICE_DEPOSIT_AMOUNT_MINOR', 10000),
                    'currency' => env('BILLING_STRIPE_CUSTOM_SERVICE_DEPOSIT_CURRENCY', 'USD'),
                    'enabled' => env('BILLING_STRIPE_CUSTOM_SERVICE_DEPOSIT_ENABLED', false),
                ],
            ],
        ],
    ],

    'checkout_enabled' => env('BILLING_CHECKOUT_ENABLED', false),
    'checkout_return_base_url' => env('BILLING_CHECKOUT_RETURN_BASE_URL', env('APP_URL')),
    'provider_activation_enabled' => env('BILLING_PROVIDER_ACTIVATION', false),

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
