<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class DnsPropagationService
{
    /**
     * @var string[]
     */
    private const ALLOWED_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function lookup(string $domain, string $type): array
    {
        $hostname = $this->guard->normalizeHostname($domain);
        $recordType = $this->normalizeType($type);
        $cacheKey = 'netprobe:propagation:'.hash('sha256', $hostname.'|'.$recordType);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $addressRecords = [
            ...$this->resolver->resolve($hostname, 'A'),
            ...$this->resolver->resolve($hostname, 'AAAA'),
        ];
        $checkedAddresses = $this->extractAddresses($addressRecords);
        $this->guard->assertPublicResolvedAddresses($hostname, $checkedAddresses);

        $records = $recordType === 'A'
            ? $addressRecords
            : $this->resolver->resolve($hostname, $recordType);
        $snapshot = $this->snapshot($recordType, $records);
        $payload = [
            'data' => [
                'domain' => $hostname,
                'record_type' => $recordType,
                'checked_addresses' => $checkedAddresses,
                'snapshots' => [$snapshot],
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 120,
                'cached' => false,
                'warnings' => [
                    'Sprint 2.4 uses the local system resolver as the first controlled propagation probe.',
                    'Multi-region resolver comparison is planned after production probe infrastructure is deployed.',
                ],
            ],
        ];
        Cache::put($cacheKey, $payload, 120);

        return $this->withCachedFlag($payload, false);
    }

    private function normalizeType(string $type): string
    {
        $normalized = strtoupper(trim($type));

        if (! in_array($normalized, self::ALLOWED_TYPES, true)) {
            throw ValidationException::withMessages([
                'type' => ['Unsupported propagation record type.'],
            ]);
        }

        return $normalized;
    }

    /**
     * @param array<int, array<string, mixed>> $records
     * @return array<string, mixed>
     */
    private function snapshot(string $type, array $records): array
    {
        $ttls = [];
        $values = [];

        foreach ($records as $record) {
            $ttl = (int) ($record['ttl'] ?? 0);
            if ($ttl > 0) {
                $ttls[] = $ttl;
            }

            $values[] = $this->recordValue($type, $record);
        }

        $values = array_values(array_filter(array_unique($values)));

        return [
            'resolver_id' => 'system-resolver',
            'region' => 'local-runtime',
            'status' => $values === [] ? 'empty' : 'answered',
            'ttl_min' => $ttls === [] ? null : min($ttls),
            'values' => $values,
        ];
    }

    /**
     * @param array<string, mixed> $record
     */
    private function recordValue(string $type, array $record): string
    {
        return match ($type) {
            'A' => (string) ($record['ip'] ?? ''),
            'AAAA' => (string) ($record['ipv6'] ?? ''),
            'CNAME', 'NS' => (string) ($record['target'] ?? ''),
            'MX' => trim((string) ($record['pri'] ?? '').' '.(string) ($record['target'] ?? '')),
            'TXT' => (string) ($record['txt'] ?? ''),
            default => '',
        };
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
