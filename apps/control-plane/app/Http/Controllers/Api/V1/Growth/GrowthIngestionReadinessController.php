<?php

namespace App\Http\Controllers\Api\V1\Growth;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Growth\GrowthIngestionReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GrowthIngestionReadinessController extends Controller
{
    public function __invoke(Request $request, GrowthIngestionReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.growth.ingestion_readiness.viewed', metadata: [
            'provider_activation' => false,
            'sources' => $snapshot['data']['summary']['sources'],
            'sources_importing' => $snapshot['data']['summary']['sources_importing'],
            'provider_requests_enabled' => $snapshot['data']['summary']['provider_requests_enabled'],
        ]);

        return response()->json($snapshot);
    }
}
