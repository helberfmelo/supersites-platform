<?php

namespace App\Http\Controllers\Api\V1\NetProbe\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\NetProbeMonitor;
use App\Models\Site;
use App\Support\Billing\PlanEntitlementResolver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NetProbeMonitorIndexController extends Controller
{
    public function __invoke(Request $request, PlanEntitlementResolver $entitlements): JsonResponse
    {
        $monitors = NetProbeMonitor::query()
            ->with('latestCheck')
            ->where('user_id', $request->user()?->id)
            ->latest()
            ->get();
        $site = Site::query()->where('slug', 'netprobe-atlas')->first();
        $quota = $entitlements->monitorQuota(
            $site,
            (int) config('netprobe.quotas.free_preview.max_monitors', 3),
            config('netprobe.quotas.free_preview.allowed_types', NetProbeMonitor::allowedTypes()),
        );

        return response()->json([
            'data' => $monitors->map(fn (NetProbeMonitor $monitor): array => $this->serializeMonitor($monitor))->values(),
            'meta' => [
                'count' => $monitors->count(),
                'quota_plan' => 'free_preview',
                'billing_plan' => $quota['plan_slug'],
                'quota_source' => $quota['source'],
                'max_monitors' => $quota['max_monitors'],
                'remaining_monitors' => max(0, ((int) $quota['max_monitors']) - $monitors->count()),
                'allowed_types' => $quota['allowed_types'],
                'checkout_enabled' => $quota['checkout_enabled'],
            ],
        ]);
    }

    /**
     * @return array<string, mixed>
     */
    private function serializeMonitor(NetProbeMonitor $monitor): array
    {
        return [
            'id' => $monitor->id,
            'type' => $monitor->type,
            'label' => $monitor->label,
            'target' => $monitor->target,
            'status' => $monitor->status,
            'last_status' => $monitor->last_status,
            'frequency_minutes' => $monitor->frequency_minutes,
            'next_run_at' => $monitor->next_run_at?->toISOString(),
            'last_checked_at' => $monitor->last_checked_at?->toISOString(),
            'settings' => $monitor->settings,
            'latest_check' => $monitor->latestCheck ? [
                'id' => $monitor->latestCheck->id,
                'status' => $monitor->latestCheck->status,
                'finished_at' => $monitor->latestCheck->finished_at?->toISOString(),
                'summary' => $monitor->latestCheck->response_summary,
            ] : null,
        ];
    }
}
