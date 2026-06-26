<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ControlPlaneApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_sites_api_requires_authentication(): void
    {
        $this->getJson('/api/v1/sites')->assertUnauthorized();
    }

    public function test_user_without_sites_permission_is_forbidden(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/sites')
            ->assertForbidden();
    }

    public function test_authorized_user_can_list_portfolio_sites_and_create_audit_log(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', 'analyst')->value('id'), ['site_id' => null]);

        $this->actingAs($user)
            ->getJson('/api/v1/sites')
            ->assertOk()
            ->assertJsonPath('meta.count', 12)
            ->assertJsonPath('data.0.slug', 'supersite')
            ->assertJsonPath('data.1.slug', 'netprobe-atlas')
            ->assertJsonPath('data.1.adsense_ready', false)
            ->assertJsonPath('data.11.slug', 'control-plane');

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.sites.index',
        ]);

        $this->assertSame(12, AuditLog::query()->firstOrFail()->metadata['count']);
    }

    public function test_current_user_endpoint_returns_roles_and_permissions(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', 'owner')->value('id'), ['site_id' => null]);

        $this->actingAs($user)
            ->getJson('/api/v1/me')
            ->assertOk()
            ->assertJsonPath('data.email', $user->email)
            ->assertJsonPath('data.roles.0.slug', 'owner')
            ->assertJsonPath('data.permissions.0', 'audit.view')
            ->assertJsonPath('data.permissions.1', 'dashboard.view')
            ->assertJsonPath('data.permissions.6', 'users.manage');
    }
}
