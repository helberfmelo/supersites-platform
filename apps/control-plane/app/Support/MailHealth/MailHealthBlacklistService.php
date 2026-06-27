<?php

namespace App\Support\MailHealth;

use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Support\Facades\Cache;

class MailHealthBlacklistService
{
    /**
     * @var string[]
     */
    private const DNSBL_ZONES = ['zen.spamhaus.org', 'bl.spamcop.net'];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function check(string $domain): array
    {
        $normalizedDomain = $this->guard->normalizeHostname($domain);
        $cacheKey = 'mailhealth:blacklist:'.hash('sha256', $normalizedDomain);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $addresses = array_slice($this->candidateIpv4Addresses($normalizedDomain), 0, 2);
        $probes = [];

        foreach ($addresses as $address) {
            foreach (self::DNSBL_ZONES as $zone) {
                $query = $this->reverseIpv4($address).'.'.$zone;
                $answers = $this->resolver->resolve($query, 'A');
                $values = $this->extractAddresses($answers);
                $probes[] = [
                    'address' => $address,
                    'zone' => $zone,
                    'listed' => $values !== [],
                    'responses' => $values,
                ];
            }
        }

        $listed = array_values(array_filter($probes, fn (array $probe): bool => (bool) $probe['listed']));
        $status = $listed !== [] ? 'fail' : ($addresses === [] ? 'warn' : 'pass');
        $findings = [
            [
                'label' => 'Candidate IPv4 addresses',
                'status' => $addresses === [] ? 'warn' : 'pass',
                'detail' => $addresses === [] ? 'No public IPv4 address was available for the DNSBL sample.' : 'A bounded set of public IPv4 addresses was selected.',
                'value' => count($addresses),
            ],
            [
                'label' => 'DNSBL listed signals',
                'status' => $listed !== [] ? 'fail' : 'pass',
                'detail' => $listed !== [] ? 'At least one DNSBL response listed a sampled address.' : 'No sampled DNSBL listing was returned.',
                'value' => count($listed),
            ],
        ];
        $payload = [
            'data' => [
                'check' => 'blacklist',
                'domain' => $normalizedDomain,
                'status' => $status,
                'summary' => $listed !== [] ? 'A sampled address appears listed in DNSBL results.' : 'No sampled DNSBL listing was returned.',
                'findings' => $findings,
                'records' => [],
                'probes' => $probes,
                'warnings' => [
                    'DNSBL providers can rate limit or restrict use; confirm directly before operational decisions.',
                    'This free check is a small sample, not a universal reputation audit.',
                ],
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 300,
                'cached' => false,
                'zones' => self::DNSBL_ZONES,
            ],
        ];
        Cache::put($cacheKey, $payload, 300);

        return $this->withCachedFlag($payload, false);
    }

    /**
     * @return string[]
     */
    private function candidateIpv4Addresses(string $domain): array
    {
        $records = [
            ...$this->resolver->resolve($domain, 'A'),
            ...$this->resolver->resolve($domain, 'AAAA'),
        ];
        $mxRecords = $this->resolver->resolve($domain, 'MX');
        usort($mxRecords, fn (array $a, array $b): int => ((int) ($a['pri'] ?? 0)) <=> ((int) ($b['pri'] ?? 0)));

        foreach (array_slice($mxRecords, 0, 3) as $mxRecord) {
            $target = strtolower(rtrim((string) ($mxRecord['target'] ?? ''), '.'));
            if ($target === '') {
                continue;
            }

            $normalizedTarget = $this->guard->normalizeHostname($target);
            $records = [
                ...$records,
                ...$this->resolver->resolve($normalizedTarget, 'A'),
                ...$this->resolver->resolve($normalizedTarget, 'AAAA'),
            ];
        }

        $addresses = $this->extractAddresses($records);
        $this->guard->assertPublicResolvedAddresses($domain, $addresses);

        return array_values(array_filter(
            array_unique($addresses),
            fn (string $address): bool => filter_var($address, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4) !== false,
        ));
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

    private function reverseIpv4(string $address): string
    {
        return implode('.', array_reverse(explode('.', $address)));
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
