<?php

namespace App\Support\NetProbe;

use Illuminate\Support\Carbon;
use Illuminate\Validation\ValidationException;

class PhpNetProbeCertificateProbe implements NetProbeCertificateProbe
{
    /**
     * @return array<string, mixed>
     */
    public function inspect(string $hostname): array
    {
        $context = stream_context_create([
            'ssl' => [
                'SNI_enabled' => true,
                'capture_peer_cert' => true,
                'capture_peer_cert_chain' => true,
                'peer_name' => $hostname,
                'verify_peer' => false,
                'verify_peer_name' => false,
            ],
        ]);

        $errorNumber = 0;
        $errorMessage = '';
        $stream = @stream_socket_client(
            'ssl://'.$hostname.':443',
            $errorNumber,
            $errorMessage,
            6,
            STREAM_CLIENT_CONNECT,
            $context,
        );

        if (! is_resource($stream)) {
            $this->reject('TLS connection failed for this public hostname.');
        }

        $params = stream_context_get_params($stream);
        fclose($stream);

        $certificate = $params['options']['ssl']['peer_certificate'] ?? null;
        if ($certificate === null) {
            $this->reject('No peer certificate was returned by the TLS endpoint.');
        }

        $parsed = openssl_x509_parse($certificate);
        if (! is_array($parsed)) {
            $this->reject('The returned certificate could not be parsed.');
        }

        $chain = $params['options']['ssl']['peer_certificate_chain'] ?? [];

        return [
            'subject' => [
                'common_name' => $this->stringValue($parsed['subject']['CN'] ?? null),
                'organization' => $this->stringValue($parsed['subject']['O'] ?? null),
            ],
            'issuer' => [
                'common_name' => $this->stringValue($parsed['issuer']['CN'] ?? null),
                'organization' => $this->stringValue($parsed['issuer']['O'] ?? null),
            ],
            'serial_number' => $this->stringValue($parsed['serialNumberHex'] ?? $parsed['serialNumber'] ?? null),
            'valid_from' => $this->timeValue($parsed['validFrom_time_t'] ?? null),
            'valid_to' => $this->timeValue($parsed['validTo_time_t'] ?? null),
            'subject_alt_names' => $this->subjectAltNames($parsed['extensions']['subjectAltName'] ?? ''),
            'chain_count' => is_array($chain) ? count($chain) : 0,
            'fingerprint_sha256' => function_exists('openssl_x509_fingerprint')
                ? strtolower((string) openssl_x509_fingerprint($certificate, 'sha256'))
                : null,
        ];
    }

    private function timeValue(mixed $value): ?string
    {
        if (! is_int($value)) {
            return null;
        }

        return Carbon::createFromTimestampUTC($value)->toISOString();
    }

    /**
     * @return string[]
     */
    private function subjectAltNames(mixed $value): array
    {
        if (! is_string($value) || trim($value) === '') {
            return [];
        }

        $entries = preg_split('/,\s*/', $value) ?: [];
        $names = [];

        foreach ($entries as $entry) {
            if (str_starts_with($entry, 'DNS:')) {
                $names[] = strtolower(substr($entry, 4));
            }
        }

        return array_values(array_unique($names));
    }

    private function stringValue(mixed $value): ?string
    {
        if (is_array($value)) {
            $value = reset($value);
        }

        return is_scalar($value) ? trim((string) $value) : null;
    }

    private function reject(string $message): never
    {
        throw ValidationException::withMessages([
            'hostname' => [$message],
        ]);
    }
}
