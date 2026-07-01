<?php

namespace App\Support\NetProbe;

class PhpNetProbeDnsResolver implements NetProbeDnsResolver
{
    /**
     * @return array<int, array<string, mixed>>
     */
    public function resolve(string $hostname, string $type): array
    {
        $type = strtoupper($type);
        $flag = $this->flagForType($type);

        if ($flag === null && $type !== 'CAA') {
            return [];
        }

        $records = @dns_get_record($hostname, $flag ?? DNS_ANY);
        if (! is_array($records)) {
            return [];
        }

        return array_values(array_filter(
            $records,
            fn (array $record): bool => strtoupper((string) ($record['type'] ?? '')) === $type,
        ));
    }

    private function flagForType(string $type): ?int
    {
        return match ($type) {
            'A' => DNS_A,
            'AAAA' => DNS_AAAA,
            'CNAME' => DNS_CNAME,
            'MX' => DNS_MX,
            'TXT' => DNS_TXT,
            'NS' => DNS_NS,
            'PTR' => defined('DNS_PTR') ? constant('DNS_PTR') : null,
            'SOA' => DNS_SOA,
            'SRV' => defined('DNS_SRV') ? constant('DNS_SRV') : null,
            'CAA' => defined('DNS_CAA') ? constant('DNS_CAA') : null,
            default => null,
        };
    }
}
