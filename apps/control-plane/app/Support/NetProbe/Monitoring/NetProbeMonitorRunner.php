<?php

namespace App\Support\NetProbe\Monitoring;

use App\Models\NetProbeMonitor;
use App\Models\NetProbeMonitorCheck;
use App\Support\NetProbe\DnsLookupService;
use App\Support\NetProbe\RdapLookupService;
use App\Support\NetProbe\SslCertificateService;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Throwable;

class NetProbeMonitorRunner
{
    public function __construct(
        private readonly DnsLookupService $dnsLookup,
        private readonly SslCertificateService $sslCertificate,
        private readonly RdapLookupService $rdapLookup,
        private readonly NetProbeAlertDispatcher $alerts,
    ) {
    }

    public function run(NetProbeMonitor $monitor): NetProbeMonitorCheck
    {
        $monitor->refresh();

        $previousStatus = $monitor->last_status;
        $startedAt = now();
        $start = microtime(true);
        $status = NetProbeMonitor::CHECK_FAILED;
        $summary = [];
        $error = null;

        try {
            [$status, $summary] = match ($monitor->type) {
                NetProbeMonitor::TYPE_DNS => $this->runDns($monitor),
                NetProbeMonitor::TYPE_SSL => $this->runSsl($monitor),
                NetProbeMonitor::TYPE_DOMAIN => $this->runDomain($monitor),
                default => throw ValidationException::withMessages([
                    'type' => ['Unsupported NetProbe monitor type.'],
                ]),
            };
        } catch (ValidationException $exception) {
            $error = $this->validationMessage($exception);
            $summary = ['validation_failed' => true];
        } catch (Throwable $exception) {
            $error = Str::limit($exception::class.': '.$exception->getMessage(), 300, '');
            $summary = ['runtime_failed' => true];
        }

        $finishedAt = now();
        $check = $monitor->checks()->create([
            'status' => $status,
            'started_at' => $startedAt,
            'finished_at' => $finishedAt,
            'duration_ms' => max(0, (int) round((microtime(true) - $start) * 1000)),
            'response_summary' => $summary,
            'error_message' => $error,
        ]);

        $monitor->forceFill([
            'last_status' => $status,
            'last_checked_at' => $finishedAt,
            'next_run_at' => $finishedAt->addMinutes($monitor->frequency_minutes),
        ])->save();

        $this->alerts->dispatchForCheck($check, (string) $previousStatus);

        return $check;
    }

    /**
     * @return array{0: string, 1: array<string, mixed>}
     */
    private function runDns(NetProbeMonitor $monitor): array
    {
        $settings = $this->settings($monitor);
        $recordTypes = $this->stringList($settings['record_types'] ?? ['A']);
        $expectedValues = $this->stringList($settings['expected_values'] ?? []);
        $payload = $this->dnsLookup->lookup($monitor->target, $recordTypes);
        $records = is_array(Arr::get($payload, 'data.records')) ? Arr::get($payload, 'data.records') : [];
        $values = $this->dnsValues($records);
        $recordCounts = [];

        foreach ($recordTypes as $type) {
            $recordCounts[$type] = count(is_array($records[$type] ?? null) ? $records[$type] : []);
        }

        $missingExpected = array_values(array_filter(
            $expectedValues,
            fn (string $expected): bool => ! in_array($expected, $values, true),
        ));

        $status = $values === [] || $missingExpected !== []
            ? NetProbeMonitor::CHECK_FAILED
            : NetProbeMonitor::CHECK_OK;

        return [$status, [
            'record_types' => $recordTypes,
            'record_counts' => $recordCounts,
            'sample_values' => array_slice($values, 0, 10),
            'missing_expected_values' => $missingExpected,
            'checked_addresses_count' => count((array) Arr::get($payload, 'data.checked_addresses', [])),
            'warnings' => (array) Arr::get($payload, 'meta.warnings', []),
        ]];
    }

    /**
     * @return array{0: string, 1: array<string, mixed>}
     */
    private function runSsl(NetProbeMonitor $monitor): array
    {
        $payload = $this->sslCertificate->inspect($monitor->target);
        $daysUntilExpiration = Arr::get($payload, 'data.days_until_expiration');
        $matchesHostname = (bool) Arr::get($payload, 'data.matches_hostname', false);
        $isExpired = (bool) Arr::get($payload, 'data.is_expired', false);

        $status = NetProbeMonitor::CHECK_OK;
        if ($isExpired || ! $matchesHostname) {
            $status = NetProbeMonitor::CHECK_FAILED;
        } elseif (is_int($daysUntilExpiration) && $daysUntilExpiration <= 14) {
            $status = NetProbeMonitor::CHECK_WARNING;
        }

        return [$status, [
            'days_until_expiration' => $daysUntilExpiration,
            'matches_hostname' => $matchesHostname,
            'is_expired' => $isExpired,
            'subject_common_name' => Arr::get($payload, 'data.subject.common_name'),
            'issuer_common_name' => Arr::get($payload, 'data.issuer.common_name'),
            'checked_addresses_count' => count((array) Arr::get($payload, 'data.checked_addresses', [])),
            'warnings' => (array) Arr::get($payload, 'meta.warnings', []),
        ]];
    }

    /**
     * @return array{0: string, 1: array<string, mixed>}
     */
    private function runDomain(NetProbeMonitor $monitor): array
    {
        $payload = $this->rdapLookup->lookup($monitor->target);
        $daysUntilExpiration = Arr::get($payload, 'data.days_until_expiration');

        $status = NetProbeMonitor::CHECK_OK;
        if (is_int($daysUntilExpiration) && $daysUntilExpiration < 0) {
            $status = NetProbeMonitor::CHECK_FAILED;
        } elseif (is_int($daysUntilExpiration) && $daysUntilExpiration <= 30) {
            $status = NetProbeMonitor::CHECK_WARNING;
        }

        return [$status, [
            'registrar_name' => Arr::get($payload, 'data.registrar.name'),
            'registered_at' => Arr::get($payload, 'data.registered_at'),
            'expires_at' => Arr::get($payload, 'data.expires_at'),
            'days_until_expiration' => $daysUntilExpiration,
            'nameserver_count' => count((array) Arr::get($payload, 'data.nameservers', [])),
            'statuses' => array_slice((array) Arr::get($payload, 'data.statuses', []), 0, 10),
            'warnings' => (array) Arr::get($payload, 'meta.warnings', []),
        ]];
    }

    /**
     * @return array<string, mixed>
     */
    private function settings(NetProbeMonitor $monitor): array
    {
        return is_array($monitor->settings) ? $monitor->settings : [];
    }

    /**
     * @return string[]
     */
    private function stringList(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return array_values(array_unique(array_filter(array_map(
            fn (mixed $item): string => trim((string) $item),
            $value,
        ), fn (string $item): bool => $item !== '')));
    }

    /**
     * @param array<string, mixed> $records
     * @return string[]
     */
    private function dnsValues(array $records): array
    {
        $values = [];

        foreach ($records as $items) {
            if (! is_array($items)) {
                continue;
            }

            foreach ($items as $record) {
                if (is_array($record) && isset($record['value']) && is_string($record['value']) && $record['value'] !== '') {
                    $values[] = $record['value'];
                }
            }
        }

        return array_values(array_unique($values));
    }

    private function validationMessage(ValidationException $exception): string
    {
        $messages = collect($exception->errors())->flatten()->implode(' ');

        return Str::limit($messages !== '' ? $messages : $exception->getMessage(), 300, '');
    }
}
