<?php

namespace App\Http\Controllers\Api\V1\NetProbe\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\NetProbeMonitor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NetProbeMonitorShowController extends Controller
{
    public function __invoke(Request $request, NetProbeMonitor $monitor): JsonResponse
    {
        abort_unless($monitor->user_id === $request->user()?->id, 404);

        $monitor->load([
            'checks' => fn ($query) => $query->latest('started_at')->limit(10),
            'alerts' => fn ($query) => $query->latest('triggered_at')->limit(10),
        ]);

        return response()->json([
            'data' => [
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
                'checks' => $monitor->checks->map(fn ($check): array => [
                    'id' => $check->id,
                    'status' => $check->status,
                    'started_at' => $check->started_at?->toISOString(),
                    'finished_at' => $check->finished_at?->toISOString(),
                    'duration_ms' => $check->duration_ms,
                    'summary' => $check->response_summary,
                    'error_message' => $check->error_message,
                ])->values(),
                'alerts' => $monitor->alerts->map(fn ($alert): array => [
                    'id' => $alert->id,
                    'channel' => $alert->channel,
                    'status' => $alert->status,
                    'severity' => $alert->severity,
                    'triggered_at' => $alert->triggered_at?->toISOString(),
                    'sent_at' => $alert->sent_at?->toISOString(),
                    'error_message' => $alert->error_message,
                ])->values(),
            ],
        ]);
    }
}
