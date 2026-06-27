<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billing_providers', function (Blueprint $table): void {
            $table->id();
            $table->string('provider')->unique();
            $table->string('account_status')->default('human_required')->index();
            $table->string('kyc_status')->default('human_required')->index();
            $table->string('terms_status')->default('human_required')->index();
            $table->string('tax_status')->default('human_required')->index();
            $table->string('payment_profile_status')->default('human_required')->index();
            $table->string('provider_terms_status')->default('human_required')->index();
            $table->string('api_key_status')->default('not_configured')->index();
            $table->string('webhook_secret_status')->default('not_configured')->index();
            $table->string('webhook_endpoint_status')->default('not_configured')->index();
            $table->string('checkout_status')->default('disabled')->index();
            $table->string('webhook_status')->default('disabled')->index();
            $table->boolean('account_ready')->default(false);
            $table->boolean('checkout_enabled')->default(false);
            $table->boolean('webhooks_enabled')->default(false);
            $table->timestamp('last_validated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('billing_plans', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->foreignId('billing_provider_id')->nullable()->constrained()->nullOnDelete();
            $table->string('slug');
            $table->string('name');
            $table->string('kind')->default('free_preview')->index();
            $table->unsignedBigInteger('amount_minor')->default(0);
            $table->char('currency', 3)->default('USD')->index();
            $table->string('interval')->default('month');
            $table->string('provider_price_reference')->nullable();
            $table->string('status')->default('draft')->index();
            $table->boolean('checkout_enabled')->default(false);
            $table->json('entitlements_summary')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['site_id', 'slug']);
        });

        Schema::create('billing_entitlements', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('billing_plan_id')->constrained()->cascadeOnDelete();
            $table->string('code');
            $table->string('value_type');
            $table->boolean('boolean_value')->nullable();
            $table->unsignedBigInteger('integer_value')->nullable();
            $table->string('string_value')->nullable();
            $table->string('source')->default('seeded')->index();
            $table->timestamps();

            $table->unique(['billing_plan_id', 'code']);
        });

        Schema::create('billing_webhook_events', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('billing_provider_id')->nullable()->constrained()->nullOnDelete();
            $table->string('provider')->index();
            $table->string('external_event_id')->nullable();
            $table->string('event_type')->nullable()->index();
            $table->string('signature_status')->default('not_configured')->index();
            $table->string('processing_status')->default('disabled')->index();
            $table->string('idempotency_key')->nullable()->index();
            $table->string('payload_hash')->nullable();
            $table->timestamp('received_at')->nullable();
            $table->timestamp('processed_at')->nullable();
            $table->timestamps();

            $table->unique(['provider', 'external_event_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_webhook_events');
        Schema::dropIfExists('billing_entitlements');
        Schema::dropIfExists('billing_plans');
        Schema::dropIfExists('billing_providers');
    }
};
