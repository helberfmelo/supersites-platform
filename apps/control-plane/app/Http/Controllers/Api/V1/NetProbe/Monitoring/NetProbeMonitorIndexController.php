<?php

namespace App\Http\Controllers\Api\V1\NetProbe\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\NetProbeMonitor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NetProbeMonitorIndexController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $monitors = NetProbeMonitor::query()
            ->with('latestCheck')
            ->where('user_id', $request->user()?->id)
            ->latest()
            ->get();

        return response()->json([
            'data' => $monitors->map(fn (NetProbeMonitor $monitor): array => $this->serializeMonitor($monitor))->values(),
            'meta' => [
                'count' => $monitors->count(),
                'quota_plan' => 'free_preview',
                'max_monitors' => (int) config('netprobe.quotas.free_preview.max_monitors', 3),
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
