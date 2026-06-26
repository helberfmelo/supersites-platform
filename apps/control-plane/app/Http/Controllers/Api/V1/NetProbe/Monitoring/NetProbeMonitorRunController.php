<?php

namespace App\Http\Controllers\Api\V1\NetProbe\Monitoring;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\NetProbeMonitor;
use App\Support\NetProbe\Monitoring\NetProbeMonitorRunner;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class NetProbeMonitorRunController extends Controller
{
    public function __invoke(Request $request, NetProbeMonitor $monitor, NetProbeMonitorRunner $runner): JsonResponse
    {
        abort_unless($monitor->user_id === $request->user()?->id, 404);

        $check = $runner->run($monitor);

        AuditLog::record($request->user(), 'api.netprobe.monitors.run', $monitor->site, $monitor, [
            'monitor_type' => $monitor->type,
            'target_hash' => $monitor->target_hash,
            'check_status' => $check->status,
        ]);

        return response()->json([
            'data' => [
                'id' => $check->id,
                'monitor_id' => $monitor->id,
                'status' => $check->status,
                'finished_at' => $check->finished_at?->toISOString(),
                'summary' => $check->response_summary,
                'error_message' => $check->error_message,
            ],
        ]);
    }
}
