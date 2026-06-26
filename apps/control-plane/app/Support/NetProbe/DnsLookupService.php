<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class DnsLookupService
{
    /**
     * @var string[]
     */
    public const ALLOWED_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SOA', 'CAA'];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
    ) {
    }

    /**
     * @param string[] $types
     * @return array<string, mixed>
     */
    public function lookup(string $domain, array $types = []): array
    {
        $hostname = $this->guard->normalizeHostname($domain);
        $normalizedTypes = $this->normalizeTypes($types);
        $cacheKey = 'netprobe:dns:'.hash('sha256', $hostname.'|'.implode(',', $normalizedTypes));

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $payload = $this->performLookup($hostname, $normalizedTypes);
        Cache::put($cacheKey, $payload, (int) $payload['meta']['cache_ttl_seconds']);

        return $this->withCachedFlag($payload, false);
    }

    /**
     * @param string[] $types
     * @return array<string, mixed>
     */
    private function performLookup(string $hostname, array $types): array
    {
        $warnings = [];
        $resolvedRecords = [
            'A' => $this->resolver->resolve($hostname, 'A'),
            'AAAA' => $this->resolver->resolve($hostname, 'AAAA'),
        ];
        $addressRecords = [
            ...$resolvedRecords['A'],
            ...$resolvedRecords['AAAA'],
        ];
        $checkedAddresses = $this->extractAddresses($addressRecords);

        $this->guard->assertPublicResolvedAddresses($hostname, $checkedAddresses);

        if (in_array('CAA', $types, true) && ! defined('DNS_CAA')) {
            $warnings[] = 'CAA lookup uses DNS_ANY filtering because DNS_CAA is unavailable in this PHP runtime.';
        }

        $recordsByType = [];
        $ttls = [];

        foreach ($types as $type) {
            $rawRecords = $resolvedRecords[$type] ?? $this->resolver->resolve($hostname, $type);
            $recordsByType[$type] = array_map(
                fn (array $record): array => $this->normalizeRecord($type, $record),
                $rawRecords,
            );

            foreach ($rawRecords as $record) {
                $ttl = (int) ($record['ttl'] ?? 0);
                if ($ttl > 0) {
                    $ttls[] = $ttl;
                }
            }
        }

        $cacheTtl = max(30, min(300, $ttls === [] ? 60 : min($ttls)));

        return [
            'data' => [
                'domain' => $hostname,
                'queried_types' => $types,
                'records' => $recordsByType,
                'checked_addresses' => $checkedAddresses,
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => $cacheTtl,
                'cached' => false,
                'warnings' => $warnings,
            ],
        ];
    }

    /**
     * @param string[] $types
     * @return string[]
     */
    private function normalizeTypes(array $types): array
    {
        $normalized = array_values(array_unique(array_map(
            fn (mixed $type): string => strtoupper(trim((string) $type)),
            $types === [] ? self::ALLOWED_TYPES : $types,
        )));

        $invalid = array_values(array_diff($normalized, self::ALLOWED_TYPES));
        if ($invalid !== []) {
            throw ValidationException::withMessages([
                'types' => ['Unsupported DNS record type: '.implode(', ', $invalid)],
            ]);
        }

        return $normalized;
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
     * @param array<string, mixed> $record
     * @return array<string, mixed>
     */
    private function normalizeRecord(string $type, array $record): array
    {
        $fields = match ($type) {
            'A' => ['ip' => $record['ip'] ?? null],
            'AAAA' => ['ipv6' => $record['ipv6'] ?? null],
            'CNAME', 'NS' => ['target' => $record['target'] ?? null],
            'MX' => ['target' => $record['target'] ?? null, 'priority' => $record['pri'] ?? null],
            'TXT' => ['txt' => $record['txt'] ?? null, 'entries' => $record['entries'] ?? null],
            'SOA' => [
                'mname' => $record['mname'] ?? null,
                'rname' => $record['rname'] ?? null,
                'serial' => $record['serial'] ?? null,
                'refresh' => $record['refresh'] ?? null,
                'retry' => $record['retry'] ?? null,
                'expire' => $record['expire'] ?? null,
                'minimum_ttl' => $record['minimum-ttl'] ?? null,
            ],
            'CAA' => [
                'flags' => $record['flags'] ?? $record['flag'] ?? null,
                'tag' => $record['tag'] ?? null,
                'value' => $record['value'] ?? null,
            ],
            default => [],
        };

        return [
            'type' => $type,
            'ttl' => (int) ($record['ttl'] ?? 0),
            'value' => $this->recordValue($type, $fields),
            'fields' => array_filter($fields, fn (mixed $value): bool => $value !== null && $value !== ''),
        ];
    }

    /**
     * @param array<string, mixed> $fields
     */
    private function recordValue(string $type, array $fields): string
    {
        return match ($type) {
            'A' => (string) ($fields['ip'] ?? ''),
            'AAAA' => (string) ($fields['ipv6'] ?? ''),
            'CNAME', 'NS' => (string) ($fields['target'] ?? ''),
            'MX' => trim((string) ($fields['priority'] ?? '').' '.(string) ($fields['target'] ?? '')),
            'TXT' => (string) ($fields['txt'] ?? ''),
            'SOA' => trim((string) ($fields['mname'] ?? '').' '.(string) ($fields['rname'] ?? '').' '.(string) ($fields['serial'] ?? '')),
            'CAA' => trim((string) ($fields['flags'] ?? '').' '.(string) ($fields['tag'] ?? '').' '.(string) ($fields['value'] ?? '')),
            default => '',
        };
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
