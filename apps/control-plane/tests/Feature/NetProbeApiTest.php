<?php

namespace Tests\Feature;

use App\Support\NetProbe\NetProbeCertificateProbe;
use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbePropagationResolver;
use App\Support\NetProbe\NetProbeRdapClient;
use App\Support\NetProbe\NetProbeTcpProbe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
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

    public function test_rdap_lookup_returns_normalized_domain_facts_and_uses_cache(): void
    {
        $this->travelTo(Carbon::parse('2026-06-26 00:00:00 UTC'));

        $client = new FakeNetProbeRdapClient([
            'ldhName' => 'EXAMPLE.COM',
            'handle' => '2336799_DOMAIN_COM-VRSN',
            'status' => ['client delete prohibited', 'client transfer prohibited'],
            'events' => [
                ['eventAction' => 'registration', 'eventDate' => '1995-08-14T04:00:00Z'],
                ['eventAction' => 'expiration', 'eventDate' => '2026-08-13T04:00:00Z'],
                ['eventAction' => 'last changed', 'eventDate' => '2025-08-14T10:00:00Z'],
            ],
            'entities' => [
                [
                    'handle' => '292',
                    'roles' => ['registrar'],
                    'vcardArray' => ['vcard', [
                        ['version', [], 'text', '4.0'],
                        ['fn', [], 'text', 'Example Registrar, Inc.'],
                    ]],
                ],
            ],
            'nameservers' => [
                ['ldhName' => 'A.IANA-SERVERS.NET'],
                ['ldhName' => 'B.IANA-SERVERS.NET'],
            ],
            'notices' => [
                ['title' => 'Terms of Use', 'description' => ['Public RDAP data is rate limited.']],
            ],
        ]);
        $this->app->instance(NetProbeRdapClient::class, $client);

        $payload = ['domain' => 'Example.COM.'];

        $this->postJson('/api/v1/netprobe/rdap', $payload)
            ->assertOk()
            ->assertJsonPath('data.domain', 'example.com')
            ->assertJsonPath('data.registrar.name', 'Example Registrar, Inc.')
            ->assertJsonPath('data.nameservers.0', 'a.iana-servers.net')
            ->assertJsonPath('data.days_until_expiration', 48)
            ->assertJsonPath('meta.cache_ttl_seconds', 21600)
            ->assertJsonPath('meta.cached', false);

        $this->postJson('/api/v1/netprobe/rdap', $payload)
            ->assertOk()
            ->assertJsonPath('meta.cached', true);

        $this->assertSame(1, $client->calls);
        $this->travelBack();
    }

    public function test_ssl_lookup_returns_certificate_summary_and_blocks_private_resolution(): void
    {
        $this->travelTo(Carbon::parse('2026-06-26 00:00:00 UTC'));

        $resolver = new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'AAAA' => [],
        ]);
        $probe = new FakeNetProbeCertificateProbe([
            'subject' => ['common_name' => 'example.com', 'organization' => 'Example Org'],
            'issuer' => ['common_name' => 'Example CA', 'organization' => 'Example Trust'],
            'serial_number' => 'ABC123',
            'valid_from' => '2026-01-01T00:00:00.000000Z',
            'valid_to' => '2026-07-26T00:00:00.000000Z',
            'subject_alt_names' => ['example.com', 'www.example.com'],
            'chain_count' => 2,
            'fingerprint_sha256' => str_repeat('a', 64),
        ]);
        $this->app->instance(NetProbeDnsResolver::class, $resolver);
        $this->app->instance(NetProbeCertificateProbe::class, $probe);

        $this->postJson('/api/v1/netprobe/ssl', ['hostname' => 'Example.COM'])
            ->assertOk()
            ->assertJsonPath('data.hostname', 'example.com')
            ->assertJsonPath('data.checked_addresses.0', '93.184.216.34')
            ->assertJsonPath('data.issuer.common_name', 'Example CA')
            ->assertJsonPath('data.days_until_expiration', 30)
            ->assertJsonPath('data.matches_hostname', true)
            ->assertJsonPath('meta.cache_ttl_seconds', 600)
            ->assertJsonPath('meta.cached', false);

        $this->postJson('/api/v1/netprobe/ssl', ['hostname' => 'Example.COM'])
            ->assertOk()
            ->assertJsonPath('meta.cached', true);

        $this->assertSame(1, $probe->calls);

        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 60, 'ip' => '10.0.0.5'],
            ],
            'AAAA' => [],
        ]));

        $this->postJson('/api/v1/netprobe/ssl', ['hostname' => 'internal.example.com'])
            ->assertUnprocessable()
            ->assertJsonValidationErrors('domain');

        $this->travelBack();
    }

    public function test_dns_propagation_returns_regional_resolver_snapshots(): void
    {
        Cache::flush();

        $resolver = new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'AAAA' => [],
            'NS' => [
                ['type' => 'NS', 'ttl' => 300, 'target' => 'a.iana-servers.net'],
                ['type' => 'NS', 'ttl' => 300, 'target' => 'b.iana-servers.net'],
            ],
        ]);
        $propagationResolver = new FakeNetProbePropagationResolver([
            [
                'resolver_id' => 'matrix-us-san-jose',
                'resolver_name' => 'Google Public DNS ECS',
                'region' => 'Americas',
                'city' => 'San Jose, CA',
                'country' => 'United States',
                'country_code' => 'US',
                'latitude' => 37.3382,
                'longitude' => -121.8863,
                'scope' => 'real DoH query with ECS hint 64.6.64.0/24',
                'status' => 'answered',
                'ttl_min' => 300,
                'values' => ['a.iana-servers.net', 'b.iana-servers.net'],
            ],
            [
                'resolver_id' => 'matrix-br-sao-paulo',
                'resolver_name' => 'Google Public DNS ECS',
                'region' => 'South America',
                'city' => 'Sao Paulo',
                'country' => 'Brazil',
                'country_code' => 'BR',
                'latitude' => -23.5505,
                'longitude' => -46.6333,
                'scope' => 'real DoH query with ECS hint 200.160.0.0/24',
                'status' => 'answered',
                'ttl_min' => 280,
                'values' => ['a.iana-servers.net', 'b.iana-servers.net'],
            ],
        ]);
        $this->app->instance(NetProbeDnsResolver::class, $resolver);
        $this->app->instance(NetProbePropagationResolver::class, $propagationResolver);

        $payload = [
            'domain' => 'Example.COM',
            'type' => 'NS',
        ];

        $this->postJson('/api/v1/netprobe/propagation', $payload)
            ->assertOk()
            ->assertJsonPath('data.domain', 'example.com')
            ->assertJsonPath('data.record_type', 'NS')
            ->assertJsonPath('data.snapshots.0.resolver_id', 'matrix-us-san-jose')
            ->assertJsonPath('data.snapshots.0.resolver_name', 'Google Public DNS ECS')
            ->assertJsonPath('data.snapshots.0.city', 'San Jose, CA')
            ->assertJsonPath('data.snapshots.0.country', 'United States')
            ->assertJsonPath('data.snapshots.0.values.0', 'a.iana-servers.net')
            ->assertJsonPath('data.snapshots.1.resolver_id', 'matrix-br-sao-paulo')
            ->assertJsonPath('meta.coverage.provider', 'fake_regional_dns')
            ->assertJsonPath('meta.coverage.locations_requested', 2)
            ->assertJsonPath('meta.coverage.locations_returned', 2)
            ->assertJsonPath('meta.cache_ttl_seconds', 120)
            ->assertJsonPath('meta.cached', false);

        $this->postJson('/api/v1/netprobe/propagation', $payload)
            ->assertOk()
            ->assertJsonPath('meta.cached', true);

        $this->assertSame(1, $propagationResolver->calls);
    }

    public function test_dns_propagation_accepts_srv_and_public_ptr_targets(): void
    {
        Cache::flush();

        $this->app->instance(NetProbeDnsResolver::class, new FakeNetProbeDnsResolver([
            'A' => [],
            'AAAA' => [],
            'SRV' => [
                ['type' => 'SRV', 'ttl' => 300, 'pri' => 10, 'weight' => 20, 'port' => 5060, 'target' => 'sip.example.com'],
            ],
            'PTR' => [
                ['type' => 'PTR', 'ttl' => 180, 'target' => 'dns.google'],
            ],
        ]));
        $this->app->instance(NetProbePropagationResolver::class, new FakeNetProbePropagationResolver([]));

        $this->postJson('/api/v1/netprobe/propagation', [
            'domain' => '_sip._tcp.example.com',
            'type' => 'SRV',
        ])->assertOk()
            ->assertJsonPath('data.domain', '_sip._tcp.example.com')
            ->assertJsonPath('data.record_type', 'SRV')
            ->assertJsonPath('data.snapshots.0.values.0', '10 20 5060 sip.example.com');

        $this->postJson('/api/v1/netprobe/propagation', [
            'domain' => '8.8.8.8',
            'type' => 'PTR',
        ])->assertOk()
            ->assertJsonPath('data.domain', '8.8.8.8.in-addr.arpa')
            ->assertJsonPath('data.record_type', 'PTR')
            ->assertJsonPath('data.snapshots.0.values.0', 'dns.google');

        $this->postJson('/api/v1/netprobe/propagation', [
            'domain' => '10.0.0.5',
            'type' => 'PTR',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');
    }

    public function test_port_check_uses_allowlist_and_blocks_private_resolution(): void
    {
        Cache::flush();

        $this->app->instance(NetProbeDnsResolver::class, new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'AAAA' => [],
        ]));
        $this->app->instance(NetProbeTcpProbe::class, new FakeNetProbeTcpProbe([
            'status' => 'open',
            'latency_ms' => 42,
            'error' => null,
        ]));

        $this->postJson('/api/v1/netprobe/port', [
            'hostname' => 'example.com',
            'port' => 443,
        ])->assertOk()
            ->assertJsonPath('data.hostname', 'example.com')
            ->assertJsonPath('data.port', 443)
            ->assertJsonPath('data.overall_status', 'open')
            ->assertJsonPath('data.checks.0.address', '93.184.216.34')
            ->assertJsonPath('data.checks.0.latency_ms', 42)
            ->assertJsonPath('meta.allowed_ports.0', 80);

        $this->postJson('/api/v1/netprobe/port', [
            'hostname' => 'example.com',
            'port' => 3389,
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('port');

        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 60, 'ip' => '10.0.0.5'],
            ],
            'AAAA' => [],
        ]));

        $this->postJson('/api/v1/netprobe/port', [
            'hostname' => 'internal.example.com',
            'port' => 443,
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');
    }

    public function test_reachability_returns_bounded_tcp_probe_and_disabled_trace_modes(): void
    {
        Cache::flush();

        $this->app->instance(NetProbeDnsResolver::class, new FakeNetProbeDnsResolver([
            'A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'AAAA' => [],
        ]));
        $this->app->instance(NetProbeTcpProbe::class, new FakeNetProbeTcpProbe([
            'status' => 'open',
            'latency_ms' => 33,
            'error' => null,
        ]));

        $this->postJson('/api/v1/netprobe/reachability', [
            'hostname' => 'example.com',
        ])->assertOk()
            ->assertJsonPath('data.hostname', 'example.com')
            ->assertJsonPath('data.tcp_443.status', 'open')
            ->assertJsonPath('data.tcp_443.latency_ms', 33)
            ->assertJsonPath('data.icmp.status', 'not_supported')
            ->assertJsonPath('data.traceroute.status', 'not_supported')
            ->assertJsonPath('meta.cache_ttl_seconds', 60);
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

class FakeNetProbePropagationResolver implements NetProbePropagationResolver
{
    public int $calls = 0;

    /**
     * @param array<int, array<string, mixed>> $snapshots
     */
    public function __construct(private readonly array $snapshots)
    {
    }

    public function lookup(string $hostname, string $type): array
    {
        $this->calls++;

        return [
            'provider' => 'fake_regional_dns',
            'mode' => 'test',
            'snapshots' => $this->snapshots,
            'warnings' => ['Fake regional DNS provider used in tests.'],
            'locations_requested' => count($this->snapshots),
        ];
    }
}

class FakeNetProbeRdapClient implements NetProbeRdapClient
{
    public int $calls = 0;

    /**
     * @param array<string, mixed> $payload
     */
    public function __construct(private readonly array $payload)
    {
    }

    public function lookupDomain(string $domain): array
    {
        $this->calls++;

        return $this->payload;
    }
}

class FakeNetProbeCertificateProbe implements NetProbeCertificateProbe
{
    public int $calls = 0;

    /**
     * @param array<string, mixed> $payload
     */
    public function __construct(private readonly array $payload)
    {
    }

    public function inspect(string $hostname): array
    {
        $this->calls++;

        return $this->payload;
    }
}

class FakeNetProbeTcpProbe implements NetProbeTcpProbe
{
    public int $calls = 0;

    /**
     * @param array{status: string, latency_ms: int|null, error: string|null} $result
     */
    public function __construct(private readonly array $result)
    {
    }

    public function connect(string $address, int $port, float $timeoutSeconds): array
    {
        $this->calls++;

        return $this->result;
    }
}
