<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\GrowthProviderIngestion;
use App\Models\Role;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\GrowthProviderIngestionSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GrowthIngestionReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_growth_ingestion_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/growth/ingestion-readiness')
            ->assertUnauthorized();
    }

    public function test_growth_ingestion_readiness_requires_dashboard_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, GrowthProviderIngestionSeeder::class]);

        $this->actingAs(User::factory()->create())
            ->getJson('/api/v1/growth/ingestion-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_growth_ingestion_readiness(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, GrowthProviderIngestionSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/growth/ingestion-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'growth_provider_ingestion_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.sources', 48)
            ->assertJsonPath('data.summary.sources_ready_for_human_activation', 0)
            ->assertJsonPath('data.summary.sources_importing', 0)
            ->assertJsonPath('data.summary.provider_requests_enabled', 0)
            ->assertJsonPath('data.summary.workers_enabled', 0)
            ->assertJsonPath('data.summary.automatic_retry_enabled', false)
            ->assertJsonPath('data.summary.real_provider_data_snapshots', 0)
            ->assertJsonPath('data.sources.0.site_slug', 'supersite')
            ->assertJsonPath('data.sources.0.source', 'ga4')
            ->assertJsonPath('data.sources.0.data_status', 'unavailable')
            ->assertJsonPath('data.sources.0.should_import', false)
            ->assertJsonPath('data.sources.0.provider_request_enabled', false)
            ->assertJsonPath('data.sources.0.worker_enabled', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.growth.ingestion_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.growth.ingestion_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(0, $audit->metadata['sources_importing']);
    }

    public function test_ready_record_still_does_not_import_automatically(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, GrowthProviderIngestionSeeder::class]);

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
                'import_enabled' => true,
            ]);

        $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/growth/ingestion-readiness')
            ->assertOk()
            ->assertJsonPath('data.summary.sources_ready_for_human_activation', 1)
            ->assertJsonPath('data.summary.sources_importing', 0)
            ->assertJsonPath('data.summary.provider_requests_enabled', 0)
            ->assertJsonPath('data.sources.0.ready_for_human_activation', true)
            ->assertJsonPath('data.sources.0.should_import', false)
            ->assertJsonPath('data.sources.0.provider_request_enabled', false)
            ->assertJsonPath('data.sources.0.worker_enabled', false);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
