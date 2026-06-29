<?php

namespace App\Http\Controllers\Api\V1\Billing;

use App\Http\Controllers\Controller;
use App\Support\Billing\BillingWebhookDryRunReceiver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BillingWebhookDryRunController extends Controller
{
    public function __invoke(Request $request, string $provider, BillingWebhookDryRunReceiver $receiver): JsonResponse
    {
        $receipt = $receiver->receive(
            $provider,
            $request->getContent(),
            $request->header('X-Supersites-Webhook-Timestamp'),
            $request->header('X-Supersites-Webhook-Signature'),
        );

        return response()->json($receipt['body'], $receipt['status']);
    }
}
