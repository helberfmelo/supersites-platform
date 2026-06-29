<?php

namespace App\Support\Accounts;

use App\Models\Site;
use App\Models\User;
use App\Models\UserAccountPrivacyRequest;
use Illuminate\Support\Collection;

class AccountDataExporter
{
    public const CONTRACT_VERSION = '2026-06-29.1';

    /**
     * @return array<string, mixed>
     */
    public function export(User $user): array
    {
        return [
            'contract_version' => self::CONTRACT_VERSION,
            'exported_at' => now()->toISOString(),
            'account' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at?->toISOString(),
                'created_at' => $user->created_at?->toISOString(),
                'updated_at' => $user->updated_at?->toISOString(),
            ],
            'roles' => $this->roleAssignments($user),
            'permissions' => $user->permissionSlugs(),
            'privacy_requests' => $user->accountPrivacyRequests()
                ->latest('requested_at')
                ->limit(10)
                ->get(['id', 'request_type', 'status', 'requested_at', 'completed_at'])
                ->map(fn (UserAccountPrivacyRequest $request): array => [
                    'id' => $request->id,
                    'request_type' => $request->request_type,
                    'status' => $request->status,
                    'requested_at' => $request->requested_at?->toISOString(),
                    'completed_at' => $request->completed_at?->toISOString(),
                ])
                ->values()
                ->all(),
            'limits' => [
                'public_signup_enabled' => false,
                'automatic_account_deletion_enabled' => false,
                'checkout_enabled' => false,
            ],
        ];
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function roleAssignments(User $user): array
    {
        $roles = $user->roles()
            ->orderBy('slug')
            ->orderBy('role_user.site_id')
            ->get(['roles.id', 'roles.slug', 'roles.name']);

        $sites = $this->sitesForRoles($roles);

        return $roles
            ->map(function ($role) use ($sites): array {
                $siteId = $role->pivot->site_id;
                $site = $siteId ? $sites->get($siteId) : null;

                return [
                    'slug' => $role->slug,
                    'name' => $role->name,
                    'scope' => $site ? 'site' : 'global',
                    'site_id' => $siteId,
                    'site_slug' => $site?->slug,
                    'site_name' => $site?->name,
                ];
            })
            ->values()
            ->all();
    }

    /**
     * @param Collection<int, mixed> $roles
     * @return Collection<int, Site>
     */
    private function sitesForRoles(Collection $roles): Collection
    {
        $siteIds = $roles
            ->map(fn ($role) => $role->pivot->site_id)
            ->filter()
            ->unique()
            ->values()
            ->all();

        if ($siteIds === []) {
            return collect();
        }

        return Site::query()
            ->whereIn('id', $siteIds)
            ->get(['id', 'slug', 'name'])
            ->keyBy('id');
    }
}
