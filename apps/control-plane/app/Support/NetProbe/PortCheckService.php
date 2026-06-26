<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class PortCheckService
{
    /**
     * @var int[]
     */
    public const ALLOWED_PORTS = [80, 443, 587, 993];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
        private readonly NetProbeTcpProbe $tcpProbe,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function check(string $hostname, int $port): array
    {
        $normalizedHostname = $this->guard->normalizeHostname($hostname);
        $this->assertAllowedPort($port);
        $cacheKey = 'netprobe:port:'.hash('sha256', $normalizedHostname.'|'.$port);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $checkedAddresses = $this->publicAddresses($normalizedHostname);
        $checks = [];

        foreach (array_slice($checkedAddresses, 0, 2) as $address) {
            $checks[] = [
                'address' => $address,
                ...$this->tcpProbe->connect($address, $port, 3.0),
            ];
        }

        $payload = [
            'data' => [
                'hostname' => $normalizedHostname,
                'port' => $port,
                'checked_addresses' => $checkedAddresses,
                'checks' => $checks,
                'overall_status' => $this->overallStatus($checks),
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 60,
                'cached' => false,
                'allowed_ports' => self::ALLOWED_PORTS,
                'warnings' => [
                    'Port checks are limited to an allowlist and at most two resolved public addresses per request.',
                ],
            ],
        ];
        Cache::put($cacheKey, $payload, 60);

        return $this->withCachedFlag($payload, false);
    }

    private function assertAllowedPort(int $port): void
    {
        if (! in_array($port, self::ALLOWED_PORTS, true)) {
            throw ValidationException::withMessages([
                'port' => ['This port is not enabled for public checks.'],
            ]);
        }
    }

    /**
     * @return string[]
     */
    private function publicAddresses(string $hostname): array
    {
        $records = [
            ...$this->resolver->resolve($hostname, 'A'),
            ...$this->resolver->resolve($hostname, 'AAAA'),
        ];
        $addresses = $this->extractAddresses($records);

        if ($addresses === []) {
            throw ValidationException::withMessages([
                'hostname' => ['No public A or AAAA address was found before the port check.'],
            ]);
        }

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
     * @param array<int, array<string, mixed>> $checks
     */
    private function overallStatus(array $checks): string
    {
        foreach ($checks as $check) {
            if (($check['status'] ?? null) === 'open') {
                return 'open';
            }
        }

        foreach ($checks as $check) {
            if (($check['status'] ?? null) === 'timeout') {
                return 'timeout';
            }
        }

        return 'closed';
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
