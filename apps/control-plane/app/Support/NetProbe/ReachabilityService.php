<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class ReachabilityService
{
    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
        private readonly NetProbeTcpProbe $tcpProbe,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function check(string $hostname): array
    {
        $normalizedHostname = $this->guard->normalizeHostname($hostname);
        $cacheKey = 'netprobe:reachability:'.hash('sha256', $normalizedHostname);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $checkedAddresses = $this->publicAddresses($normalizedHostname);
        $address = $checkedAddresses[0];
        $tcp443 = $this->tcpProbe->connect($address, 443, 3.0);
        $payload = [
            'data' => [
                'hostname' => $normalizedHostname,
                'checked_addresses' => $checkedAddresses,
                'tcp_443' => [
                    'address' => $address,
                    ...$tcp443,
                ],
                'icmp' => [
                    'status' => 'not_supported',
                    'reason' => 'ICMP ping is disabled in the initial web runtime probe.',
                ],
                'traceroute' => [
                    'status' => 'not_supported',
                    'reason' => 'Traceroute requires controlled worker infrastructure and is not run from the web request.',
                ],
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 60,
                'cached' => false,
                'warnings' => [
                    'Sprint 2.4 reports bounded TCP reachability first; ICMP and traceroute remain disabled until worker probes exist.',
                ],
            ],
        ];
        Cache::put($cacheKey, $payload, 60);

        return $this->withCachedFlag($payload, false);
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
                'hostname' => ['No public A or AAAA address was found before the reachability probe.'],
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
     * @param array<string, mixed> $payload
     * @return array<string, mixed>
     */
    private function withCachedFlag(array $payload, bool $cached): array
    {
        $payload['meta']['cached'] = $cached;

        return $payload;
    }
}
