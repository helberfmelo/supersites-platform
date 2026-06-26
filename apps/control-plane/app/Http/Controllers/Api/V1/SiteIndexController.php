<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Site;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SiteIndexController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        abort_unless($request->user()?->hasPermission('sites.view'), 403);

        $sites = Site::query()
            ->orderByRaw('launch_order is null')
            ->orderBy('launch_order')
            ->orderBy('slug')
            ->get();

        AuditLog::record($request->user(), 'api.sites.index', metadata: [
            'count' => $sites->count(),
        ]);

        return response()->json([
            'data' => $sites->map(fn (Site $site): array => [
                'slug' => $site->slug,
                'name' => $site->name,
                'kind' => $site->kind,
                'category' => $site->category,
                'launch_order' => $site->launch_order,
                'status' => $site->status,
                'temporary_url' => $site->temporary_url,
                'locales' => $site->locales,
                'adsense_ready' => $site->adsense_ready,
            ])->values(),
            'meta' => [
                'count' => $sites->count(),
            ],
        ]);
    }
}
