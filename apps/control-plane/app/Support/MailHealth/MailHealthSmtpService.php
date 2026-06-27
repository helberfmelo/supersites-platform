<?php

namespace App\Support\MailHealth;

use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeHostGuard;
use App\Support\NetProbe\NetProbeTcpProbe;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class MailHealthSmtpService
{
    /**
     * @var int[]
     */
    public const ALLOWED_PORTS = [25, 465, 587];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
        private readonly NetProbeTcpProbe $tcpProbe,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function check(string $domain, int $port): array
    {
        $normalizedDomain = $this->guard->normalizeHostname($domain);
        $this->assertAllowedPort($port);
        $cacheKey = 'mailhealth:smtp:'.hash('sha256', $normalizedDomain.'|'.$port);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $mx = $this->primaryMx($normalizedDomain);
        $addresses = $this->publicAddressesForHost($mx['target']);
        $address = $addresses[0] ?? null;

        if ($address === null) {
            throw ValidationException::withMessages([
                'domain' => ['The selected MX host did not resolve to a public address.'],
            ]);
        }

        $tcp = $this->tcpProbe->connect($address, $port, 3.0);
        $status = match ($tcp['status'] ?? null) {
            'open' => 'pass',
            'timeout' => 'warn',
            default => 'fail',
        };
        $payload = [
            'data' => [
                'check' => 'smtp',
                'domain' => $normalizedDomain,
                'status' => $status,
                'summary' => ($tcp['status'] ?? 'unknown') === 'open'
                    ? 'SMTP TCP reachability succeeded for the sampled MX host.'
                    : 'SMTP TCP reachability needs review for the sampled MX host.',
                'findings' => [
                    [
                        'label' => 'MX host selected',
                        'status' => 'pass',
                        'detail' => 'The lowest-priority MX host was selected for the bounded probe.',
                        'value' => $mx['target'],
                    ],
                    [
                        'label' => 'TCP status',
                        'status' => $status,
                        'detail' => 'MailHealth performs TCP only and does not send EHLO, AUTH, RCPT, DATA or a message.',
                        'value' => $tcp['status'] ?? 'unknown',
                    ],
                ],
                'records' => [[
                    'type' => 'MX',
                    'priority' => $mx['priority'],
                    'target' => $mx['target'],
                ]],
                'probes' => [[
                    'mx_host' => $mx['target'],
                    'address' => $address,
                    'port' => $port,
                    'tcp_status' => $tcp['status'] ?? 'unknown',
                    'latency_ms' => $tcp['latency_ms'] ?? null,
                    'error' => $tcp['error'] ?? null,
                ]],
                'warnings' => [
                    'SMTP checks are limited to one MX-derived public address and do not transmit mail commands.',
                ],
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 60,
                'cached' => false,
                'allowed_ports' => self::ALLOWED_PORTS,
            ],
        ];
        Cache::put($cacheKey, $payload, 60);

        return $this->withCachedFlag($payload, false);
    }

    private function assertAllowedPort(int $port): void
    {
        if (! in_array($port, self::ALLOWED_PORTS, true)) {
            throw ValidationException::withMessages([
                'port' => ['This SMTP port is not enabled for public checks.'],
            ]);
        }
    }

    /**
     * @return array{target: string, priority: int}
     */
    private function primaryMx(string $domain): array
    {
        $mxRecords = $this->resolver->resolve($domain, 'MX');
        usort($mxRecords, fn (array $a, array $b): int => ((int) ($a['pri'] ?? 0)) <=> ((int) ($b['pri'] ?? 0)));
        $record = $mxRecords[0] ?? null;
        $target = strtolower(rtrim((string) ($record['target'] ?? ''), '.'));

        if ($record === null || $target === '') {
            throw ValidationException::withMessages([
                'domain' => ['No MX records were found before the SMTP check.'],
            ]);
        }

        return [
            'target' => $this->guard->normalizeHostname($target),
            'priority' => (int) ($record['pri'] ?? 0),
        ];
    }

    /**
     * @return string[]
     */
    private function publicAddressesForHost(string $hostname): array
    {
        $addresses = $this->extractAddresses([
            ...$this->resolver->resolve($hostname, 'A'),
            ...$this->resolver->resolve($hostname, 'AAAA'),
        ]);

        $this->guard->assertPublicResolvedAddresses($hostname, $addresses);

        return $addresses;
    }

    /**
     * @param array<int, array<string, mixed>> $records
     * @return string[]
     */
    private function extractAddresses(array $records): array
    {
        $addresses = [];

        foreach ($records as $record) {
            foreach (['ip', 'ipv6'] as $key) {
                if (isset($record[$key]) && filter_var($record[$key], FILTER_VALIDATE_IP)) {
                    $addresses[] = (string) $record[$key];
                }
            }
        }

        return array_values(array_unique($addresses));
    }

    /**
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    private function withCachedFlag(array $payload, bool $cached): array
    {
        $payload['meta']['cached'] = $cached;

        return $payload;
    }
}
