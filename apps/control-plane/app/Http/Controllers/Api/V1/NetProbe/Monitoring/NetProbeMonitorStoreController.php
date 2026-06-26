<?php

namespace App\Http\Controllers\Api\V1\NetProbe\Monitoring;

use App\Http\Controllers\Controller;
use App\Jobs\RunNetProbeMonitorCheck;
use App\Models\AuditLog;
use App\Models\NetProbeMonitor;
use App\Models\Site;
use App\Support\NetProbe\DnsLookupService;
use App\Support\NetProbe\NetProbeHostGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class NetProbeMonitorStoreController extends Controller
{
    public function __invoke(Request $request, NetProbeHostGuard $guard): JsonResponse
    {
        $validated = $request->validate([
            'type' => ['required', 'string', Rule::in(NetProbeMonitor::allowedTypes())],
            'target' => ['required', 'string', 'max:253'],
            'label' => ['sometimes', 'nullable', 'string', 'max:120'],
            'frequency_minutes' => [
                'sometimes',
                'integer',
                'min:'.((int) config('netprobe.monitoring.minimum_frequency_minutes', 60)),
                'max:'.((int) config('netprobe.monitoring.maximum_frequency_minutes', 1440)),
            ],
            'settings' => ['sometimes', 'array'],
            'settings.record_types' => ['sometimes', 'array', 'max:8'],
            'settings.record_types.*' => ['required', 'string', 'max:8'],
            'settings.expected_values' => ['sometimes', 'array', 'max:10'],
            'settings.expected_values.*' => ['required', 'string', 'max:255'],
            'settings.alert_email' => ['sometimes', 'nullable', 'email', 'max:255'],
            'settings.webhook_url' => ['sometimes', 'nullable', 'url', 'max:2048'],
        ]);

        $this->assertQuotaAllowsMonitor($request);

        $target = $guard->normalizeHostname($validated['target']);
        $settings = $this->sanitizeSettings($validated['settings'] ?? [], $validated['type']);
        $site = Site::query()->where('slug', 'netprobe-atlas')->first();
        $frequency = (int) ($validated['frequency_minutes'] ?? config('netprobe.monitoring.default_frequency_minutes', 60));

        $monitor = NetProbeMonitor::create([
            'user_id' => $request->user()?->id,
            'site_id' => $site?->id,
            'type' => $validated['type'],
            'label' => $validated['label'] ?? null,
            'target' => $target,
            'target_hash' => hash('sha256', $target),
            'status' => NetProbeMonitor::STATUS_ACTIVE,
            'quota_plan' => 'free_preview',
            'frequency_minutes' => $frequency,
            'settings' => $settings,
            'last_status' => NetProbeMonitor::CHECK_UNKNOWN,
            'next_run_at' => now(),
        ]);

        AuditLog::record($request->user(), 'api.netprobe.monitors.store', $site, $monitor, [
            'monitor_type' => $monitor->type,
            'target_hash' => $monitor->target_hash,
            'frequency_minutes' => $monitor->frequency_minutes,
            'quota_plan' => $monitor->quota_plan,
        ]);

        RunNetProbeMonitorCheck::dispatch($monitor->id);

        return response()->json([
            'data' => [
                'id' => $monitor->id,
                'type' => $monitor->type,
                'target' => $monitor->target,
                'status' => $monitor->status,
                'last_status' => $monitor->last_status,
                'frequency_minutes' => $monitor->frequency_minutes,
                'next_run_at' => $monitor->next_run_at?->toISOString(),
                'settings' => $monitor->settings,
            ],
            'meta' => [
                'queued_initial_check' => true,
                'quota_plan' => $monitor->quota_plan,
                'max_monitors' => (int) config('netprobe.quotas.free_preview.max_monitors', 3),
            ],
        ], 201);
    }

    private function assertQuotaAllowsMonitor(Request $request): void
    {
        $max = (int) config('netprobe.quotas.free_preview.max_monitors', 3);
        $count = NetProbeMonitor::query()
            ->where('user_id', $request->user()?->id)
            ->whereIn('status', [NetProbeMonitor::STATUS_ACTIVE, NetProbeMonitor::STATUS_PAUSED])
            ->count();

        if ($count >= $max) {
            throw ValidationException::withMessages([
                'quota' => ['The free preview quota allows '.$max.' NetProbe monitors.'],
            ]);
        }
    }

    /**
     * @param array<string, mixed> $settings
     * @return array<string, mixed>
     */
    private function sanitizeSettings(array $settings, string $type): array
    {
        $sanitized = [];

        if ($type === NetProbeMonitor::TYPE_DNS) {
            $recordTypes = $settings['record_types'] ?? ['A'];
            $sanitized['record_types'] = array_values(array_unique(array_map(
                fn (mixed $type): string => strtoupper(trim((string) $type)),
                is_array($recordTypes) ? $recordTypes : ['A'],
            )));

            $invalid = array_values(array_diff($sanitized['record_types'], DnsLookupService::ALLOWED_TYPES));
            if ($invalid !== []) {
                throw ValidationException::withMessages([
                    'settings.record_types' => ['Unsupported DNS record type: '.implode(', ', $invalid)],
                ]);
            }

            if (isset($settings['expected_values']) && is_array($settings['expected_values'])) {
                $sanitized['expected_values'] = array_values(array_unique(array_filter(array_map(
                    fn (mixed $value): string => trim((string) $value),
                    $settings['expected_values'],
                ), fn (string $value): bool => $value !== '')));
            }
        }

        if (isset($settings['alert_email']) && is_string($settings['alert_email']) && $settings['alert_email'] !== '') {
            $sanitized['alert_email'] = strtolower(trim($settings['alert_email']));
        }

        if (isset($settings['webhook_url']) && is_string($settings['webhook_url']) && $settings['webhook_url'] !== '') {
            $webhookUrl = trim($settings['webhook_url']);
            if (strtolower((string) parse_url($webhookUrl, PHP_URL_SCHEME)) !== 'https') {
                throw ValidationException::withMessages([
                    'settings.webhook_url' => ['Webhook alerts require a public HTTPS URL.'],
                ]);
            }

            $sanitized['webhook_url'] = $webhookUrl;
        }

        return $sanitized;
    }
}
