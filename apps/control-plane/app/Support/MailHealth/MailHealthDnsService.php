<?php

namespace App\Support\MailHealth;

use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class MailHealthDnsService
{
    /**
     * @var string[]
     */
    public const ALLOWED_CHECKS = ['spf', 'dkim', 'dmarc', 'mx'];

    public function __construct(
        private readonly NetProbeDnsResolver $resolver,
        private readonly NetProbeHostGuard $guard,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function check(string $domain, string $check, ?string $selector = null): array
    {
        $normalizedDomain = $this->guard->normalizeHostname($domain);
        $normalizedCheck = strtolower(trim($check));

        if (! in_array($normalizedCheck, self::ALLOWED_CHECKS, true)) {
            throw ValidationException::withMessages([
                'check' => ['Unsupported MailHealth DNS check.'],
            ]);
        }

        $normalizedSelector = $normalizedCheck === 'dkim'
            ? $this->normalizeSelector($selector)
            : null;
        $cacheKey = 'mailhealth:dns:'.hash('sha256', implode('|', array_filter([
            $normalizedDomain,
            $normalizedCheck,
            $normalizedSelector,
        ])));

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $payload = match ($normalizedCheck) {
            'spf' => $this->checkSpf($normalizedDomain),
            'dkim' => $this->checkDkim($normalizedDomain, $normalizedSelector ?? ''),
            'dmarc' => $this->checkDmarc($normalizedDomain),
            'mx' => $this->checkMx($normalizedDomain),
        };

        Cache::put($cacheKey, $payload, (int) $payload['meta']['cache_ttl_seconds']);

        return $this->withCachedFlag($payload, false);
    }

    /**
     * @return array<string, mixed>
     */
    private function checkSpf(string $domain): array
    {
        $txtRecords = $this->txtValues($domain);
        $spfRecords = array_values(array_filter(
            $txtRecords,
            fn (string $record): bool => str_starts_with(strtolower($record), 'v=spf1'),
        ));
        $record = $spfRecords[0] ?? '';
        $lookupCount = $record === '' ? 0 : preg_match_all('/\b(?:include:|a(?=\s|:)|mx(?=\s|:)|ptr(?=\s|:)|exists:|redirect=)/i', $record);
        $allMechanism = $record !== '' && preg_match('/(?:^|\s)([+?~-]all)(?:\s|$)/i', $record, $matches)
            ? strtolower($matches[1])
            : null;
        $findings = [
            $this->finding('SPF record count', $this->recordCountStatus(count($spfRecords)), count($spfRecords) === 1 ? 'Exactly one SPF record was found.' : 'SPF should publish exactly one v=spf1 TXT record.', count($spfRecords)),
            $this->finding('All mechanism', $this->spfAllStatus($allMechanism), $allMechanism ? "SPF ends with {$allMechanism}." : 'No explicit all mechanism was found.'),
            $this->finding('DNS lookup mechanisms', $lookupCount > 10 ? 'fail' : ($lookupCount > 8 ? 'warn' : 'pass'), 'SPF DNS-lookup mechanisms should stay within the receiver limit.', $lookupCount),
        ];

        return $this->payload('spf', $domain, null, $findings, [
            'records' => array_map(fn (string $value): array => ['type' => 'TXT', 'value' => $value], $spfRecords),
            'summary' => count($spfRecords) === 1 ? 'SPF record found and parsed.' : 'SPF record shape needs review.',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function checkDkim(string $domain, string $selector): array
    {
        $queryName = "{$selector}._domainkey.{$domain}";
        $txtRecords = $this->txtValues($queryName);
        $dkimRecords = array_values(array_filter(
            $txtRecords,
            fn (string $record): bool => str_contains(strtolower($record), 'v=dkim1'),
        ));
        $tags = $this->parseTags($dkimRecords[0] ?? '');
        $hasPublicKey = isset($tags['p']) && trim($tags['p']) !== '';
        $keyType = $tags['k'] ?? 'rsa';
        $findings = [
            $this->finding('DKIM record count', $this->recordCountStatus(count($dkimRecords)), count($dkimRecords) === 1 ? 'Exactly one DKIM record was found for this selector.' : 'The selector should resolve to exactly one DKIM record.', count($dkimRecords)),
            $this->finding('Public key tag', $hasPublicKey ? 'pass' : 'fail', $hasPublicKey ? 'The DKIM public key tag is present.' : 'The DKIM public key tag is missing.'),
            $this->finding('Key type', in_array(strtolower($keyType), ['rsa', 'ed25519'], true) ? 'pass' : 'warn', "The key type tag is {$keyType}."),
        ];

        return $this->payload('dkim', $domain, $selector, $findings, [
            'records' => [[
                'type' => 'TXT',
                'host' => $queryName,
                'version' => $tags['v'] ?? null,
                'key_type' => $keyType,
                'public_key_present' => $hasPublicKey,
                'public_key_length' => isset($tags['p']) ? strlen((string) $tags['p']) : 0,
            ]],
            'summary' => $hasPublicKey ? 'DKIM selector publishes a public key.' : 'DKIM selector needs attention.',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function checkDmarc(string $domain): array
    {
        $queryName = "_dmarc.{$domain}";
        $txtRecords = $this->txtValues($queryName);
        $dmarcRecords = array_values(array_filter(
            $txtRecords,
            fn (string $record): bool => str_starts_with(strtolower($record), 'v=dmarc1'),
        ));
        $tags = $this->parseTags($dmarcRecords[0] ?? '');
        $policy = strtolower((string) ($tags['p'] ?? ''));
        $pct = isset($tags['pct']) ? (int) $tags['pct'] : 100;
        $ruaPresent = isset($tags['rua']) && trim((string) $tags['rua']) !== '';
        $findings = [
            $this->finding('DMARC record count', $this->recordCountStatus(count($dmarcRecords)), count($dmarcRecords) === 1 ? 'Exactly one DMARC record was found.' : 'DMARC should publish exactly one v=DMARC1 TXT record.', count($dmarcRecords)),
            $this->finding('Policy', in_array($policy, ['quarantine', 'reject'], true) ? 'pass' : ($policy === 'none' ? 'warn' : 'fail'), $policy ? "Policy is p={$policy}." : 'No DMARC policy tag was found.'),
            $this->finding('Aggregate reports', $ruaPresent ? 'pass' : 'warn', $ruaPresent ? 'Aggregate report destination is present.' : 'No aggregate report destination was found.'),
            $this->finding('Rollout percentage', $pct >= 100 ? 'pass' : 'warn', "DMARC pct is {$pct}.", $pct),
        ];

        return $this->payload('dmarc', $domain, null, $findings, [
            'records' => [[
                'type' => 'TXT',
                'host' => $queryName,
                'policy' => $policy ?: null,
                'subdomain_policy' => $tags['sp'] ?? null,
                'aggregate_reports_present' => $ruaPresent,
                'pct' => $pct,
            ]],
            'summary' => in_array($policy, ['quarantine', 'reject'], true) ? 'DMARC enforcement is published.' : 'DMARC is present but enforcement should be reviewed.',
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function checkMx(string $domain): array
    {
        $mxRecords = $this->resolver->resolve($domain, 'MX');
        usort($mxRecords, fn (array $a, array $b): int => ((int) ($a['pri'] ?? 0)) <=> ((int) ($b['pri'] ?? 0)));
        $records = [];

        foreach (array_slice($mxRecords, 0, 5) as $record) {
            $target = $this->normalizeMxTarget((string) ($record['target'] ?? ''));
            $addresses = $target === '' ? [] : $this->publicAddressesForHost($target);
            $records[] = [
                'type' => 'MX',
                'priority' => (int) ($record['pri'] ?? 0),
                'target' => $target,
                'address_count' => count($addresses),
                'public_addresses' => $addresses,
            ];
        }

        $findings = [
            $this->finding('MX record count', count($mxRecords) > 0 ? 'pass' : 'fail', count($mxRecords) > 0 ? 'At least one MX record was found.' : 'No MX records were found.', count($mxRecords)),
            $this->finding('Public MX resolution', $records !== [] && collect($records)->sum('address_count') > 0 ? 'pass' : 'warn', 'MailHealth checks that sampled MX hosts resolve to public addresses.'),
        ];

        return $this->payload('mx', $domain, null, $findings, [
            'records' => $records,
            'summary' => count($mxRecords) > 0 ? 'MX records were found and sampled.' : 'Inbound mail routing needs MX records.',
        ]);
    }

    private function normalizeSelector(?string $selector): string
    {
        $normalized = strtolower(trim((string) $selector));

        if ($normalized === '' || ! preg_match('/^[a-z0-9][a-z0-9_-]{0,62}$/', $normalized)) {
            throw ValidationException::withMessages([
                'selector' => ['Enter a DKIM selector label using letters, numbers, hyphen or underscore.'],
            ]);
        }

        return $normalized;
    }

    /**
     * @return string[]
     */
    private function txtValues(string $hostname): array
    {
        return array_values(array_filter(array_map(function (array $record): string {
            if (isset($record['entries']) && is_array($record['entries'])) {
                return implode('', array_map('strval', $record['entries']));
            }

            return (string) ($record['txt'] ?? '');
        }, $this->resolver->resolve($hostname, 'TXT'))));
    }

    /**
     * @return array<string, string>
     */
    private function parseTags(string $record): array
    {
        $tags = [];

        foreach (explode(';', $record) as $part) {
            [$key, $value] = array_pad(explode('=', trim($part), 2), 2, '');
            if ($key !== '') {
                $tags[strtolower($key)] = trim($value);
            }
        }

        return $tags;
    }

    private function recordCountStatus(int $count): string
    {
        return $count === 1 ? 'pass' : ($count === 0 ? 'fail' : 'warn');
    }

    private function spfAllStatus(?string $allMechanism): string
    {
        return match ($allMechanism) {
            '-all' => 'pass',
            '~all', '?all' => 'warn',
            '+all' => 'fail',
            default => 'warn',
        };
    }

    private function normalizeMxTarget(string $target): string
    {
        return strtolower(rtrim($target, '.'));
    }

    /**
     * @return string[]
     */
    private function publicAddressesForHost(string $hostname): array
    {
        $normalized = $this->guard->normalizeHostname($hostname);
        $addresses = $this->extractAddresses([
            ...$this->resolver->resolve($normalized, 'A'),
            ...$this->resolver->resolve($normalized, 'AAAA'),
        ]);

        $this->guard->assertPublicResolvedAddresses($normalized, $addresses);

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
     * @return array{label: string, status: string, detail: string, value?: mixed}
     */
    private function finding(string $label, string $status, string $detail, mixed $value = null): array
    {
        $finding = compact('label', 'status', 'detail');

        if ($value !== null) {
            $finding['value'] = $value;
        }

        return $finding;
    }

    /**
     * @param array<int, array<string, mixed>> $findings
     * @param array{records?: array<int, array<string, mixed>>, summary?: string} $extra
     * @return array<string, mixed>
     */
    private function payload(string $check, string $domain, ?string $selector, array $findings, array $extra): array
    {
        $status = $this->overallStatus($findings);

        return [
            'data' => [
                'check' => $check,
                'domain' => $domain,
                'selector' => $selector,
                'status' => $status,
                'summary' => $extra['summary'] ?? 'MailHealth DNS check completed.',
                'findings' => $findings,
                'records' => $extra['records'] ?? [],
                'warnings' => [
                    'DNS checks are point-in-time and do not prove inbox placement.',
                ],
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 120,
                'cached' => false,
                'privacy' => 'Domain inputs and DNS results are not sent to product analytics.',
            ],
        ];
    }

    /**
     * @param array<int, array<string, mixed>> $findings
     */
    private function overallStatus(array $findings): string
    {
        foreach ($findings as $finding) {
            if (($finding['status'] ?? null) === 'fail') {
                return 'fail';
            }
        }

        foreach ($findings as $finding) {
            if (($finding['status'] ?? null) === 'warn') {
                return 'warn';
            }
        }

        return 'pass';
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
