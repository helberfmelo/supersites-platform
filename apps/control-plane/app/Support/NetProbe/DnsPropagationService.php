<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class DnsPropagationService
{
    /**
     * @var string[]
     */
    private const ALLOWED_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'CAA'];

    /**
     * @return array<string, mixed>
     */
    private function resolverProfile(): array
    {
        return [
            'resolver_id' => 'runtime-resolver',
            'resolver_name' => 'NetProbe controlled resolver',
            'region' => 'Controlled resolver',
            'city' => 'Controlled edge',
            'country' => 'Controlled infrastructure',
            'country_code' => 'XX',
            'flag' => '',
            'latitude' => null,
            'longitude' => null,
            'scope' => 'single controlled resolver snapshot',
        ];
    }

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
        $recordType = $this->normalizeType($type);
        $hostname = $this->normalizeTarget($domain, $recordType);
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
                    'This result is a controlled single-resolver snapshot, not a worldwide propagation guarantee.',
                    'Compare with authoritative DNS and allow at least one TTL window before treating differences as failures.',
                ],
            ],
        ];
        Cache::put($cacheKey, $payload, 120);

        return $this->withCachedFlag($payload, false);
    }

    private function normalizeTarget(string $domain, string $recordType): string
    {
        $target = strtolower(trim($domain));
        $target = rtrim($target, '.');

        if ($recordType === 'PTR' && filter_var($target, FILTER_VALIDATE_IP)) {
            if (! $this->guard->isPublicIp($target)) {
                throw ValidationException::withMessages([
                    'domain' => ['PTR checks accept only public IP addresses or public reverse-DNS hostnames.'],
                ]);
            }

            return $this->reversePtrHostname($target);
        }

        if ($recordType === 'SRV') {
            return $this->normalizeSrvHostname($target);
        }

        return $this->guard->normalizeHostname($target);
    }

    private function normalizeSrvHostname(string $hostname): string
    {
        if ($hostname === '') {
            throw ValidationException::withMessages([
                'domain' => ['Enter an SRV hostname such as _sip._tcp.example.com.'],
            ]);
        }

        if (str_contains($hostname, '://') || preg_match('/[\/:@\s]/', $hostname)) {
            throw ValidationException::withMessages([
                'domain' => ['Enter a hostname only, not a URL, IP with port or path.'],
            ]);
        }

        $labels = explode('.', $hostname);
        if (count($labels) < 4 || ! str_starts_with($labels[0], '_') || ! str_starts_with($labels[1], '_')) {
            throw ValidationException::withMessages([
                'domain' => ['Enter an SRV hostname such as _sip._tcp.example.com.'],
            ]);
        }

        foreach ($labels as $index => $label) {
            $pattern = $index < 2
                ? '/^_[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/'
                : '/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/';

            if ($label === '' || strlen($label) > 64 || ! preg_match($pattern, $label)) {
                throw ValidationException::withMessages([
                    'domain' => ['Hostname contains an invalid label.'],
                ]);
            }
        }

        foreach (['localhost', 'local', 'internal', 'intranet', 'home', 'lan'] as $suffix) {
            if ($hostname === $suffix || str_ends_with($hostname, '.'.$suffix)) {
                throw ValidationException::withMessages([
                    'domain' => ['Private or local-only hostnames are blocked.'],
                ]);
            }
        }

        return $hostname;
    }

    private function reversePtrHostname(string $address): string
    {
        if (filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4)) {
            return implode('.', array_reverse(explode('.', $address))).'.in-addr.arpa';
        }

        $expanded = inet_pton($address);
        if ($expanded === false) {
            throw ValidationException::withMessages([
                'domain' => ['Enter a valid public IP address.'],
            ]);
        }

        return implode('.', array_reverse(str_split(bin2hex($expanded)))).'.ip6.arpa';
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
            ...$this->resolverProfile(),
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
            'CNAME', 'NS', 'PTR' => (string) ($record['target'] ?? ''),
            'MX' => trim((string) ($record['pri'] ?? '').' '.(string) ($record['target'] ?? '')),
            'SOA' => trim((string) ($record['mname'] ?? '').' '.(string) ($record['rname'] ?? '').' '.(string) ($record['serial'] ?? '')),
            'SRV' => trim((string) ($record['pri'] ?? '').' '.(string) ($record['weight'] ?? '').' '.(string) ($record['port'] ?? '').' '.(string) ($record['target'] ?? '')),
            'TXT' => (string) ($record['txt'] ?? ''),
            'CAA' => trim((string) ($record['flags'] ?? $record['flag'] ?? '').' '.(string) ($record['tag'] ?? '').' '.(string) ($record['value'] ?? '')),
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
