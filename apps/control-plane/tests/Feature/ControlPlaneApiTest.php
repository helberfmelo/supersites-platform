<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Role;
use App\Models\User;
use App\Models\UserAccountPrivacyRequest;
use App\Models\Site;
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
            ->assertJsonPath('data.roles.0.scope', 'global')
            ->assertJsonPath('data.permissions.0', 'audit.view')
            ->assertJsonPath('data.permissions.1', 'dashboard.view')
            ->assertJsonPath('data.permissions.6', 'users.manage');
    }

    public function test_account_export_returns_sanitized_user_data_and_site_scoped_roles(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $site = Site::query()->where('slug', 'pixelbatch')->firstOrFail();
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', 'site-admin')->value('id'), ['site_id' => $site->id]);

        $response = $this->actingAs($user)
            ->postJson('/api/v1/account/export')
            ->assertOk()
            ->assertJsonPath('data.contract_version', '2026-06-29.1')
            ->assertJsonPath('data.account.email', $user->email)
            ->assertJsonPath('data.roles.0.slug', 'site-admin')
            ->assertJsonPath('data.roles.0.scope', 'site')
            ->assertJsonPath('data.roles.0.site_slug', 'pixelbatch')
            ->assertJsonPath('data.limits.public_signup_enabled', false)
            ->assertJsonPath('data.limits.automatic_account_deletion_enabled', false)
            ->assertJsonPath('meta.status', UserAccountPrivacyRequest::STATUS_READY);

        $this->assertArrayNotHasKey('password', $response->json('data.account'));
        $this->assertArrayNotHasKey('remember_token', $response->json('data.account'));

        $this->assertDatabaseHas('user_account_privacy_requests', [
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_EXPORT,
            'status' => UserAccountPrivacyRequest::STATUS_READY,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.account.exported',
        ]);
    }

    public function test_account_deletion_request_is_human_required_and_does_not_delete_user(): void
    {
        $this->seed([AccessControlSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/v1/account/delete-request')
            ->assertUnprocessable();

        $this->actingAs($user)
            ->postJson('/api/v1/account/delete-request', ['acknowledge' => true])
            ->assertAccepted()
            ->assertJsonPath('data.request_type', UserAccountPrivacyRequest::TYPE_DELETE)
            ->assertJsonPath('data.status', UserAccountPrivacyRequest::STATUS_HUMAN_REQUIRED)
            ->assertJsonPath('data.automatic_deletion', false);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => $user->email,
        ]);

        $this->assertDatabaseHas('user_account_privacy_requests', [
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_DELETE,
            'status' => UserAccountPrivacyRequest::STATUS_HUMAN_REQUIRED,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.account.delete_requested',
        ]);
    }
}
