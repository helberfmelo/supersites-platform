<?php

namespace App\Http\Controllers\Api\V1\Growth;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Growth\GrowthReportingReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GrowthReportingReadinessController extends Controller
{
    public function __invoke(Request $request, GrowthReportingReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.growth.reporting_readiness.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'provider_activation' => $snapshot['meta']['provider_activation'],
            'reports' => $snapshot['data']['summary']['reports'],
            'reports_ready_for_operator_review' => $snapshot['data']['summary']['reports_ready_for_operator_review'],
            'emails_sent' => $snapshot['data']['summary']['emails_sent'],
            'provider_imports_enabled' => $snapshot['data']['summary']['provider_imports_enabled'],
            'causality_status' => $snapshot['data']['summary']['causality_status'],
        ]);

        return response()->json($snapshot);
    }
}
