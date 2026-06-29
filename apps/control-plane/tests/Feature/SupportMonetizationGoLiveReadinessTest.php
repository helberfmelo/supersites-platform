<?php

namespace Tests\Feature;

use App\Models\AuditLog;
use App\Models\Role;
use App\Models\SupportMonetizationChannel;
use App\Models\User;
use Database\Seeders\AccessControlSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Database\Seeders\SupportMonetizationReadinessSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SupportMonetizationGoLiveReadinessTest extends TestCase
{
    use RefreshDatabase;

    public function test_support_monetization_go_live_readiness_requires_authentication(): void
    {
        $this->getJson('/api/v1/monetization/support/go-live-readiness')
            ->assertUnauthorized();
    }

    public function test_support_monetization_go_live_readiness_requires_dashboard_permission(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, SupportMonetizationReadinessSeeder::class]);

        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/v1/monetization/support/go-live-readiness')
            ->assertForbidden();
    }

    public function test_operator_can_view_fail_closed_support_monetization_readiness(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, SupportMonetizationReadinessSeeder::class]);

        $user = $this->userWithRole('operator');

        $this->actingAs($user)
            ->getJson('/api/v1/monetization/support/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('meta.mode', 'support_monetization_go_live_readiness')
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.provider_activation', false)
            ->assertJsonPath('data.summary.channels', 22)
            ->assertJsonPath('data.summary.donation_channels', 11)
            ->assertJsonPath('data.summary.affiliate_channels', 11)
            ->assertJsonPath('data.summary.channels_ready_for_human_activation', 0)
            ->assertJsonPath('data.summary.public_links_enabled', 0)
            ->assertJsonPath('data.summary.real_donation_payments_enabled', 0)
            ->assertJsonPath('data.summary.real_affiliate_links_enabled', 0)
            ->assertJsonPath('data.summary.widgets_loaded', 0)
            ->assertJsonPath('data.summary.webhooks_enabled', 0)
            ->assertJsonPath('data.summary.automatic_publication_enabled', false)
            ->assertJsonPath('data.channels.0.site_slug', 'supersite')
            ->assertJsonPath('data.channels.0.channel', 'donation')
            ->assertJsonPath('data.channels.0.ready_for_human_activation', false)
            ->assertJsonPath('data.channels.0.should_publish_link', false)
            ->assertJsonPath('data.channels.0.should_load_widget', false)
            ->assertJsonPath('data.channels.0.should_track_affiliate', false);

        $this->assertDatabaseHas('audit_logs', [
            'user_id' => $user->id,
            'action' => 'api.support_monetization.go_live_readiness.viewed',
        ]);

        $audit = AuditLog::query()
            ->where('action', 'api.support_monetization.go_live_readiness.viewed')
            ->firstOrFail();

        $this->assertFalse($audit->metadata['provider_activation']);
        $this->assertSame(0, $audit->metadata['public_links_enabled']);
        $this->assertSame(0, $audit->metadata['real_affiliate_links_enabled']);
    }

    public function test_ready_channel_still_does_not_publish_link_or_widget(): void
    {
        $this->seed([PortfolioSiteSeeder::class, AccessControlSeeder::class, SupportMonetizationReadinessSeeder::class]);

        SupportMonetizationChannel::query()
            ->where('channel', 'affiliate')
            ->whereHas('site', fn ($query) => $query->where('slug', 'netprobe-atlas'))
            ->firstOrFail()
            ->update([
                'provider' => 'vpn-partner-review',
                'account_status' => 'approved',
                'terms_status' => 'accepted',
                'tax_status' => 'complete',
                'disclosure_status' => 'approved',
                'privacy_status' => 'approved',
                'policy_status' => 'approved',
                'destination_url_status' => 'configured',
                'webhook_status' => 'disabled',
                'human_approval_status' => 'approved',
                'channel_ready' => true,
                'public_enabled' => true,
                'destination_url' => 'https://partner.example/vpn?aff=secret#deal',
            ]);

        $response = $this->actingAs($this->userWithRole('operator'))
            ->getJson('/api/v1/monetization/support/go-live-readiness')
            ->assertOk()
            ->assertJsonPath('data.summary.channels_ready_for_human_activation', 1)
            ->assertJsonPath('data.summary.public_links_enabled', 0)
            ->assertJsonPath('data.summary.real_affiliate_links_enabled', 0)
            ->assertJsonPath('data.summary.widgets_loaded', 0);

        $channel = collect($response->json('data.channels'))
            ->firstWhere('provider', 'vpn-partner-review');

        $this->assertIsArray($channel);
        $this->assertSame('https://partner.example/vpn', $channel['destination_url_preview']);
        $this->assertTrue($channel['ready_for_human_activation']);
        $this->assertTrue($channel['public_enabled_in_seed']);
        $this->assertFalse($channel['should_publish_link']);
        $this->assertFalse($channel['should_load_widget']);
        $this->assertFalse($channel['should_track_affiliate']);
    }

    private function userWithRole(string $roleSlug): User
    {
        $user = User::factory()->create();
        $user->roles()->attach(Role::query()->where('slug', $roleSlug)->value('id'), ['site_id' => null]);

        return $user;
    }
}
