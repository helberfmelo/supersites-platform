<?php

namespace App\Http\Controllers\Api\V1\Growth;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Growth\GrowthAutomationReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GrowthAutomationReadinessController extends Controller
{
    public function __invoke(Request $request, GrowthAutomationReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.growth.automation_readiness.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'provider_activation' => $snapshot['meta']['provider_activation'],
            'pr_review_candidates' => $snapshot['data']['summary']['pr_review_candidates'],
            'branches_created' => $snapshot['data']['summary']['branches_created'],
            'pull_requests_opened' => $snapshot['data']['summary']['pull_requests_opened'],
            'auto_merge_enabled' => $snapshot['data']['summary']['auto_merge_enabled'],
            'direct_publish_enabled' => $snapshot['data']['summary']['direct_publish_enabled'],
        ]);

        return response()->json($snapshot);
    }
}
