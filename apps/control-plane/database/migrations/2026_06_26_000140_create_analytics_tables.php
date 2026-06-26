<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('analytics_events', function (Blueprint $table): void {
            $table->ulid('id')->primary();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('contract_version', 32);
            $table->string('event_name', 80)->index();
            $table->string('source', 20)->default('client')->index();
            $table->string('locale', 12)->nullable()->index();
            $table->string('route_path')->nullable();
            $table->string('surface', 80)->nullable();
            $table->string('anonymous_id_hash', 64)->nullable()->index();
            $table->string('session_id_hash', 64)->nullable()->index();
            $table->json('properties')->nullable();
            $table->timestamp('occurred_at')->index();
            $table->timestamps();
        });

        Schema::create('metric_snapshots', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('metric_key')->index();
            $table->string('granularity', 12)->index();
            $table->timestamp('period_start')->index();
            $table->decimal('value', 18, 6);
            $table->string('source', 40)->index();
            $table->string('status', 20)->default('estimated')->index();
            $table->json('dimensions')->nullable();
            $table->timestamp('collected_at')->index();
            $table->timestamps();

            $table->index(['site_id', 'metric_key', 'period_start']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('metric_snapshots');
        Schema::dropIfExists('analytics_events');
    }
};
