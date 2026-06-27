<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('adsense_accounts', function (Blueprint $table): void {
            $table->id();
            $table->string('publisher_label')->unique();
            $table->string('publisher_id')->nullable();
            $table->string('beneficiary_status')->default('human_required')->index();
            $table->string('duplicate_account_status')->default('human_required')->index();
            $table->string('terms_status')->default('human_required')->index();
            $table->string('tax_status')->default('human_required')->index();
            $table->string('payment_profile_status')->default('human_required')->index();
            $table->string('bank_status')->default('human_required')->index();
            $table->string('pin_status')->default('human_required')->index();
            $table->string('management_api_status')->default('not_configured')->index();
            $table->string('account_status')->default('human_required')->index();
            $table->boolean('account_ready')->default(false);
            $table->boolean('management_api_enabled')->default(false);
            $table->boolean('ad_serving_enabled')->default(false);
            $table->timestamp('last_validated_at')->nullable();
            $table->timestamps();
        });

        Schema::create('adsense_site_reviews', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->unique()->constrained()->cascadeOnDelete();
            $table->foreignId('adsense_account_id')->nullable()->constrained()->nullOnDelete();
            $table->string('public_url')->nullable();
            $table->string('domain_status')->default('pending_definitive_domain')->index();
            $table->string('site_review_status')->default('not_submitted')->index();
            $table->string('ads_txt_status')->default('not_published')->index();
            $table->string('quality_gate_status')->default('not_ready')->index();
            $table->string('consent_status')->default('not_ready')->index();
            $table->string('policy_status')->default('pending_review')->index();
            $table->string('public_smoke_status')->default('placeholder')->index();
            $table->boolean('placements_enabled')->default(false);
            $table->boolean('auto_ads_enabled')->default(false);
            $table->boolean('ad_serving_enabled')->default(false);
            $table->timestamp('site_added_at')->nullable();
            $table->timestamp('last_validated_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('adsense_site_reviews');
        Schema::dropIfExists('adsense_accounts');
    }
};
