<?php

namespace Tests\Feature;

use App\Support\NetProbe\NetProbeDnsResolver;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class NetProbeApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_ip_endpoint_returns_request_address_without_persisting_it(): void
    {
        $this->withServerVariables(['REMOTE_ADDR' => '10.20.30.40'])
            ->getJson('/api/v1/netprobe/ip')
            ->assertOk()
            ->assertJsonPath('data.address', '10.20.30.40')
            ->assertJsonPath('data.version', 'IPv4')
            ->assertJsonPath('data.is_public', false)
            ->assertJsonPath('meta.retention', 'not_stored_by_this_endpoint');
    }

    public function test_dns_lookup_returns_normalized_records_and_uses_cache(): void
    {
        $resolver = new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'AAAA' => [],
            'MX' => [
                ['type' => 'MX', 'ttl' => 180, 'pri' => 10, 'target' => 'mail.example.com'],
            ],
            'TXT' => [
                ['type' => 'TXT', 'ttl' => 90, 'txt' => 'v=spf1 -all'],
            ],
        ]);
        $this->app->instance(NetProbeDnsResolver::class, $resolver);

        $payload = [
            'domain' => 'Example.COM.',
            'types' => ['A', 'MX', 'TXT'],
        ];

        $this->postJson('/api/v1/netprobe/dns', $payload)
            ->assertOk()
            ->assertJsonPath('data.domain', 'example.com')
            ->assertJsonPath('data.checked_addresses.0', '93.184.216.34')
            ->assertJsonPath('data.records.A.0.value', '93.184.216.34')
            ->assertJsonPath('data.records.MX.0.fields.priority', 10)
            ->assertJsonPath('data.records.TXT.0.value', 'v=spf1 -all')
            ->assertJsonPath('meta.cache_ttl_seconds', 90)
            ->assertJsonPath('meta.cached', false);

        $this->postJson('/api/v1/netprobe/dns', $payload)
            ->assertOk()
            ->assertJsonPath('meta.cached', true);

        $this->assertSame(4, $resolver->calls);
    }

    public function test_dns_lookup_rejects_invalid_inputs_and_private_resolution(): void
    {
        $this->postJson('/api/v1/netprobe/dns', [
            'domain' => 'https://example.com/path',
            'types' => ['A'],
        ])->assertUnprocessable();

        $this->postJson('/api/v1/netprobe/dns', [
            'domain' => 'router.local',
            'types' => ['A'],
        ])->assertUnprocessable();

        $this->postJson('/api/v1/netprobe/dns', [
            'domain' => 'example.com',
            'types' => ['SRV'],
        ])->assertUnprocessable();

        $this->app->instance(NetProbeDnsResolver::class, new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 60, 'ip' => '10.0.0.5'],
            ],
            'AAAA' => [],
        ]));

        $this->postJson('/api/v1/netprobe/dns', [
            'domain' => 'private.example.com',
            'types' => ['A'],
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');
    }

    public function test_netprobe_public_rate_limit_is_applied(): void
    {
        Cache::flush();

        for ($i = 0; $i < 30; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.22'])
                ->getJson('/api/v1/netprobe/ip')
                ->assertOk();
        }

        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.22'])
            ->getJson('/api/v1/netprobe/ip')
            ->assertTooManyRequests();
    }
}

class FakeNetProbeDnsResolver implements NetProbeDnsResolver
{
    public int $calls = 0;

    /**
     * @param array<string, array<int, array<string, mixed>>> $records
     */
    public function __construct(private readonly array $records)
    {
    }

    public function resolve(string $hostname, string $type): array
    {
        $this->calls++;

        return $this->records[strtoupper($type)] ?? [];
    }
}
