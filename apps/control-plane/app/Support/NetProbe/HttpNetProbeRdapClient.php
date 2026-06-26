<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\ValidationException;

class HttpNetProbeRdapClient implements NetProbeRdapClient
{
    /**
     * @return array<string, mixed>
     */
    public function lookupDomain(string $domain): array
    {
        $server = $this->serverForDomain($domain);
        $response = Http::timeout(6)
            ->accept('application/rdap+json, application/json')
            ->get(rtrim($server, '/').'/domain/'.rawurlencode($domain));

        if ($response->status() === 404) {
            $this->reject('The RDAP server did not return a domain record for this name.');
        }

        if (! $response->ok()) {
            $this->reject('The RDAP registry lookup is temporarily unavailable.');
        }

        $payload = $response->json();
        if (! is_array($payload)) {
            $this->reject('The RDAP server returned an unreadable response.');
        }

        /** @var array<string, mixed> $payload */
        return $payload;
    }

    private function serverForDomain(string $domain): string
    {
        $parts = explode('.', $domain);
        $tld = strtolower((string) end($parts));

        if ($tld === '') {
            $this->reject('Enter a registrable public domain.');
        }

        $services = Cache::remember('netprobe:rdap:dns-bootstrap', 86400, function (): array {
            $response = Http::timeout(6)
                ->acceptJson()
                ->get('https://data.iana.org/rdap/dns.json');

            if (! $response->ok()) {
                $this->reject('The RDAP bootstrap registry is temporarily unavailable.');
            }

            $payload = $response->json();
            if (! is_array($payload) || ! isset($payload['services']) || ! is_array($payload['services'])) {
                $this->reject('The RDAP bootstrap registry returned an unreadable response.');
            }

            return $payload['services'];
        });

        foreach ($services as $service) {
            if (! is_array($service) || count($service) < 2) {
                continue;
            }

            $supportedTlds = array_map(
                fn (mixed $value): string => strtolower((string) $value),
                is_array($service[0]) ? $service[0] : [],
            );
            $serverUrls = is_array($service[1]) ? $service[1] : [];

            if (in_array($tld, $supportedTlds, true) && isset($serverUrls[0]) && is_string($serverUrls[0])) {
                return $serverUrls[0];
            }
        }

        $this->reject('No public RDAP server is listed for this top-level domain.');
    }

    private function reject(string $message): never
    {
        throw ValidationException::withMessages([
            'domain' => [$message],
        ]);
    }
}
