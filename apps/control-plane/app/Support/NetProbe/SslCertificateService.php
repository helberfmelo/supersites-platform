<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class SslCertificateService
{
    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
        private readonly NetProbeCertificateProbe $probe,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function inspect(string $hostname): array
    {
        $normalizedHostname = $this->guard->normalizeHostname($hostname);
        $cacheKey = 'netprobe:ssl:'.hash('sha256', $normalizedHostname);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $addressRecords = [
            ...$this->resolver->resolve($normalizedHostname, 'A'),
            ...$this->resolver->resolve($normalizedHostname, 'AAAA'),
        ];
        $checkedAddresses = $this->extractAddresses($addressRecords);

        if ($checkedAddresses === []) {
            throw ValidationException::withMessages([
                'hostname' => ['No public A or AAAA address was found before the TLS probe.'],
            ]);
        }

        $this->guard->assertPublicResolvedAddresses($normalizedHostname, $checkedAddresses);

        $certificate = $this->probe->inspect($normalizedHostname);
        $payload = $this->normalize($normalizedHostname, $checkedAddresses, $certificate);
        Cache::put($cacheKey, $payload, (int) $payload['meta']['cache_ttl_seconds']);

        return $this->withCachedFlag($payload, false);
    }

    /**
     * @param string[] $checkedAddresses
     * @param array<string, mixed> $certificate
     * @return array<string, mixed>
     */
    private function normalize(string $hostname, array $checkedAddresses, array $certificate): array
    {
        $validTo = is_string($certificate['valid_to'] ?? null) ? $certificate['valid_to'] : null;
        $daysUntilExpiration = $validTo ? $this->daysUntil($validTo) : null;
        $subjectAltNames = $this->stringList($certificate['subject_alt_names'] ?? []);
        $subjectCommonName = $certificate['subject']['common_name'] ?? null;
        $matchesHostname = $this->matchesHostname($hostname, $subjectAltNames, is_string($subjectCommonName) ? $subjectCommonName : null);
        $warnings = [
            'Certificate chain validation is informational in this sprint; NetProbe reports the served certificate facts.',
        ];

        if ($daysUntilExpiration !== null && $daysUntilExpiration < 0) {
            $warnings[] = 'The served certificate is expired.';
        } elseif ($daysUntilExpiration !== null && $daysUntilExpiration <= 14) {
            $warnings[] = 'The served certificate expires within 14 days.';
        }

        if (! $matchesHostname) {
            $warnings[] = 'The served certificate names do not match the requested hostname.';
        }

        return [
            'data' => [
                'hostname' => $hostname,
                'checked_addresses' => $checkedAddresses,
                'subject' => $certificate['subject'] ?? [],
                'issuer' => $certificate['issuer'] ?? [],
                'serial_number' => $certificate['serial_number'] ?? null,
                'valid_from' => $certificate['valid_from'] ?? null,
                'valid_to' => $validTo,
                'days_until_expiration' => $daysUntilExpiration,
                'is_expired' => $daysUntilExpiration !== null && $daysUntilExpiration < 0,
                'matches_hostname' => $matchesHostname,
                'subject_alt_names' => $subjectAltNames,
                'chain_count' => (int) ($certificate['chain_count'] ?? 0),
                'fingerprint_sha256' => $certificate['fingerprint_sha256'] ?? null,
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 600,
                'cached' => false,
                'warnings' => $warnings,
                'limitations' => [
                    'TLS is checked on port 443 only.',
                    'Private and reserved address ranges are blocked before the certificate probe.',
                ],
            ],
        ];
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

    private function daysUntil(string $value): int
    {
        return (int) floor(now()->diffInDays(Carbon::parse($value), false));
    }

    /**
     * @param string[] $subjectAltNames
     */
    private function matchesHostname(string $hostname, array $subjectAltNames, ?string $commonName): bool
    {
        $patterns = array_values(array_filter([...$subjectAltNames, $commonName]));

        foreach ($patterns as $pattern) {
            if ($this->matchesPattern($hostname, strtolower($pattern))) {
                return true;
            }
        }

        return false;
    }

    private function matchesPattern(string $hostname, string $pattern): bool
    {
        if ($hostname === $pattern) {
            return true;
        }

        if (! str_starts_with($pattern, '*.')) {
            return false;
        }

        $suffix = substr($pattern, 1);

        return str_ends_with($hostname, $suffix)
            && substr_count($hostname, '.') === substr_count($suffix, '.');
    }

    /**
     * @return string[]
     */
    private function stringList(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return array_values(array_filter(array_map(
            fn (mixed $item): string => strtolower(trim((string) $item)),
            $value,
        ), fn (string $item): bool => $item !== ''));
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
