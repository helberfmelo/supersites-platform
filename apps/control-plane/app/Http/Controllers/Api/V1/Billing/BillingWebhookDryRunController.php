<?php

namespace App\Http\Controllers\Api\V1\Billing;

use App\Http\Controllers\Controller;
use App\Support\Billing\BillingWebhookDryRunReceiver;
use App\Support\Billing\StripeWebhookReceiver;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BillingWebhookDryRunController extends Controller
{
    public function __invoke(
        Request $request,
        string $provider,
        BillingWebhookDryRunReceiver $receiver,
        StripeWebhookReceiver $stripeReceiver,
    ): JsonResponse {
        if (
            strtolower(str_replace('-', '_', $provider)) === 'stripe'
            && (bool) config('billing.providers.stripe.webhooks_enabled', false)
        ) {
            $receipt = $stripeReceiver->receive(
                $request->getContent(),
                $request->header('Stripe-Signature'),
            );

            return response()->json($receipt['body'], $receipt['status']);
        }

        $receipt = $receiver->receive(
            $provider,
            $request->getContent(),
            $request->header('X-Supersites-Webhook-Timestamp'),
            $request->header('X-Supersites-Webhook-Signature'),
        );

        return response()->json($receipt['body'], $receipt['status']);
    }
}
