<?php

namespace App\Support\NetProbe;

use Illuminate\Validation\ValidationException;

class NetProbeHostGuard
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

    public function normalizeHostname(string $value): string
    {
        $hostname = strtolower(trim($value));
        $hostname = rtrim($hostname, '.');

        if ($hostname === '') {
            $this->reject('Enter a domain name.');
        }

        if (str_contains($hostname, '://') || preg_match('/[\/:@\s]/', $hostname)) {
            $this->reject('Enter a hostname only, not a URL, IP with port or path.');
        }

        if (filter_var($hostname, FILTER_VALIDATE_IP)) {
            $this->reject('DNS lookup accepts hostnames only.');
        }

        if (! preg_match('/^[a-z0-9.-]+$/', $hostname)) {
            $this->reject('Only ASCII hostnames are supported in this lookup sprint.');
        }

        if (strlen($hostname) > 253) {
            $this->reject('Hostname is too long.');
        }

        $labels = explode('.', $hostname);
        if (count($labels) < 2) {
            $this->reject('Enter a fully-qualified public domain.');
        }

        foreach ($labels as $label) {
            if ($label === '' || strlen($label) > 63 || ! preg_match('/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/', $label)) {
                $this->reject('Hostname contains an invalid label.');
            }
        }

        foreach ($this->blockedSuffixes as $suffix) {
            if ($hostname === $suffix || str_ends_with($hostname, '.'.$suffix)) {
                $this->reject('Private or local-only hostnames are blocked.');
            }
        }

        return $hostname;
    }

    /**
     * @param string[] $addresses
     */
    public function assertPublicResolvedAddresses(string $hostname, array $addresses): void
    {
        foreach ($addresses as $address) {
            if (! $this->isPublicIp($address)) {
                $this->reject("{$hostname} resolves to an address range that NetProbe will not query.");
            }
        }
    }

    public function isPublicIp(string $address): bool
    {
        return filter_var(
            $address,
            FILTER_VALIDATE_IP,
            FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE,
        ) !== false;
    }

    private function reject(string $message): never
    {
        throw ValidationException::withMessages([
            'domain' => [$message],
        ]);
    }
}
