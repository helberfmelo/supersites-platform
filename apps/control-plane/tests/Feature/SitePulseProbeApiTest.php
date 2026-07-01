<?php

namespace Tests\Feature;

use App\Support\NetProbe\NetProbeDnsResolver;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SitePulseProbeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_probe_returns_status_headers_robots_sitemap_ttfb_and_cache_metadata(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeSitePulseDnsResolver([
            'example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'example.com|AAAA' => [],
        ]));

        Http::fake([
            'https://example.com/robots.txt' => Http::response("User-agent: *\nAllow: /\nSitemap: https://example.com/sitemap.xml\n", 200, [
                'Content-Type' => 'text/plain',
            ]),
            'https://example.com/sitemap.xml' => Http::response('<urlset><url><loc>https://example.com/</loc></url></urlset>', 200, [
                'Content-Type' => 'application/xml',
            ]),
            'https://example.com/*' => Http::response('<html>ok</html>', 200, [
                'Content-Type' => 'text/html',
                'Strict-Transport-Security' => 'max-age=31536000',
                'Content-Security-Policy' => "default-src 'self'",
                'X-Frame-Options' => 'DENY',
                'Referrer-Policy' => 'strict-origin-when-cross-origin',
                'Permissions-Policy' => 'geolocation=()',
                'X-Content-Type-Options' => 'nosniff',
            ]),
        ]);

        $payload = [
            'url' => 'Example.COM',
            'checks' => ['performance'],
        ];

        $this->postJson('/api/v1/sitepulse/probe', $payload)
            ->assertOk()
            ->assertJsonPath('data.url', 'https://example.com/')
            ->assertJsonPath('data.final_url', 'https://example.com/')
            ->assertJsonPath('data.status', 'pass')
            ->assertJsonPath('data.checks.status.code', 200)
            ->assertJsonPath('data.checks.headers.missing', [])
            ->assertJsonPath('data.checks.robots.status', 200)
            ->assertJsonPath('data.checks.sitemap.xml_shape', 'urlset')
            ->assertJsonPath('data.checks.sitemap.url_count', 1)
            ->assertJsonPath('meta.cached', false)
            ->assertJsonPath('meta.cache_ttl_seconds', 30);

        $this->postJson('/api/v1/sitepulse/probe', $payload)
            ->assertOk()
            ->assertJsonPath('meta.cached', true);
    }

    public function test_redirect_chain_revalidates_each_public_hop(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeSitePulseDnsResolver([
            'example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'example.com|AAAA' => [],
            'www.example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.35'],
            ],
            'www.example.com|AAAA' => [],
        ]));

        Http::fake([
            'https://example.com/*' => Http::response('', 301, [
                'Location' => 'https://www.example.com/final',
            ]),
            'https://www.example.com/*' => Http::response('final', 200, [
                'Content-Type' => 'text/html',
            ]),
        ]);

        $this->postJson('/api/v1/sitepulse/probe', [
            'url' => 'https://example.com',
            'checks' => ['redirects'],
        ])->assertOk()
            ->assertJsonPath('data.final_url', 'https://www.example.com/final')
            ->assertJsonPath('data.redirect_chain.0.status', 301)
            ->assertJsonPath('data.redirect_chain.1.status', 200)
            ->assertJsonPath('data.findings.1.label', 'Redirect count')
            ->assertJsonPath('data.findings.1.value', 1);
    }

    public function test_probe_rejects_private_resolution_invalid_checks_and_non_web_ports(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeSitePulseDnsResolver([
            'private.example.com|A' => [
                ['type' => 'A', 'ttl' => 60, 'ip' => '10.0.0.5'],
            ],
            'private.example.com|AAAA' => [],
        ]));

        $this->postJson('/api/v1/sitepulse/probe', [
            'url' => 'https://private.example.com',
            'checks' => ['status'],
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');

        $this->postJson('/api/v1/sitepulse/probe', [
            'url' => 'https://example.com:8443',
            'checks' => ['status'],
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('url');

        $this->postJson('/api/v1/sitepulse/probe', [
            'url' => 'https://example.com',
            'checks' => ['portscan'],
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('checks');
    }

    public function test_sitepulse_public_rate_limit_is_applied(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeSitePulseDnsResolver([
            'example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'example.com|AAAA' => [],
        ]));
        Http::fake([
            'https://example.com/*' => Http::response('ok', 200, ['Content-Type' => 'text/plain']),
        ]);

        for ($i = 0; $i < 20; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.77'])
                ->postJson('/api/v1/sitepulse/probe', [
                    'url' => 'https://example.com',
                    'checks' => ['status'],
                ])->assertOk();
        }

        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.77'])
            ->postJson('/api/v1/sitepulse/probe', [
                'url' => 'https://example.com',
                'checks' => ['status'],
            ])->assertTooManyRequests();
    }
}

class FakeSitePulseDnsResolver implements NetProbeDnsResolver
{
    /**
     * @param array<string, array<int, array<string, mixed>>> $records
     */
    public function __construct(private readonly array $records)
    {
    }

    public function resolve(string $hostname, string $type): array
    {
        return $this->records[strtolower($hostname).'|'.strtoupper($type)] ?? [];
    }
}
