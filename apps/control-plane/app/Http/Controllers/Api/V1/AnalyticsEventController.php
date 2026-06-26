<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AnalyticsEvent;
use App\Models\Site;
use App\Support\Analytics\AnalyticsEventSanitizer;
use Carbon\CarbonImmutable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AnalyticsEventController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', Rule::in(AnalyticsEventSanitizer::eventNames())],
            'site_slug' => ['required', 'string', 'max:80'],
            'source' => ['nullable', 'string', Rule::in(['client', 'server', 'import'])],
            'locale' => ['nullable', 'string', 'max:12'],
            'route_path' => ['nullable', 'string', 'max:255'],
            'surface' => ['nullable', 'string', 'max:80'],
            'anonymous_id' => ['nullable', 'string', 'max:160'],
            'session_id' => ['nullable', 'string', 'max:160'],
            'occurred_at' => ['nullable', 'date'],
            'properties' => ['nullable', 'array'],
        ]);

        $siteSlug = AnalyticsEventSanitizer::normalizeSlug($validated['site_slug']);
        $site = Site::query()->where('slug', $siteSlug)->first();

        if (! $site) {
            return response()->json([
                'message' => 'The selected site slug is invalid.',
                'errors' => [
                    'site_slug' => ['The selected site slug is invalid.'],
                ],
            ], 422);
        }

        $event = AnalyticsEvent::query()->create([
            'site_id' => $site->id,
            'contract_version' => AnalyticsEventSanitizer::CONTRACT_VERSION,
            'event_name' => $validated['name'],
            'source' => $validated['source'] ?? 'client',
            'locale' => isset($validated['locale']) ? strtolower($validated['locale']) : null,
            'route_path' => AnalyticsEventSanitizer::sanitizePath($validated['route_path'] ?? null),
            'surface' => $validated['surface'] ?? null,
            'anonymous_id_hash' => AnalyticsEventSanitizer::hashIdentifier($validated['anonymous_id'] ?? null),
            'session_id_hash' => AnalyticsEventSanitizer::hashIdentifier($validated['session_id'] ?? null),
            'properties' => AnalyticsEventSanitizer::sanitizeProperties($validated['properties'] ?? null),
            'occurred_at' => isset($validated['occurred_at'])
                ? CarbonImmutable::parse($validated['occurred_at'])
                : now(),
        ]);

        return response()->json([
            'data' => [
                'id' => $event->id,
                'name' => $event->event_name,
                'site_slug' => $site->slug,
                'accepted' => true,
            ],
        ], 202);
    }
}
