<?php

namespace Tests\Feature;

use App\Models\AiGrowthRecommendation;
use App\Models\AuditLog;
use App\Models\GrowthProviderIngestion;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\AiGrowthReadinessSeeder;
use Database\Seeders\GrowthProviderIngestionSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GrowthAutomationReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_growth_automation_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/growth/automation-readiness')
            ->assertUnauthorized();
    }

    public function test_growth_automation_readiness_requires_dashboard_permission(): void
    {
        $this->seedGrowthAutomationReadiness();

        $this->actingAs(User::factory()->create())
            ->getJson('/api/v1/growth/automation-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_growth_automation_readiness(): void
    {
        $this->seedGrowthAutomationReadiness();

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/growth/automation-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'growth_automation_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.recommendations', 5)
            ->assertJsonPath('data.summary.pr_review_candidates', 2)
            ->assertJsonPath('data.summary.human_gate_required', 2)
            ->assertJsonPath('data.summary.blocked', 1)
            ->assertJsonPath('data.summary.provider_data_available_candidates', 0)
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 0)
            ->assertJsonPath('data.summary.data_status', 'unavailable')
            ->assertJsonPath('data.summary.automation_mode', 'pr_review_only_fail_closed')
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
            ->assertJsonPath('data.summary.should_publish', false)
            ->assertJsonPath('data.provider_data.sources', 48)
            ->assertJsonPath('data.provider_data.provider_requests_enabled', 0)
            ->assertJsonPath('data.provider_data.workers_enabled', 0)
            ->assertJsonPath('data.automation_queue.0.rank', 1)
            ->assertJsonPath('data.automation_queue.0.status', 'pr_review_only')
            ->assertJsonPath('data.automation_queue.0.risk_level', 'low')
            ->assertJsonPath('data.automation_queue.0.provider_data_available', false)
            ->assertJsonPath('data.automation_queue.0.pr_review_ready', true)
            ->assertJsonPath('data.automation_queue.0.branch_creation_allowed', false)
            ->assertJsonPath('data.automation_queue.0.pull_request_creation_allowed', false)
            ->assertJsonPath('data.automation_queue.0.auto_merge_allowed', false)
            ->assertJsonPath('data.automation_queue.0.direct_publish_allowed', false)
            ->assertJsonPath('data.automation_queue.0.should_create_branch', false)
            ->assertJsonPath('data.automation_queue.0.should_open_pull_request', false)
            ->assertJsonPath('data.automation_queue.0.should_auto_merge', false)
            ->assertJsonPath('data.automation_queue.0.should_publish', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.growth.automation_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.growth.automation_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(2, $audit->metadata['pr_review_candidates']);
        $this->assertSame(0, $audit->metadata['branches_created']);
        $this->assertSame(0, $audit->metadata['pull_requests_opened']);
        $this->assertFalse($audit->metadata['auto_merge_enabled']);
        $this->assertFalse($audit->metadata['direct_publish_enabled']);
    }

    public function test_provider_data_and_seed_automation_flag_do_not_open_prs_or_publish(): void
    {
        $this->seedGrowthAutomationReadiness();

        AiGrowthRecommendation::query()
            ->where('title', 'Keep deploy dry-run reliability ahead of launch volume')
            ->firstOrFail()
            ->update(['automation_enabled' => true]);

        GrowthProviderIngestion::query()
            ->where('source', 'ga4')
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

        $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/growth/automation-readiness')
            ->assertOk()
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 1)
            ->assertJsonPath('data.summary.provider_data_available_candidates', 1)
            ->assertJsonPath('data.summary.automatic_branch_creation_enabled', false)
            ->assertJsonPath('data.summary.automatic_pr_creation_enabled', false)
            ->assertJsonPath('data.summary.auto_merge_enabled', false)
            ->assertJsonPath('data.summary.direct_publish_enabled', false)
            ->assertJsonPath('data.summary.branches_created', 0)
            ->assertJsonPath('data.summary.pull_requests_opened', 0)
            ->assertJsonPath('data.summary.should_create_branch', false)
            ->assertJsonPath('data.summary.should_open_pull_request', false)
            ->assertJsonPath('data.summary.should_auto_merge', false)
            ->assertJsonPath('data.summary.should_publish', false)
            ->assertJsonPath('data.automation_queue.0.status', 'pr_review_only')
            ->assertJsonPath('data.automation_queue.0.provider_data_available', true)
            ->assertJsonPath('data.automation_queue.0.automation_enabled_in_seed', true)
            ->assertJsonPath('data.automation_queue.0.should_open_pull_request', false)
            ->assertJsonPath('data.automation_queue.0.should_publish', false);
    }

    private function seedGrowthAutomationReadiness(): void
    {
        $this->seed([
            PortfolioSiteSeeder::class,
            AccessControlSeeder::class,
            AiGrowthReadinessSeeder::class,
            GrowthProviderIngestionSeeder::class,
        ]);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
