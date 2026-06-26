<?php

namespace App\Support\NetProbe\Monitoring;

use App\Mail\NetProbeMonitorAlertMail;
use App\Models\NetProbeAlert;
use App\Models\NetProbeMonitor;
use App\Models\NetProbeMonitorCheck;
use App\Support\NetProbe\NetProbeDnsResolver;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Throwable;

class NetProbeAlertDispatcher
{
    public function __construct(
        private readonly NetProbeHostGuard $guard,
        private readonly NetProbeDnsResolver $resolver,
    ) {
    }

    public function dispatchForCheck(NetProbeMonitorCheck $check, string $previousStatus): void
    {
        if ($check->status === NetProbeMonitor::CHECK_OK) {
            return;
        }

        if (in_array($previousStatus, [NetProbeMonitor::CHECK_WARNING, NetProbeMonitor::CHECK_FAILED], true)) {
            return;
        }

        $monitor = $check->monitor()->firstOrFail();
        $settings = is_array($monitor->settings) ? $monitor->settings : [];

        $email = Arr::get($settings, 'alert_email');
        if (is_string($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $this->dispatchEmail($check, strtolower($email));
        }

        $webhookUrl = Arr::get($settings, 'webhook_url');
        if (is_string($webhookUrl) && $webhookUrl !== '') {
            $this->dispatchWebhook($check, $webhookUrl);
        }
    }

    private function dispatchEmail(NetProbeMonitorCheck $check, string $email): void
    {
        $alert = $this->createAlert($check, 'email', $email);

        if (! (bool) config('netprobe.alerts.email_delivery_enabled', true)) {
            $alert->forceFill([
                'status' => 'skipped',
                'error_message' => 'Email delivery is disabled in this environment.',
            ])->save();

            return;
        }

        Mail::to($email)->queue(new NetProbeMonitorAlertMail($alert));

        $alert->forceFill(['status' => 'queued'])->save();
    }

    private function dispatchWebhook(NetProbeMonitorCheck $check, string $webhookUrl): void
    {
        $alert = $this->createAlert($check, 'webhook', $webhookUrl);

        if (! (bool) config('netprobe.alerts.webhook_delivery_enabled', false)) {
            $alert->forceFill([
                'status' => 'skipped',
                'error_message' => 'Webhook delivery is disabled until outbound alert workers are explicitly enabled.',
            ])->save();

            return;
        }

        try {
            $this->assertWebhookUrlIsPublicHttps($webhookUrl);

            $response = Http::timeout(5)
                ->retry(2, 200)
                ->post($webhookUrl, $this->outboundPayload($check));

            $alert->forceFill([
                'status' => $response->successful() ? 'sent' : 'failed',
                'sent_at' => $response->successful() ? now() : null,
                'error_message' => $response->successful() ? null : 'Webhook returned HTTP '.$response->status().'.',
            ])->save();
        } catch (Throwable $exception) {
            $alert->forceFill([
                'status' => 'failed',
                'error_message' => mb_substr($exception->getMessage(), 0, 300),
            ])->save();
        }
    }

    private function createAlert(NetProbeMonitorCheck $check, string $channel, string $destination): NetProbeAlert
    {
        return NetProbeAlert::create([
            'monitor_id' => $check->monitor_id,
            'monitor_check_id' => $check->id,
            'channel' => $channel,
            'destination_hash' => hash('sha256', strtolower(trim($destination))),
            'status' => 'pending',
            'severity' => $check->status === NetProbeMonitor::CHECK_FAILED ? 'critical' : 'warning',
            'triggered_at' => now(),
            'payload' => $this->storedPayload($check),
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function storedPayload(NetProbeMonitorCheck $check): array
    {
        $monitor = $check->monitor()->firstOrFail();

        return [
            'monitor_id' => $monitor->id,
            'monitor_type' => $monitor->type,
            'status' => $check->status,
            'checked_at' => $check->finished_at?->toISOString(),
            'summary' => $check->response_summary,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function outboundPayload(NetProbeMonitorCheck $check): array
    {
        $monitor = $check->monitor()->firstOrFail();

        return [
            'event' => 'netprobe.monitor_alert',
            'monitor' => [
                'id' => $monitor->id,
                'type' => $monitor->type,
                'label' => $monitor->label,
                'target' => $monitor->target,
            ],
            'check' => [
                'id' => $check->id,
                'status' => $check->status,
                'finished_at' => $check->finished_at?->toISOString(),
                'summary' => $check->response_summary,
                'error_message' => $check->error_message,
            ],
        ];
    }

    private function assertWebhookUrlIsPublicHttps(string $url): void
    {
        $parts = parse_url($url);
        $scheme = strtolower((string) ($parts['scheme'] ?? ''));
        $host = $parts['host'] ?? null;

        if ($scheme !== 'https' || ! is_string($host) || $host === '') {
            throw ValidationException::withMessages([
                'webhook_url' => ['Webhook alerts require a public HTTPS URL.'],
            ]);
        }

        $hostname = $this->guard->normalizeHostname($host);
        $records = [
            ...$this->resolver->resolve($hostname, 'A'),
            ...$this->resolver->resolve($hostname, 'AAAA'),
        ];

        $addresses = [];
        foreach ($records as $record) {
            foreach (['ip', 'ipv6'] as $key) {
                if (isset($record[$key]) && filter_var($record[$key], FILTER_VALIDATE_IP)) {
                    $addresses[] = (string) $record[$key];
                }
            }
        }

        $addresses = array_values(array_unique($addresses));
        if ($addresses === []) {
            throw ValidationException::withMessages([
                'webhook_url' => ['Webhook host must resolve to a public A or AAAA address before delivery.'],
            ]);
        }

        $this->guard->assertPublicResolvedAddresses($hostname, $addresses);
    }
}
