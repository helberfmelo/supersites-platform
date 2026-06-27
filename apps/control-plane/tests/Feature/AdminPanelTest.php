<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\AdSenseReadinessSeeder;
use Database\Seeders\AiGrowthReadinessSeeder;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\DeploymentRecordSeeder;
use Database\Seeders\GoogleIntegrationSeeder;
use Database\Seeders\OperationalTaskSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AdminPanelTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_page_renders(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertSee('Sign in');
    }

    public function test_admin_dashboard_requires_authentication(): void
    {
        $this->get('/admin')
            ->assertRedirect('/login');
    }

    public function test_user_without_dashboard_permission_is_forbidden(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->get('/admin')
            ->assertForbidden();
    }

    public function test_operator_can_view_dashboard_snapshot(): void
    {
        $this->seed([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
            GoogleIntegrationSeeder::class,
            AdSenseReadinessSeeder::class,
            BillingReadinessSeeder::class,
            AiGrowthReadinessSeeder::class,
            DeploymentRecordSeeder::class,
            OperationalTaskSeeder::class,
        ]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->get('/admin')
            ->assertOk()
            ->assertSee('Portfolio status')
            ->assertSee('Latest deployments')
            ->assertSee('Operational tasks')
            ->assertSee('AdSense readiness')
            ->assertSee('not_submitted')
            ->assertSee('not_published')
            ->assertSee('Billing readiness')
            ->assertSee('stripe')
            ->assertSee('free-preview')
            ->assertSee('disabled')
            ->assertSee('AI growth engine')
            ->assertSee('Build evidence-first SEO and AIO backlog before content expansion')
            ->assertSee('not_inferred')
            ->assertSee('Google integrations')
            ->assertSee('human_required')
            ->assertSee('Quality Gate')
            ->assertSee('Open incidents');

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'admin.dashboard.viewed',
        ]);
    }

    public function test_operator_can_update_site_and_create_audit_log(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = $this->userWithRole('operator');
        $site = Site::query()->where('slug', 'netprobe-atlas')->firstOrFail();

        $this->actingAs($user)
            ->put("/admin/sites/{$site->id}", [
                'slug' => 'netprobe-atlas',
                'name' => 'NetProbe Atlas',
                'kind' => 'utility',
                'category' => 'network',
                'launch_order' => 1,
                'status' => 'active',
                'temporary_url' => 'https://opentshost.com/supersites/netprobe-atlas/',
                'locales' => 'en, pt-br, es, fr, de',
                'adsense_ready' => '1',
            ])
            ->assertRedirect('/admin/sites');

        $this->assertDatabaseHas('sites', [
            'slug' => 'netprobe-atlas',
            'status' => 'active',
            'adsense_ready' => true,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'site_id' => $site->id,
            'action' => 'admin.sites.updated',
        ]);
    }

    public function test_analyst_cannot_create_site(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = $this->userWithRole('analyst');

        $this->actingAs($user)
            ->post('/admin/sites', [
                'slug' => 'example-site',
                'name' => 'Example Site',
                'kind' => 'utility',
                'status' => 'planned',
                'locales' => 'en',
            ])
            ->assertForbidden();
    }

    public function test_owner_can_create_site(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $user = $this->userWithRole('owner');

        $this->actingAs($user)
            ->post('/admin/sites', [
                'slug' => 'example-site',
                'name' => 'Example Site',
                'kind' => 'utility',
                'category' => 'testing',
                'launch_order' => 99,
                'status' => 'planned',
                'temporary_url' => 'https://opentshost.com/supersites/example-site/',
                'locales' => 'en, pt-br',
            ])
            ->assertRedirect('/admin/sites');

        $this->assertDatabaseHas('sites', [
            'slug' => 'example-site',
            'name' => 'Example Site',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'admin.sites.created',
        ]);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $roleId = Role::query()->where('slug', $roleSlug)->value('id');

        $user->roles()->attach($roleId, ['site_id' => null]);

        return $user;
    }
}
