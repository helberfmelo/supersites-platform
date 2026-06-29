<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\ExecutiveReport;
use App\Models\Role;
use App\Models\Site;
use App\Models\User;
use App\Models\UserAccountPrivacyRequest;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\AdSenseReadinessSeeder;
use Database\Seeders\AiGrowthReadinessSeeder;
use Database\Seeders\BenchmarkRefinementSeeder;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\DeploymentRecordSeeder;
use Database\Seeders\ExecutiveReportReadinessSeeder;
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
            ExecutiveReportReadinessSeeder::class,
            BenchmarkRefinementSeeder::class,
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
            ->assertSee('Ops 100')
            ->assertSee('monitors 3')
            ->assertSee('dry_run_only')
            ->assertSee('disabled')
            ->assertSee('Executive reports')
            ->assertSee('Weekly Executive Readiness')
            ->assertSee('not_inferred')
            ->assertSee('Benchmark refinement')
            ->assertSee('Benchmark surfaces')
            ->assertSee('Surface benchmark and monetization readiness in the Hub')
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

    public function test_operator_can_view_benchmark_refinement_dashboard(): void
    {
        $this->seed([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
            BenchmarkRefinementSeeder::class,
        ]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->get('/admin/benchmark-refinement')
            ->assertOk()
            ->assertSee('Benchmark refinement')
            ->assertSee('Public surfaces')
            ->assertSee('Average readiness')
            ->assertSee('Site readiness')
            ->assertSee('SuperSites Hub')
            ->assertSee('NetProbe Atlas')
            ->assertSee('Opportunity backlog')
            ->assertSee('Keep ads, donations, affiliates and checkout gated until approvals pass')
            ->assertSee('External providers active')
            ->assertSee('0');

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'admin.benchmark_refinement.index_viewed',
        ]);
    }

    public function test_operator_can_view_and_export_executive_reports(): void
    {
        $this->seed([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
            ExecutiveReportReadinessSeeder::class,
        ]);

        $user = $this->userWithRole('operator');
        $report = ExecutiveReport::query()->where('period_type', 'weekly')->firstOrFail();
        $measurementReport = ExecutiveReport::query()
            ->where('title', 'Weekly Real Measurement Readiness - 2026-W27')
            ->firstOrFail();

        $this->actingAs($user)
            ->get('/admin/reports')
            ->assertOk()
            ->assertSee('Executive reports')
            ->assertSee('Weekly Executive Readiness')
            ->assertSee('Weekly Real Measurement Readiness')
            ->assertSee('finalized')
            ->assertSee('estimated');

        $this->actingAs($user)
            ->get("/admin/reports/{$report->id}")
            ->assertOk()
            ->assertSee($report->title)
            ->assertSee('Download CSV')
            ->assertSee('Causality not_inferred')
            ->assertSee('Phase 6 sprint gates closed before reporting sprint');

        $this->actingAs($user)
            ->get("/admin/reports/{$measurementReport->id}")
            ->assertOk()
            ->assertSee('Weekly Real Measurement Readiness')
            ->assertSee('artifacts/google-readiness/2026-06-29T05-47-31Z/google-readiness.json')
            ->assertSee('provider-unavailable:adsense')
            ->assertSee('Causal claims generated');

        $this->actingAs($user)
            ->get("/admin/reports/{$report->id}/print")
            ->assertOk()
            ->assertSee('Data status summary')
            ->assertSee('not_inferred');

        $response = $this->actingAs($user)
            ->get("/admin/reports/{$report->id}/export.csv");

        $response->assertOk();
        $this->assertStringContainsString('text/csv', (string) $response->headers->get('content-type'));
        $this->assertStringContainsString('attachment;', (string) $response->headers->get('content-disposition'));
        $this->assertStringContainsString('data_status', (string) $response->getContent());
        $this->assertStringContainsString('evidence_sources', (string) $response->getContent());
        $this->assertStringContainsString('causality_status', (string) $response->getContent());
        $this->assertStringContainsString('finalized', (string) $response->getContent());
        $this->assertStringContainsString('estimated', (string) $response->getContent());

        $measurementCsv = $this->actingAs($user)
            ->get("/admin/reports/{$measurementReport->id}/export.csv");

        $measurementCsv->assertOk();
        $this->assertStringContainsString('artifacts/lighthouse-public/sprint-12-1-local/summary.md', (string) $measurementCsv->getContent());
        $this->assertStringContainsString('provider-unavailable:adsense', (string) $measurementCsv->getContent());
        $this->assertStringContainsString('not_inferred', (string) $measurementCsv->getContent());

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'admin.executive_reports.csv_exported',
        ]);
    }

    public function test_authenticated_user_can_manage_account_data_controls(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class]);

        $site = Site::query()->where('slug', 'docshift')->firstOrFail();
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', 'site-admin')->value('id'), ['site_id' => $site->id]);

        $this->actingAs($user)
            ->get('/admin/account')
            ->assertOk()
            ->assertSee('Account and data controls')
            ->assertSee('Download account export')
            ->assertSee('Request deletion review')
            ->assertSee('DocShift');

        $exportResponse = $this->actingAs($user)
            ->post('/admin/account/export');

        $exportResponse->assertOk();
        $this->assertStringContainsString('application/json', (string) $exportResponse->headers->get('content-type'));
        $this->assertStringContainsString('attachment;', (string) $exportResponse->headers->get('content-disposition'));
        $this->assertStringContainsString($user->email, (string) $exportResponse->getContent());
        $this->assertStringContainsString('docshift', (string) $exportResponse->getContent());
        $this->assertStringNotContainsString('password', (string) $exportResponse->getContent());

        $this->actingAs($user)
            ->post('/admin/account/delete-request')
            ->assertRedirect('/admin/account');

        $this->assertDatabaseHas('user_account_privacy_requests', [
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_EXPORT,
            'status' => UserAccountPrivacyRequest::STATUS_READY,
        ]);

        $this->assertDatabaseHas('user_account_privacy_requests', [
            'user_id' => $user->id,
            'request_type' => UserAccountPrivacyRequest::TYPE_DELETE,
            'status' => UserAccountPrivacyRequest::STATUS_HUMAN_REQUIRED,
        ]);

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'email' => $user->email,
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'admin.account.delete_requested',
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
