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

    'propagation' => [
        'cache_ttl_seconds' => env('NETPROBE_PROPAGATION_CACHE_TTL_SECONDS', 120),
        'google_ecs' => [
            'endpoint' => env('NETPROBE_PROPAGATION_GOOGLE_ECS_ENDPOINT', 'https://dns.google/resolve'),
            'timeout_seconds' => env('NETPROBE_PROPAGATION_GOOGLE_ECS_TIMEOUT_SECONDS', 3.0),
            'verify_tls' => env('NETPROBE_PROPAGATION_GOOGLE_ECS_VERIFY_TLS', true),
            'max_locations' => env('NETPROBE_PROPAGATION_GOOGLE_ECS_MAX_LOCATIONS', 24),
            'locations' => [
                ['resolver_id' => 'matrix-us-san-jose', 'region' => 'Americas', 'city' => 'San Jose, CA', 'country' => 'United States', 'country_code' => 'US', 'latitude' => 37.3382, 'longitude' => -121.8863, 'client_subnet' => '64.6.64.0/24'],
                ['resolver_id' => 'matrix-us-los-angeles', 'region' => 'Americas', 'city' => 'Los Angeles, CA', 'country' => 'United States', 'country_code' => 'US', 'latitude' => 34.0522, 'longitude' => -118.2437, 'client_subnet' => '76.76.2.0/24'],
                ['resolver_id' => 'matrix-us-dallas', 'region' => 'Americas', 'city' => 'Dallas, TX', 'country' => 'United States', 'country_code' => 'US', 'latitude' => 32.7767, 'longitude' => -96.7970, 'client_subnet' => '9.9.9.0/24'],
                ['resolver_id' => 'matrix-us-providence', 'region' => 'Americas', 'city' => 'Providence, RI', 'country' => 'United States', 'country_code' => 'US', 'latitude' => 41.8240, 'longitude' => -71.4128, 'client_subnet' => '208.67.222.0/24'],
                ['resolver_id' => 'matrix-ca-toronto', 'region' => 'Americas', 'city' => 'Toronto, ON', 'country' => 'Canada', 'country_code' => 'CA', 'latitude' => 43.6532, 'longitude' => -79.3832, 'client_subnet' => '149.112.121.0/24'],
                ['resolver_id' => 'matrix-mx-mexico-city', 'region' => 'Americas', 'city' => 'Mexico City', 'country' => 'Mexico', 'country_code' => 'MX', 'latitude' => 19.4326, 'longitude' => -99.1332, 'client_subnet' => '200.33.146.0/24'],
                ['resolver_id' => 'matrix-br-sao-paulo', 'region' => 'South America', 'city' => 'Sao Paulo', 'country' => 'Brazil', 'country_code' => 'BR', 'latitude' => -23.5505, 'longitude' => -46.6333, 'client_subnet' => '200.160.0.0/24'],
                ['resolver_id' => 'matrix-br-santa-cruz', 'region' => 'South America', 'city' => 'Santa Cruz do Sul', 'country' => 'Brazil', 'country_code' => 'BR', 'latitude' => -29.7225, 'longitude' => -52.4346, 'client_subnet' => '200.160.2.0/24'],
                ['resolver_id' => 'matrix-es-paterna', 'region' => 'Europe', 'city' => 'Paterna de Rivera', 'country' => 'Spain', 'country_code' => 'ES', 'latitude' => 36.5220, 'longitude' => -5.8660, 'client_subnet' => '80.58.61.0/24'],
                ['resolver_id' => 'matrix-fr-paris', 'region' => 'Europe', 'city' => 'Paris', 'country' => 'France', 'country_code' => 'FR', 'latitude' => 48.8566, 'longitude' => 2.3522, 'client_subnet' => '80.67.169.0/24'],
                ['resolver_id' => 'matrix-nl-diemen', 'region' => 'Europe', 'city' => 'Diemen', 'country' => 'Netherlands', 'country_code' => 'NL', 'latitude' => 52.3380, 'longitude' => 4.9600, 'client_subnet' => '185.228.168.0/24'],
                ['resolver_id' => 'matrix-de-frankfurt', 'region' => 'Europe', 'city' => 'Frankfurt', 'country' => 'Germany', 'country_code' => 'DE', 'latitude' => 50.1109, 'longitude' => 8.6821, 'client_subnet' => '194.25.0.0/24'],
                ['resolver_id' => 'matrix-ru-st-petersburg', 'region' => 'Europe', 'city' => 'St Petersburg', 'country' => 'Russia', 'country_code' => 'RU', 'latitude' => 59.9311, 'longitude' => 30.3609, 'client_subnet' => '77.88.8.0/24'],
                ['resolver_id' => 'matrix-za-cullinan', 'region' => 'Africa', 'city' => 'Cullinan', 'country' => 'South Africa', 'country_code' => 'ZA', 'latitude' => -25.6709, 'longitude' => 28.5236, 'client_subnet' => '196.25.1.0/24'],
                ['resolver_id' => 'matrix-tr-antalya', 'region' => 'Europe / Asia', 'city' => 'Antalya', 'country' => 'Turkey', 'country_code' => 'TR', 'latitude' => 36.8969, 'longitude' => 30.7133, 'client_subnet' => '195.175.39.0/24'],
                ['resolver_id' => 'matrix-pk-rawalpindi', 'region' => 'Asia', 'city' => 'Rawalpindi', 'country' => 'Pakistan', 'country_code' => 'PK', 'latitude' => 33.5651, 'longitude' => 73.0169, 'client_subnet' => '203.99.163.0/24'],
                ['resolver_id' => 'matrix-in-coimbatore', 'region' => 'Asia', 'city' => 'Coimbatore', 'country' => 'India', 'country_code' => 'IN', 'latitude' => 11.0168, 'longitude' => 76.9558, 'client_subnet' => '202.56.230.0/24'],
                ['resolver_id' => 'matrix-th-bangkok', 'region' => 'Asia', 'city' => 'Bangkok', 'country' => 'Thailand', 'country_code' => 'TH', 'latitude' => 13.7563, 'longitude' => 100.5018, 'client_subnet' => '203.144.207.0/24'],
                ['resolver_id' => 'matrix-sg-singapore', 'region' => 'Asia', 'city' => 'Singapore', 'country' => 'Singapore', 'country_code' => 'SG', 'latitude' => 1.3521, 'longitude' => 103.8198, 'client_subnet' => '165.21.83.0/24'],
                ['resolver_id' => 'matrix-cn-beijing', 'region' => 'Asia', 'city' => 'Beijing', 'country' => 'China', 'country_code' => 'CN', 'latitude' => 39.9042, 'longitude' => 116.4074, 'client_subnet' => '223.5.5.0/24'],
                ['resolver_id' => 'matrix-kr-seoul', 'region' => 'Asia', 'city' => 'Seoul', 'country' => 'South Korea', 'country_code' => 'KR', 'latitude' => 37.5665, 'longitude' => 126.9780, 'client_subnet' => '168.126.63.0/24'],
                ['resolver_id' => 'matrix-jp-tokyo', 'region' => 'APAC', 'city' => 'Tokyo', 'country' => 'Japan', 'country_code' => 'JP', 'latitude' => 35.6762, 'longitude' => 139.6503, 'client_subnet' => '210.130.1.0/24'],
                ['resolver_id' => 'matrix-au-adelaide', 'region' => 'APAC', 'city' => 'Adelaide', 'country' => 'Australia', 'country_code' => 'AU', 'latitude' => -34.9285, 'longitude' => 138.6007, 'client_subnet' => '139.130.4.0/24'],
                ['resolver_id' => 'matrix-au-melbourne', 'region' => 'APAC', 'city' => 'Melbourne, VIC', 'country' => 'Australia', 'country_code' => 'AU', 'latitude' => -37.8136, 'longitude' => 144.9631, 'client_subnet' => '203.50.2.0/24'],
            ],
        ],
    ],
];
