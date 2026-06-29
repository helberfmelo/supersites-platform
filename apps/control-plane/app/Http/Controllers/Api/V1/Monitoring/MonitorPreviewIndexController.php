<?php

namespace App\Http\Controllers\Api\V1\Monitoring;

use App\Http\Controllers\Controller;
use App\Support\Billing\PaidMonitorPreviewService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MonitorPreviewIndexController extends Controller
{
    public function __invoke(Request $request, PaidMonitorPreviewService $previews): JsonResponse
    {
        return response()->json([
            'data' => $previews->catalog($request->user()),
            'meta' => [
                'contract_version' => PaidMonitorPreviewService::CONTRACT_VERSION,
                'mode' => 'authenticated_preview',
                'real_monitoring_enabled' => false,
                'worker_enabled' => false,
                'alert_delivery_enabled' => false,
            ],
        ]);
    }
}
