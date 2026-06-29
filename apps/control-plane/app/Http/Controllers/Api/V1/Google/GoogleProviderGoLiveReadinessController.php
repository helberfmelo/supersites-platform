<?php

namespace App\Http\Controllers\Api\V1\Google;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Google\GoogleProviderGoLiveReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GoogleProviderGoLiveReadinessController extends Controller
{
    public function __invoke(Request $request, GoogleProviderGoLiveReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.google.go_live_readiness.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'integrations' => $snapshot['data']['summary']['integrations'],
            'sites_ready_for_human_activation' => $snapshot['data']['summary']['sites_ready_for_human_activation'],
            'sites_loading_ga4' => $snapshot['data']['summary']['sites_loading_ga4'],
            'sites_loading_gtm' => $snapshot['data']['summary']['sites_loading_gtm'],
            'sites_importing_search_console' => $snapshot['data']['summary']['sites_importing_search_console'],
            'provider_activation' => false,
        ]);

        return response()->json($snapshot);
    }
}
