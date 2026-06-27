<?php

namespace App\Http\Controllers\Api\V1\MailHealth;

use App\Http\Controllers\Controller;
use App\Support\MailHealth\MailHealthSmtpService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MailHealthSmtpController extends Controller
{
    public function __invoke(Request $request, MailHealthSmtpService $service): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
            'port' => ['required', 'integer', Rule::in(MailHealthSmtpService::ALLOWED_PORTS)],
        ]);

        return response()->json($service->check((string) $validated['domain'], (int) $validated['port']));
    }
}
