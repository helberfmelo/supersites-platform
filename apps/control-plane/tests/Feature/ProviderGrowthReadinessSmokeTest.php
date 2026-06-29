<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\AdSenseReadinessSeeder;
use Database\Seeders\AiGrowthReadinessSeeder;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\ExecutiveReportReadinessSeeder;
use Database\Seeders\GoogleIntegrationSeeder;
use Database\Seeders\GrowthProviderIngestionSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Database\Seeders\SupportMonetizationReadinessSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProviderGrowthReadinessSmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_operator_readiness_surface_remains_fail_closed_across_providers_and_growth_loop(): void
    {
        $this->seedReadinessSurface();

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/adsense/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.sites_serving_ads', 0)
            ->assertJsonPath('data.summary.automatic_submission_enabled', false)
            ->assertJsonPath('data.ads_txt.public_file_published', false);

        $this->actingAs($user)
            ->getJson('/api/v1/google/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.sites_loading_ga4', 0)
            ->assertJsonPath('data.summary.sites_loading_gtm', 0)
            ->assertJsonPath('data.summary.sites_importing_search_console', 0)
            ->assertJsonPath('data.summary.automatic_tag_injection_enabled', false)
            ->assertJsonPath('data.summary.automatic_data_import_enabled', false);

        $this->actingAs($user)
            ->getJson('/api/v1/billing/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.checkout_sessions_enabled', 0)
            ->assertJsonPath('data.summary.live_webhooks_enabled', 0)
            ->assertJsonPath('data.summary.provider_sdk_loaded', 0)
            ->assertJsonPath('data.summary.revenue_import_enabled', 0)
            ->assertJsonPath('data.summary.automatic_checkout_enabled', false)
            ->assertJsonPath('data.summary.automatic_webhook_processing_enabled', false);

        $this->actingAs($user)
            ->getJson('/api/v1/monetization/support/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.public_links_enabled', 0)
            ->assertJsonPath('data.summary.real_donation_payments_enabled', 0)
            ->assertJsonPath('data.summary.real_affiliate_links_enabled', 0)
            ->assertJsonPath('data.summary.widgets_loaded', 0)
            ->assertJsonPath('data.summary.webhooks_enabled', 0)
            ->assertJsonPath('data.summary.automatic_publication_enabled', false);

        $this->actingAs($user)
            ->getJson('/api/v1/growth/ingestion-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.sources_importing', 0)
            ->assertJsonPath('data.summary.provider_requests_enabled', 0)
            ->assertJsonPath('data.summary.workers_enabled', 0)
            ->assertJsonPath('data.summary.automatic_retry_enabled', false)
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 0);

        $this->actingAs($user)
            ->getJson('/api/v1/growth/priorities')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.causality_status', 'not_inferred')
            ->assertJsonPath('data.summary.automatic_prioritization_enabled', false)
            ->assertJsonPath('data.summary.automatic_pr_creation_enabled', false)
            ->assertJsonPath('data.summary.should_auto_apply', false)
            ->assertJsonPath('data.summary.should_create_pr', false)
            ->assertJsonPath('data.provider_data.provider_requests_enabled', 0)
            ->assertJsonPath('data.provider_data.workers_enabled', 0);

        $this->actingAs($user)
            ->getJson('/api/v1/growth/automation-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.automatic_branch_creation_enabled', false)
            ->assertJsonPath('data.summary.automatic_pr_creation_enabled', false)
            ->assertJsonPath('data.summary.auto_merge_enabled', false)
            ->assertJsonPath('data.summary.direct_publish_enabled', false)
            ->assertJsonPath('data.summary.branches_created', 0)
            ->assertJsonPath('data.summary.pull_requests_opened', 0)
            ->assertJsonPath('data.summary.auto_merges_executed', 0)
            ->assertJsonPath('data.summary.publications_executed', 0)
            ->assertJsonPath('data.summary.external_ai_used', 0)
            ->assertJsonPath('data.summary.should_create_branch', false)
            ->assertJsonPath('data.summary.should_open_pull_request', false)
            ->assertJsonPath('data.summary.should_auto_merge', false)
            ->assertJsonPath('data.summary.should_publish', false);

        $this->actingAs($user)
            ->getJson('/api/v1/growth/reporting-readiness')
            ->assertOk()
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.recurring_delivery_enabled', false)
            ->assertJsonPath('data.summary.external_recipients_enabled', false)
            ->assertJsonPath('data.summary.scheduled_reports', 0)
            ->assertJsonPath('data.summary.emails_sent', 0)
            ->assertJsonPath('data.summary.revenue_reporting_enabled', false)
            ->assertJsonPath('data.summary.causality_status', 'not_inferred')
            ->assertJsonPath('data.summary.should_schedule_report', false)
            ->assertJsonPath('data.summary.should_send_email', false)
            ->assertJsonPath('data.summary.should_import_provider_data', false)
            ->assertJsonPath('data.summary.should_infer_causality', false);

        $this->assertSame(8, AuditLog::query()->where('user_id', $user->id)->count());
    }

    private function seedReadinessSurface(): void
    {
        $this->seed([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
            GoogleIntegrationSeeder::class,
            AdSenseReadinessSeeder::class,
            BillingReadinessSeeder::class,
            SupportMonetizationReadinessSeeder::class,
            GrowthProviderIngestionSeeder::class,
            AiGrowthReadinessSeeder::class,
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
