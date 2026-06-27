<?php

namespace App\Http\Controllers\Api\V1\MailHealth;

use App\Http\Controllers\Controller;
use App\Support\MailHealth\MailHealthDnsService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MailHealthDnsController extends Controller
{
    public function __invoke(Request $request, MailHealthDnsService $service): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
            'check' => ['required', 'string', Rule::in(MailHealthDnsService::ALLOWED_CHECKS)],
            'selector' => ['nullable', 'string', 'max:63', 'required_if:check,dkim'],
        ]);

        return response()->json($service->check(
            (string) $validated['domain'],
            (string) $validated['check'],
            isset($validated['selector']) ? (string) $validated['selector'] : null,
        ));
    }
}
