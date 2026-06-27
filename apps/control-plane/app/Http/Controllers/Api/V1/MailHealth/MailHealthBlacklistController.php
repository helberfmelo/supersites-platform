<?php

namespace App\Http\Controllers\Api\V1\MailHealth;

use App\Http\Controllers\Controller;
use App\Support\MailHealth\MailHealthBlacklistService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MailHealthBlacklistController extends Controller
{
    public function __invoke(Request $request, MailHealthBlacklistService $service): JsonResponse
    {
        $validated = $request->validate([
            'domain' => ['required', 'string', 'max:253'],
        ]);

        return response()->json($service->check((string) $validated['domain']));
    }
}
