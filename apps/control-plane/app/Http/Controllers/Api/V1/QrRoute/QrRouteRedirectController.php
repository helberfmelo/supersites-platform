<?php

namespace App\Http\Controllers\Api\V1\QrRoute;

use App\Http\Controllers\Controller;
use App\Models\QrRouteLink;
use App\Support\QrRoute\QrRouteDestinationGuard;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;

class QrRouteRedirectController extends Controller
{
    public function __invoke(string $code, QrRouteDestinationGuard $guard): RedirectResponse|JsonResponse
    {
        if (! preg_match('/^[A-Za-z0-9_-]{4,32}$/', $code)) {
            abort(404);
        }

        $link = QrRouteLink::query()
            ->where('code', $code)
            ->firstOrFail();

        if ($link->status !== 'active' || ($link->expires_at && $link->expires_at->isPast())) {
            return response()->json([
                'message' => 'QRRoute link is unavailable.',
            ], 410);
        }

        try {
            $destination = $guard->normalizeDestination($link->destination_url);
        } catch (ValidationException) {
            return response()->json([
                'message' => 'QRRoute destination is blocked by abuse controls.',
            ], 410);
        }

        $link->forceFill([
            'last_accessed_at' => now(),
        ])->save();
        $link->increment('click_count');

        return redirect()->away($destination, 302, [
            'Referrer-Policy' => 'no-referrer',
            'X-Robots-Tag' => 'noindex, nofollow',
        ]);
    }
}
