<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CurrentUserController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $user = $request->user();

        return response()->json([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->roles()
                    ->orderBy('slug')
                    ->get(['roles.id', 'roles.slug', 'roles.name'])
                    ->map(fn ($role): array => [
                        'slug' => $role->slug,
                        'name' => $role->name,
                        'site_id' => $role->pivot->site_id,
                    ])
                    ->values(),
                'permissions' => $user->permissionSlugs(),
            ],
        ]);
    }
}
