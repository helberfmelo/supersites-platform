<?php

namespace Tests\Feature;

use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeTcpProbe;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

class MailHealthApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_dns_checks_parse_spf_dkim_dmarc_and_mx_records(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeMailHealthDnsResolver([
            'example.com|TXT' => [
                ['type' => 'TXT', 'ttl' => 120, 'txt' => 'v=spf1 include:_spf.example.net -all'],
            ],
            '_dmarc.example.com|TXT' => [
                ['type' => 'TXT', 'ttl' => 120, 'txt' => 'v=DMARC1; p=reject; rua=mailto:dmarc@example.com; pct=100'],
            ],
            'default._domainkey.example.com|TXT' => [
                ['type' => 'TXT', 'ttl' => 120, 'txt' => 'v=DKIM1; k=rsa; p='.str_repeat('A', 48)],
            ],
            'example.com|MX' => [
                ['type' => 'MX', 'ttl' => 120, 'pri' => 10, 'target' => 'mail.example.com'],
            ],
            'mail.example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'mail.example.com|AAAA' => [],
        ]));

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'Example.COM',
            'check' => 'spf',
        ])->assertOk()
            ->assertJsonPath('data.check', 'spf')
            ->assertJsonPath('data.status', 'pass')
            ->assertJsonPath('data.records.0.value', 'v=spf1 include:_spf.example.net -all')
            ->assertJsonPath('meta.cached', false);

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'spf',
        ])->assertOk()
            ->assertJsonPath('meta.cached', true);

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'dmarc',
        ])->assertOk()
            ->assertJsonPath('data.records.0.policy', 'reject')
            ->assertJsonPath('data.records.0.aggregate_reports_present', true);

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'dkim',
            'selector' => 'default',
        ])->assertOk()
            ->assertJsonPath('data.selector', 'default')
            ->assertJsonPath('data.records.0.public_key_present', true)
            ->assertJsonMissing(['p' => str_repeat('A', 48)]);

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'mx',
        ])->assertOk()
            ->assertJsonPath('data.records.0.target', 'mail.example.com')
            ->assertJsonPath('data.records.0.public_addresses.0', '93.184.216.34');
    }

    public function test_dns_checks_reject_invalid_inputs_and_private_mx_resolution(): void
    {
        Cache::flush();

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'localhost',
            'check' => 'spf',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'dkim',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('selector');

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'dkim',
            'selector' => 'bad.selector',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('selector');

        $this->app->instance(NetProbeDnsResolver::class, new FakeMailHealthDnsResolver([
            'example.com|MX' => [
                ['type' => 'MX', 'ttl' => 120, 'pri' => 10, 'target' => 'mail.example.com'],
            ],
            'mail.example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '10.0.0.5'],
            ],
            'mail.example.com|AAAA' => [],
        ]));

        $this->postJson('/api/v1/mailhealth/dns', [
            'domain' => 'example.com',
            'check' => 'mx',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');
    }

    public function test_blacklist_check_uses_small_dnsbl_sample_and_blocks_private_ranges(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeMailHealthDnsResolver([
            'example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'example.com|AAAA' => [],
            'example.com|MX' => [],
            '34.216.184.93.zen.spamhaus.org|A' => [
                ['type' => 'A', 'ttl' => 60, 'ip' => '127.0.0.2'],
            ],
            '34.216.184.93.bl.spamcop.net|A' => [],
        ]));

        $this->postJson('/api/v1/mailhealth/blacklist', [
            'domain' => 'example.com',
        ])->assertOk()
            ->assertJsonPath('data.status', 'fail')
            ->assertJsonPath('data.probes.0.listed', true)
            ->assertJsonPath('meta.zones.0', 'zen.spamhaus.org');

        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeMailHealthDnsResolver([
            'private.example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '10.0.0.5'],
            ],
            'private.example.com|AAAA' => [],
            'private.example.com|MX' => [],
        ]));

        $this->postJson('/api/v1/mailhealth/blacklist', [
            'domain' => 'private.example.com',
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('domain');
    }

    public function test_smtp_check_uses_mx_host_allowlisted_port_and_tcp_only_probe(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeMailHealthDnsResolver([
            'example.com|MX' => [
                ['type' => 'MX', 'ttl' => 120, 'pri' => 10, 'target' => 'mail.example.com'],
            ],
            'mail.example.com|A' => [
                ['type' => 'A', 'ttl' => 120, 'ip' => '93.184.216.34'],
            ],
            'mail.example.com|AAAA' => [],
        ]));
        $tcpProbe = new FakeMailHealthTcpProbe([
            'status' => 'open',
            'latency_ms' => 42,
            'error' => null,
        ]);
        $this->app->instance(NetProbeTcpProbe::class, $tcpProbe);

        $this->postJson('/api/v1/mailhealth/smtp', [
            'domain' => 'example.com',
            'port' => 25,
        ])->assertOk()
            ->assertJsonPath('data.status', 'pass')
            ->assertJsonPath('data.probes.0.mx_host', 'mail.example.com')
            ->assertJsonPath('data.probes.0.tcp_status', 'open')
            ->assertJsonPath('meta.allowed_ports.0', 25);

        $this->assertSame(1, $tcpProbe->calls);

        $this->postJson('/api/v1/mailhealth/smtp', [
            'domain' => 'example.com',
            'port' => 2525,
        ])->assertUnprocessable()
            ->assertJsonValidationErrors('port');
    }

    public function test_mailhealth_public_rate_limit_is_applied(): void
    {
        Cache::flush();
        $this->app->instance(NetProbeDnsResolver::class, new FakeMailHealthDnsResolver([
            'example.com|TXT' => [
                ['type' => 'TXT', 'ttl' => 120, 'txt' => 'v=spf1 -all'],
            ],
        ]));

        for ($i = 0; $i < 20; $i++) {
            $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.99'])
                ->postJson('/api/v1/mailhealth/dns', [
                    'domain' => 'example.com',
                    'check' => 'spf',
                ])->assertOk();
        }

        $this->withServerVariables(['REMOTE_ADDR' => '198.51.100.99'])
            ->postJson('/api/v1/mailhealth/dns', [
                'domain' => 'example.com',
                'check' => 'spf',
            ])->assertTooManyRequests();
    }
}

class FakeMailHealthDnsResolver implements NetProbeDnsResolver
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

class FakeMailHealthTcpProbe implements NetProbeTcpProbe
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
