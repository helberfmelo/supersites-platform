<?php

namespace App\Http\Controllers\Api\V1\Growth;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Growth\GrowthPriorityReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GrowthPriorityReadinessController extends Controller
{
    public function __invoke(Request $request, GrowthPriorityReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.growth.priorities.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'provider_activation' => $snapshot['meta']['provider_activation'],
            'recommendations' => $snapshot['data']['summary']['recommendations'],
            'real_provider_data_snapshots' => $snapshot['data']['summary']['real_provider_data_snapshots'],
            'automatic_prioritization_enabled' => $snapshot['data']['summary']['automatic_prioritization_enabled'],
            'causality_status' => $snapshot['data']['summary']['causality_status'],
        ]);

        return response()->json($snapshot);
    }
}
