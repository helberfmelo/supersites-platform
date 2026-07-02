<?php

namespace App\Support\NetProbe;

use Illuminate\Http\Client\Pool;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Http;

class GoogleEcsNetProbePropagationResolver implements NetProbePropagationResolver
{
    /**
     * @return array{
     *     provider: string,
     *     mode: string,
     *     snapshots: array<int, array<string, mixed>>,
     *     warnings: string[],
     *     locations_requested: int
     * }
     */
    public function lookup(string $hostname, string $type): array
    {
        $profiles = $this->profiles();
        $endpoint = (string) config('netprobe.propagation.google_ecs.endpoint', 'https://dns.google/resolve');
        $timeout = (float) config('netprobe.propagation.google_ecs.timeout_seconds', 3.0);
        $verifyTls = (bool) config('netprobe.propagation.google_ecs.verify_tls', true);

        if ($profiles === []) {
            return [
                'provider' => 'google_public_dns_ecs',
                'mode' => 'disabled',
                'snapshots' => [],
                'warnings' => ['No regional DNS propagation profiles are configured.'],
                'locations_requested' => 0,
            ];
        }

        $responses = Http::pool(function (Pool $pool) use ($profiles, $endpoint, $hostname, $type, $timeout, $verifyTls): array {
            $requests = [];

            foreach ($profiles as $profile) {
                $requests[] = $pool
                    ->as($profile['resolver_id'])
                    ->timeout($timeout)
                    ->withOptions(['verify' => $verifyTls])
                    ->acceptJson()
                    ->get($endpoint, [
                        'name' => $hostname,
                        'type' => $type,
                        'edns_client_subnet' => $profile['client_subnet'],
                    ]);
            }

            return $requests;
        });

        $snapshots = [];

        foreach ($profiles as $profile) {
            $response = $responses[$profile['resolver_id']] ?? null;
            $snapshots[] = $this->snapshotFromResponse($profile, $type, $response);
        }

        return [
            'provider' => 'google_public_dns_ecs',
            'mode' => 'regional_doh_with_edns_client_subnet',
            'snapshots' => $snapshots,
            'warnings' => [
                'Regional rows are real Google Public DNS-over-HTTPS queries using EDNS Client Subnet location hints.',
                'They are not dedicated NetProbe servers in each city; exact server-per-city propagation requires a distributed probe network.',
            ],
            'locations_requested' => count($profiles),
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function profiles(): array
    {
        $profiles = config('netprobe.propagation.google_ecs.locations', []);

        if (! is_array($profiles)) {
            return [];
        }

        $limit = (int) config('netprobe.propagation.google_ecs.max_locations', 24);

        return array_slice(array_values(array_filter(
            $profiles,
            fn (mixed $profile): bool => is_array($profile)
                && isset($profile['resolver_id'], $profile['client_subnet']),
        )), 0, max(1, $limit));
    }

    /**
     * @param array<string, mixed> $profile
     */
    private function snapshotFromResponse(array $profile, string $type, mixed $response): array
    {
        if (! $response instanceof Response) {
            return $this->snapshot($profile, 'error', null, []);
        }

        if (! $response->ok()) {
            return $this->snapshot($profile, 'error', null, []);
        }

        $body = $response->json();
        if (! is_array($body)) {
            return $this->snapshot($profile, 'error', null, []);
        }

        $answers = $this->answersForType($body, $type);
        $values = array_values(array_unique(array_filter(array_map(
            fn (array $answer): string => $this->normalizeAnswerValue((string) ($answer['data'] ?? '')),
            $answers,
        ))));
        $ttls = array_values(array_filter(array_map(
            fn (array $answer): int => (int) ($answer['TTL'] ?? 0),
            $answers,
        ), fn (int $ttl): bool => $ttl > 0));
        $statusCode = (int) ($body['Status'] ?? 0);
        $status = match (true) {
            $values !== [] => 'answered',
            in_array($statusCode, [0, 3], true) => 'empty',
            default => 'error',
        };

        return $this->snapshot($profile, $status, $ttls === [] ? null : min($ttls), $values);
    }

    /**
     * @param array<string, mixed> $body
     * @return array<int, array<string, mixed>>
     */
    private function answersForType(array $body, string $type): array
    {
        $answers = $body['Answer'] ?? [];
        if (! is_array($answers)) {
            return [];
        }

        $expectedType = $this->typeCode($type);

        return array_values(array_filter($answers, function (mixed $answer) use ($expectedType): bool {
            return is_array($answer) && (int) ($answer['type'] ?? 0) === $expectedType;
        }));
    }

    private function typeCode(string $type): int
    {
        return match (strtoupper($type)) {
            'A' => 1,
            'NS' => 2,
            'CNAME' => 5,
            'SOA' => 6,
            'PTR' => 12,
            'MX' => 15,
            'TXT' => 16,
            'AAAA' => 28,
            'SRV' => 33,
            'CAA' => 257,
            default => 0,
        };
    }

    private function normalizeAnswerValue(string $value): string
    {
        $value = trim($value);
        $value = preg_replace('/\s+/', ' ', $value) ?? $value;

        return rtrim($value, '.');
    }

    /**
     * @param array<string, mixed> $profile
     * @param string[] $values
     * @return array<string, mixed>
     */
    private function snapshot(array $profile, string $status, ?int $ttlMin, array $values): array
    {
        return [
            'resolver_id' => (string) $profile['resolver_id'],
            'resolver_name' => 'Google Public DNS ECS',
            'region' => (string) ($profile['region'] ?? ''),
            'city' => (string) ($profile['city'] ?? ''),
            'country' => (string) ($profile['country'] ?? ''),
            'country_code' => (string) ($profile['country_code'] ?? ''),
            'flag' => '',
            'latitude' => isset($profile['latitude']) ? (float) $profile['latitude'] : null,
            'longitude' => isset($profile['longitude']) ? (float) $profile['longitude'] : null,
            'scope' => 'real DoH query with ECS hint '.$profile['client_subnet'],
            'status' => $status,
            'ttl_min' => $ttlMin,
            'values' => $values,
        ];
    }
}
