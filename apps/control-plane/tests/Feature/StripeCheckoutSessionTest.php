<?php

namespace Tests\Feature;

use App\Models\BillingCheckoutSession;
use App\Models\BillingPlan;
use App\Models\BillingProvider;
use App\Models\Site;
use App\Models\SupportMonetizationChannel;
use Database\Seeders\BillingReadinessSeeder;
use Database\Seeders\PortfolioSiteSeeder;
use Database\Seeders\SupportMonetizationReadinessSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class StripeCheckoutSessionTest extends TestCase
{
    use RefreshDatabase;

    public function test_stripe_checkout_session_fails_closed_without_flags(): void
    {
        Http::fake();
        $this->seed([PortfolioSiteSeeder::class, BillingReadinessSeeder::class, SupportMonetizationReadinessSeeder::class]);

        $this->postJson('/api/v1/billing/stripe/checkout-sessions', [
            'kind' => 'donation',
            'site_slug' => 'netprobe-atlas',
            'locale' => 'en',
            'amount_minor' => 1000,
            'currency' => 'USD',
            'return_path' => '/supersites/netprobe-atlas/en',
        ])
            ->assertStatus(503)
            ->assertJsonPath('data.created', false)
            ->assertJsonPath('data.checkout_url', null)
            ->assertJsonPath('meta.side_effects', 'none')
            ->assertJsonPath('meta.reasons.0', 'billing_checkout_disabled');

        Http::assertNothingSent();
        $this->assertDatabaseCount('billing_checkout_sessions', 0);
    }

    public function test_ready_donation_checkout_creates_hosted_stripe_session(): void
    {
        $this->seed([PortfolioSiteSeeder::class, BillingReadinessSeeder::class, SupportMonetizationReadinessSeeder::class]);
        $this->enableCheckoutConfig();
        $this->markStripeProviderReady();
        $this->markDonationChannelReady('netprobe-atlas');

        Http::fake([
            'https://api.stripe.test/v1/checkout/sessions' => Http::response([
                'id' => 'cs_test_donation_123',
                'url' => 'https://checkout.stripe.com/c/pay/cs_test_donation_123',
            ], 200),
        ]);

        $this->postJson('/api/v1/billing/stripe/checkout-sessions', [
            'kind' => 'donation',
            'site_slug' => 'netprobe-atlas',
            'locale' => 'en',
            'amount_minor' => 1000,
            'currency' => 'USD',
            'return_path' => 'https://evil.example/steal',
        ])
            ->assertCreated()
            ->assertJsonPath('data.provider', 'stripe')
            ->assertJsonPath('data.kind', 'donation')
            ->assertJsonPath('data.checkout_url', 'https://checkout.stripe.com/c/pay/cs_test_donation_123')
            ->assertJsonPath('meta.card_data_collected_by', 'stripe')
            ->assertJsonPath('meta.entitlement_mutation', false);

        Http::assertSent(function (Request $request): bool {
            return $request->url() === 'https://api.stripe.test/v1/checkout/sessions'
                && $request['mode'] === 'payment'
                && $request['line_items[0][price_data][unit_amount]'] === '1000'
                && str_starts_with($request['success_url'], 'https://opentshost.com/supersites/netprobe-atlas/en?checkout=success');
        });

        $this->assertDatabaseHas('billing_checkout_sessions', [
            'provider' => 'stripe',
            'kind' => 'donation',
            'mode' => 'payment',
            'catalog_key' => 'support-donation',
            'provider_session_id' => 'cs_test_donation_123',
            'amount_minor' => 1000,
            'currency' => 'USD',
            'status' => 'created',
        ]);

        $this->assertDatabaseHas('audit_logs', [
            'action' => 'api.billing.checkout.stripe_created',
        ]);
    }

    public function test_ready_paid_plan_checkout_uses_provider_price_reference(): void
    {
        $this->seed([PortfolioSiteSeeder::class, BillingReadinessSeeder::class, SupportMonetizationReadinessSeeder::class]);
        $this->enableCheckoutConfig();
        $provider = $this->markStripeProviderReady();
        $site = Site::query()->where('slug', 'sitepulse-lab')->firstOrFail();

        BillingPlan::query()->create([
            'site_id' => $site->id,
            'billing_provider_id' => $provider->id,
            'slug' => 'monitoring-pro',
            'name' => 'Monitoring Pro',
            'kind' => 'subscription',
            'amount_minor' => 1900,
            'currency' => 'USD',
            'interval' => 'month',
            'provider_price_reference' => 'price_monitoring_pro',
            'status' => 'ready',
            'checkout_enabled' => true,
            'entitlements_summary' => ['monitor_slots' => 25],
            'notes' => 'Test-only paid plan mapping.',
        ]);

        Http::fake([
            'https://api.stripe.test/v1/checkout/sessions' => Http::response([
                'id' => 'cs_test_plan_123',
                'url' => 'https://checkout.stripe.com/c/pay/cs_test_plan_123',
            ], 200),
        ]);

        $this->postJson('/api/v1/billing/stripe/checkout-sessions', [
            'kind' => 'plan',
            'site_slug' => 'sitepulse-lab',
            'locale' => 'en',
            'plan_slug' => 'monitoring-pro',
            'return_path' => '/supersites/sitepulse-lab/en',
        ])
            ->assertCreated()
            ->assertJsonPath('data.kind', 'plan')
            ->assertJsonPath('data.mode', 'subscription')
            ->assertJsonPath('data.catalog_key', 'monitoring-pro')
            ->assertJsonPath('meta.entitlement_mutation', false);

        Http::assertSent(function (Request $request): bool {
            return $request['mode'] === 'subscription'
                && $request['line_items[0][price]'] === 'price_monitoring_pro'
                && $request['metadata[plan_slug]'] === 'monitoring-pro';
        });

        $this->assertSame(1, BillingCheckoutSession::query()
            ->where('provider_session_id', 'cs_test_plan_123')
            ->where('kind', 'plan')
            ->where('mode', 'subscription')
            ->count());
    }

    private function enableCheckoutConfig(): void
    {
        config([
            'billing.checkout_enabled' => true,
            'billing.provider_activation_enabled' => true,
            'billing.checkout_return_base_url' => 'https://opentshost.com',
            'billing.providers.stripe.secret_key' => 'sk_test_supersites',
            'billing.providers.stripe.checkout_enabled' => true,
            'billing.providers.stripe.donations_enabled' => true,
            'billing.providers.stripe.checkout_sessions_endpoint' => 'https://api.stripe.test/v1/checkout/sessions',
            'billing.providers.stripe.allowed_donation_amounts.USD' => [500, 1000, 2500],
        ]);
    }

    private function markStripeProviderReady(): BillingProvider
    {
        $provider = BillingProvider::query()->where('provider', 'stripe')->firstOrFail();
        $provider->update([
            'account_status' => 'approved',
            'kyc_status' => 'approved',
            'terms_status' => 'accepted',
            'tax_status' => 'complete',
            'payment_profile_status' => 'complete',
            'provider_terms_status' => 'reviewed',
            'api_key_status' => 'configured',
            'webhook_secret_status' => 'configured',
            'webhook_endpoint_status' => 'approved',
            'checkout_status' => 'ready',
            'webhook_status' => 'ready',
            'account_ready' => true,
            'checkout_enabled' => true,
            'webhooks_enabled' => true,
        ]);

        return $provider;
    }

    private function markDonationChannelReady(string $siteSlug): void
    {
        SupportMonetizationChannel::query()
            ->where('channel', 'donation')
            ->whereHas('site', fn ($query) => $query->where('slug', $siteSlug))
            ->firstOrFail()
            ->update([
                'provider' => 'stripe',
                'account_status' => 'approved',
                'terms_status' => 'accepted',
                'tax_status' => 'complete',
                'disclosure_status' => 'approved',
                'privacy_status' => 'approved',
                'policy_status' => 'approved',
                'destination_url_status' => 'configured',
                'webhook_status' => 'ready',
                'human_approval_status' => 'approved',
                'channel_ready' => true,
                'public_enabled' => true,
                'destination_url' => 'https://opentshost.com/supersites/control-plane/api/v1/billing/stripe/checkout-sessions',
            ]);
    }
}
