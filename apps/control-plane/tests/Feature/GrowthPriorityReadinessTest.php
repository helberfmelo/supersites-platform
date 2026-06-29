<?php

namespace Tests\Feature;

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

class GrowthPriorityReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_growth_priorities_require_authentication(): void
    {
        $this->getJson('/api/v1/growth/priorities')
            ->assertUnauthorized();
    }

    public function test_growth_priorities_require_dashboard_permission(): void
    {
        $this->seedGrowthPriorityReadiness();

        $this->actingAs(User::factory()->create())
            ->getJson('/api/v1/growth/priorities')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_growth_priorities(): void
    {
        $this->seedGrowthPriorityReadiness();

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/growth/priorities')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'growth_priority_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.recommendations', 5)
            ->assertJsonPath('data.summary.priorities_ready_for_operator_review', 5)
            ->assertJsonPath('data.summary.human_gate_required', 2)
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 0)
            ->assertJsonPath('data.summary.provider_data_status', 'unavailable')
            ->assertJsonPath('data.summary.priority_model', 'impact_confidence_minus_effort_risk')
            ->assertJsonPath('data.summary.causality_status', 'not_inferred')
            ->assertJsonPath('data.summary.automatic_prioritization_enabled', false)
            ->assertJsonPath('data.summary.automatic_pr_creation_enabled', false)
            ->assertJsonPath('data.summary.should_auto_apply', false)
            ->assertJsonPath('data.summary.should_create_pr', false)
            ->assertJsonPath('data.provider_data.sources', 48)
            ->assertJsonPath('data.provider_data.provider_requests_enabled', 0)
            ->assertJsonPath('data.provider_data.workers_enabled', 0)
            ->assertJsonPath('data.priorities.0.rank', 1)
            ->assertJsonPath('data.priorities.0.status', 'local_evidence_only')
            ->assertJsonPath('data.priorities.0.provider_data_available', false)
            ->assertJsonPath('data.priorities.0.causality_status', 'not_inferred')
            ->assertJsonPath('data.priorities.0.automation_allowed', false)
            ->assertJsonPath('data.priorities.0.should_auto_apply', false)
            ->assertJsonPath('data.priorities.0.should_create_pr', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.growth.priorities.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.growth.priorities.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(0, $audit->metadata['real_provider_data_snapshots']);
        $this->assertFalse($audit->metadata['automatic_prioritization_enabled']);
        $this->assertSame('not_inferred', $audit->metadata['causality_status']);
    }

    public function test_finalized_provider_data_does_not_enable_automation_or_causality(): void
    {
        $this->seedGrowthPriorityReadiness();

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
            ->getJson('/api/v1/growth/priorities')
            ->assertOk()
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 1)
            ->assertJsonPath('data.summary.provider_data_status', 'finalized')
            ->assertJsonPath('data.summary.automatic_prioritization_enabled', false)
            ->assertJsonPath('data.summary.automatic_pr_creation_enabled', false)
            ->assertJsonPath('data.summary.causality_status', 'not_inferred')
            ->assertJsonPath('data.priorities.0.status', 'real_data_ready')
            ->assertJsonPath('data.priorities.0.provider_data_available', true)
            ->assertJsonPath('data.priorities.0.data_status', 'finalized')
            ->assertJsonPath('data.priorities.0.automation_allowed', false)
            ->assertJsonPath('data.priorities.0.should_auto_apply', false)
            ->assertJsonPath('data.priorities.0.should_create_pr', false)
            ->assertJsonPath('data.priorities.0.causality_status', 'not_inferred');
    }

    private function seedGrowthPriorityReadiness(): void
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
