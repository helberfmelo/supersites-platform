<?php

namespace App\Http\Controllers\Api\V1\Billing;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Support\Billing\BillingProviderGoLiveReadiness;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BillingProviderGoLiveReadinessController extends Controller
{
    public function __invoke(Request $request, BillingProviderGoLiveReadiness $readiness): JsonResponse
    {
        $snapshot = $readiness->snapshot();

        AuditLog::record($request->user(), 'api.billing.go_live_readiness.viewed', metadata: [
            'contract_version' => $snapshot['meta']['contract_version'],
            'providers' => $snapshot['data']['summary']['providers'],
            'providers_ready_for_human_activation' => $snapshot['data']['summary']['providers_ready_for_human_activation'],
            'paid_plans_ready_for_human_activation' => $snapshot['data']['summary']['paid_plans_ready_for_human_activation'],
            'checkout_sessions_enabled' => $snapshot['data']['summary']['checkout_sessions_enabled'],
            'live_webhooks_enabled' => $snapshot['data']['summary']['live_webhooks_enabled'],
            'provider_activation' => false,
        ]);

        return response()->json($snapshot);
    }
}
