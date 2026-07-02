<?php

namespace App\Http\Controllers\Api\V1\Billing;

use App\Http\Controllers\Controller;
use App\Support\Billing\StripeCheckoutSessionCreator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class StripeCheckoutSessionController extends Controller
{
    public function __invoke(Request $request, StripeCheckoutSessionCreator $checkout): JsonResponse
    {
        $validated = $request->validate([
            'kind' => ['required', Rule::in(['donation', 'plan', 'service'])],
            'site_slug' => ['required', 'string', 'max:80', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'locale' => ['nullable', 'string', Rule::in(['en', 'pt-br', 'es', 'fr', 'de'])],
            'return_path' => ['nullable', 'string', 'max:300'],
            'amount_minor' => ['nullable', 'integer', 'min:100', 'max:500000'],
            'currency' => ['nullable', 'string', 'size:3'],
            'plan_slug' => ['nullable', 'string', 'max:80', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'service_slug' => ['nullable', 'string', 'max:80', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
        ]);

        $result = $checkout->create($validated, $request->user());

        return response()->json($result['body'], $result['status']);
    }
}
