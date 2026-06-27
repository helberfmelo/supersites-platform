<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('google_integrations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('domain_mode')->default('pending_domain')->index();
            $table->string('domain_property')->nullable();
            $table->string('ga4_property_id')->nullable();
            $table->string('ga4_measurement_id')->nullable();
            $table->string('gtm_container_id')->nullable();
            $table->string('search_console_property')->nullable();
            $table->string('access_status')->default('human_required')->index();
            $table->string('ga4_status')->default('not_configured')->index();
            $table->string('gtm_status')->default('not_configured')->index();
            $table->string('search_console_status')->default('human_required')->index();
            $table->boolean('tags_enabled')->default(false);
            $table->boolean('data_import_enabled')->default(false);
            $table->json('allowed_events')->nullable();
            $table->timestamp('last_validated_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('google_integrations');
    }
};
