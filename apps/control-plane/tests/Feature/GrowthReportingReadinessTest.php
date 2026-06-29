<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\ExecutiveReport;
use App\Models\GrowthProviderIngestion;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\ExecutiveReportReadinessSeeder;
use Database\Seeders\GrowthProviderIngestionSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GrowthReportingReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_growth_reporting_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/growth/reporting-readiness')
            ->assertUnauthorized();
    }

    public function test_growth_reporting_readiness_requires_dashboard_permission(): void
    {
        $this->seedGrowthReportingReadiness();

        $this->actingAs(User::factory()->create())
            ->getJson('/api/v1/growth/reporting-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_growth_reporting_readiness(): void
    {
        $this->seedGrowthReportingReadiness();

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/growth/reporting-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'growth_reporting_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.reports', 3)
            ->assertJsonPath('data.summary.report_items', 18)
            ->assertJsonPath('data.summary.reports_ready_for_operator_review', 3)
            ->assertJsonPath('data.summary.blocked_reports', 0)
            ->assertJsonPath('data.summary.export_ready_reports', 3)
            ->assertJsonPath('data.summary.before_after_reports', 3)
            ->assertJsonPath('data.summary.before_after_items', 14)
            ->assertJsonPath('data.summary.finalized_items', 12)
            ->assertJsonPath('data.summary.estimated_items', 2)
            ->assertJsonPath('data.summary.delayed_items', 1)
            ->assertJsonPath('data.summary.unavailable_items', 3)
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 0)
            ->assertJsonPath('data.summary.provider_imports_enabled', 0)
            ->assertJsonPath('data.summary.recurring_delivery_enabled', false)
            ->assertJsonPath('data.summary.external_recipients_enabled', false)
            ->assertJsonPath('data.summary.scheduled_reports', 0)
            ->assertJsonPath('data.summary.emails_sent', 0)
            ->assertJsonPath('data.summary.revenue_reporting_enabled', false)
            ->assertJsonPath('data.summary.causality_status', 'not_inferred')
            ->assertJsonPath('data.summary.reporting_mode', 'review_only_fail_closed')
            ->assertJsonPath('data.summary.should_schedule_report', false)
            ->assertJsonPath('data.summary.should_send_email', false)
            ->assertJsonPath('data.summary.should_import_provider_data', false)
            ->assertJsonPath('data.summary.should_infer_causality', false)
            ->assertJsonPath('data.provider_data.sources', 48)
            ->assertJsonPath('data.provider_data.provider_requests_enabled', 0)
            ->assertJsonPath('data.provider_data.workers_enabled', 0)
            ->assertJsonPath('data.reports.0.status', 'review_ready')
            ->assertJsonPath('data.reports.0.report_review_ready', true)
            ->assertJsonPath('data.reports.0.before_after_review_ready', true)
            ->assertJsonPath('data.reports.0.recurring_delivery_allowed', false)
            ->assertJsonPath('data.reports.0.email_delivery_allowed', false)
            ->assertJsonPath('data.reports.0.provider_import_allowed', false)
            ->assertJsonPath('data.reports.0.revenue_reporting_allowed', false)
            ->assertJsonPath('data.reports.0.should_send_email', false)
            ->assertJsonPath('data.reports.0.should_infer_causality', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.growth.reporting_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.growth.reporting_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(3, $audit->metadata['reports']);
        $this->assertSame(3, $audit->metadata['reports_ready_for_operator_review']);
        $this->assertSame(0, $audit->metadata['emails_sent']);
        $this->assertSame(0, $audit->metadata['provider_imports_enabled']);
        $this->assertSame('not_inferred', $audit->metadata['causality_status']);
    }

    public function test_provider_data_and_causality_review_do_not_schedule_or_send_reports(): void
    {
        $this->seedGrowthReportingReadiness();

        ExecutiveReport::query()
            ->where('title', 'Weekly Real Measurement Readiness - 2026-W27')
            ->firstOrFail()
            ->update(['causality_status' => 'requires_review']);

        GrowthProviderIngestion::query()
            ->where('source', 'search_console')
            ->whereHas('site', fn ($query) => $query->where('slug', 'supersite'))
            ->firstOrFail()
            ->update([
                'access_status' => 'approved',
                'token_status' => 'configured',
                'quota_status' => 'approved',
                'data_contract_status' => 'approved',
                'retention_status' => 'approved',
                'import_status' => 'ready',
                'data_status' => 'finalized',
                'import_enabled' => true,
                'latest_snapshot_at' => now(),
            ]);

        $response = $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/growth/reporting-readiness')
            ->assertOk()
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 1)
            ->assertJsonPath('data.summary.provider_imports_enabled', 1)
            ->assertJsonPath('data.summary.reports_ready_for_operator_review', 2)
            ->assertJsonPath('data.summary.blocked_reports', 1)
            ->assertJsonPath('data.summary.scheduled_reports', 0)
            ->assertJsonPath('data.summary.emails_sent', 0)
            ->assertJsonPath('data.summary.should_schedule_report', false)
            ->assertJsonPath('data.summary.should_send_email', false)
            ->assertJsonPath('data.summary.should_import_provider_data', false)
            ->assertJsonPath('data.summary.should_infer_causality', false)
            ->assertJsonPath('data.provider_data.finalized_sources', 1)
            ->assertJsonPath('data.provider_data.import_enabled_sources', 1)
            ->assertJsonPath('data.reports.0.status', 'blocked')
            ->assertJsonPath('data.reports.0.should_send_email', false)
            ->assertJsonPath('data.reports.0.should_infer_causality', false);

        $this->assertContains('causality_review_required', $response->json('data.reports.0.blockers'));
    }

    private function seedGrowthReportingReadiness(): void
    {
        $this->seed([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
            GrowthProviderIngestionSeeder::class,
            ExecutiveReportReadinessSeeder::class,
        ]);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
