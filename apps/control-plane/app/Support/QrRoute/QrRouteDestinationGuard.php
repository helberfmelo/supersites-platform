<?php

namespace App\Support\QrRoute;

use Illuminate\Validation\ValidationException;

class QrRouteDestinationGuard
{
    /**
     * @var string[]
     */
    private array $blockedSuffixes = [
        'localhost',
        'local',
        'internal',
        'intranet',
        'home',
        'lan',
    ];

    public function normalizeDestination(string $value): string
    {
        $url = trim($value);

        if ($url === '') {
            $this->reject('Destination URL is required.');
        }

        if (strlen($url) > 2048) {
            $this->reject('Destination URL is too long.');
        }

        $parts = parse_url($url);
        if (! is_array($parts) || empty($parts['scheme']) || empty($parts['host'])) {
            $this->reject('Destination must be an absolute HTTP or HTTPS URL.');
        }

        $scheme = strtolower((string) $parts['scheme']);
        if (! in_array($scheme, ['http', 'https'], true)) {
            $this->reject('Only HTTP and HTTPS destinations are allowed.');
        }

        if (! empty($parts['user']) || ! empty($parts['pass'])) {
            $this->reject('URLs with embedded credentials are blocked.');
        }

        $host = strtolower((string) $parts['host']);
        $this->assertPublicHost($host);

        return $this->buildUrlWithoutFragment($parts, $scheme, $host);
    }

    private function assertPublicHost(string $host): void
    {
        $host = trim($host, '[]');

        if ($host === '') {
            $this->reject('Destination host is required.');
        }

        foreach ($this->blockedSuffixes as $suffix) {
            if ($host === $suffix || str_ends_with($host, '.'.$suffix)) {
                $this->reject('Local or private hostnames are blocked.');
            }
        }

        if (filter_var($host, FILTER_VALIDATE_IP)) {
            if (filter_var($host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false) {
                $this->reject('Private, loopback and reserved IP destinations are blocked.');
            }

            return;
        }

        if (! preg_match('/^[a-z0-9.-]+$/', $host)) {
            $this->reject('Only ASCII destination hosts are supported in this sprint.');
        }

        if (strlen($host) > 253) {
            $this->reject('Destination host is too long.');
        }

        $labels = explode('.', $host);
        if (count($labels) < 2) {
            $this->reject('Enter a fully-qualified public destination host.');
        }

        foreach ($labels as $label) {
            if ($label === '' || strlen($label) > 63 || ! preg_match('/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/', $label)) {
                $this->reject('Destination host contains an invalid label.');
            }
        }
    }

    /**
     * @param array<string, int|string> $parts
     */
    private function buildUrlWithoutFragment(array $parts, string $scheme, string $host): string
    {
        $port = isset($parts['port']) ? ':'.(int) $parts['port'] : '';
        $path = (string) ($parts['path'] ?? '/');
        $query = isset($parts['query']) && $parts['query'] !== '' ? '?'.$parts['query'] : '';

        return "{$scheme}://{$host}{$port}{$path}{$query}";
    }

    private function reject(string $message): never
    {
        throw ValidationException::withMessages([
            'destination_url' => [$message],
        ]);
    }
}
