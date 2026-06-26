<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Throwable;

class RdapLookupService
{
    public function __construct(
        private readonly NetProbeRdapClient $client,
        private readonly NetProbeHostGuard $guard,
    ) {
    }

    /**
     * @return array<string, mixed>
     */
    public function lookup(string $domain): array
    {
        $hostname = $this->guard->normalizeHostname($domain);
        $cacheKey = 'netprobe:rdap:'.hash('sha256', $hostname);

        if (Cache::has($cacheKey)) {
            /** @var array<string, mixed> $cached */
            $cached = Cache::get($cacheKey);

            return $this->withCachedFlag($cached, true);
        }

        $payload = $this->normalize($hostname, $this->client->lookupDomain($hostname));
        Cache::put($cacheKey, $payload, (int) $payload['meta']['cache_ttl_seconds']);

        return $this->withCachedFlag($payload, false);
    }

    /**
     * @param array<string, mixed> $rdap
     * @return array<string, mixed>
     */
    private function normalize(string $hostname, array $rdap): array
    {
        $registeredAt = $this->eventDate($rdap, 'registration');
        $expiresAt = $this->eventDate($rdap, 'expiration');
        $updatedAt = $this->eventDate($rdap, 'last changed')
            ?? $this->eventDate($rdap, 'last update of rdap database')
            ?? $this->eventDate($rdap, 'last update');

        return [
            'data' => [
                'domain' => strtolower((string) ($rdap['ldhName'] ?? $hostname)),
                'handle' => $rdap['handle'] ?? null,
                'registrar' => $this->registrar($rdap),
                'statuses' => $this->stringList($rdap['status'] ?? []),
                'registered_at' => $registeredAt,
                'updated_at' => $updatedAt,
                'expires_at' => $expiresAt,
                'age_days' => $registeredAt ? $this->diffDays($registeredAt, now()) : null,
                'days_until_expiration' => $expiresAt ? $this->diffDays(now(), $expiresAt) : null,
                'nameservers' => $this->nameservers($rdap),
                'limitations' => $this->limitations($rdap),
            ],
            'meta' => [
                'generated_at' => now()->toISOString(),
                'cache_ttl_seconds' => 21600,
                'cached' => false,
                'warnings' => [
                    'Personal contact data is omitted from NetProbe RDAP summaries.',
                    'Registry RDAP rate limits and redaction policies vary by top-level domain.',
                ],
            ],
        ];
    }

    /**
     * @param array<string, mixed> $rdap
     * @return array<string, string|null>
     */
    private function registrar(array $rdap): array
    {
        $entities = is_array($rdap['entities'] ?? null) ? $rdap['entities'] : [];

        foreach ($entities as $entity) {
            if (! is_array($entity)) {
                continue;
            }

            $roles = $this->stringList($entity['roles'] ?? []);
            if (in_array('registrar', array_map('strtolower', $roles), true)) {
                return [
                    'name' => $this->entityName($entity),
                    'handle' => isset($entity['handle']) ? (string) $entity['handle'] : null,
                ];
            }
        }

        return [
            'name' => null,
            'handle' => null,
        ];
    }

    /**
     * @param array<string, mixed> $entity
     */
    private function entityName(array $entity): ?string
    {
        if (isset($entity['name']) && is_string($entity['name'])) {
            return $entity['name'];
        }

        if (! isset($entity['vcardArray']) || ! is_array($entity['vcardArray'])) {
            return null;
        }

        $vcard = $entity['vcardArray'][1] ?? [];
        if (! is_array($vcard)) {
            return null;
        }

        foreach ($vcard as $entry) {
            if (is_array($entry) && ($entry[0] ?? null) === 'fn' && isset($entry[3]) && is_string($entry[3])) {
                return $entry[3];
            }
        }

        return null;
    }

    /**
     * @param array<string, mixed> $rdap
     */
    private function eventDate(array $rdap, string $action): ?string
    {
        $events = is_array($rdap['events'] ?? null) ? $rdap['events'] : [];

        foreach ($events as $event) {
            if (! is_array($event)) {
                continue;
            }

            if (strtolower((string) ($event['eventAction'] ?? '')) !== $action) {
                continue;
            }

            return $this->isoDate($event['eventDate'] ?? null);
        }

        return null;
    }

    /**
     * @param array<string, mixed> $rdap
     * @return string[]
     */
    private function nameservers(array $rdap): array
    {
        $nameservers = is_array($rdap['nameservers'] ?? null) ? $rdap['nameservers'] : [];
        $values = [];

        foreach ($nameservers as $nameserver) {
            if (is_array($nameserver) && isset($nameserver['ldhName']) && is_string($nameserver['ldhName'])) {
                $values[] = strtolower($nameserver['ldhName']);
            }
        }

        return array_values(array_unique($values));
    }

    /**
     * @param array<string, mixed> $rdap
     * @return string[]
     */
    private function limitations(array $rdap): array
    {
        $entries = [];

        foreach (['notices', 'remarks'] as $key) {
            $items = is_array($rdap[$key] ?? null) ? $rdap[$key] : [];
            foreach ($items as $item) {
                if (! is_array($item)) {
                    continue;
                }

                $title = isset($item['title']) && is_string($item['title']) ? $item['title'] : null;
                $descriptions = $this->stringList($item['description'] ?? []);
                $message = trim((string) $title.' '.implode(' ', array_slice($descriptions, 0, 2)));

                if ($message !== '') {
                    $entries[] = $message;
                }
            }
        }

        return array_slice(array_values(array_unique($entries)), 0, 5);
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
            fn (mixed $item): string => trim((string) $item),
            $value,
        ), fn (string $item): bool => $item !== ''));
    }

    private function isoDate(mixed $value): ?string
    {
        if (! is_string($value) || trim($value) === '') {
            return null;
        }

        try {
            return Carbon::parse($value)->toISOString();
        } catch (Throwable) {
            return null;
        }
    }

    private function diffDays(string|Carbon $from, string|Carbon $to): int
    {
        return (int) floor(Carbon::parse($from)->diffInDays(Carbon::parse($to), false));
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
