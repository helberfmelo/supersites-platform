<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('net_probe_monitors', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('type', 32)->index();
            $table->string('label')->nullable();
            $table->string('target');
            $table->string('target_hash', 64)->index();
            $table->string('status', 32)->default('active')->index();
            $table->string('quota_plan', 64)->default('free_preview')->index();
            $table->unsignedSmallInteger('frequency_minutes')->default(60);
            $table->json('settings')->nullable();
            $table->string('last_status', 32)->default('unknown')->index();
            $table->timestamp('last_checked_at')->nullable();
            $table->timestamp('next_run_at')->nullable()->index();
            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['type', 'status', 'next_run_at']);
        });

        Schema::create('net_probe_monitor_checks', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('monitor_id')->constrained('net_probe_monitors')->cascadeOnDelete();
            $table->string('status', 32)->index();
            $table->timestamp('started_at')->index();
            $table->timestamp('finished_at')->nullable();
            $table->unsignedInteger('duration_ms')->nullable();
            $table->json('response_summary')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();

            $table->index(['monitor_id', 'started_at']);
        });

        Schema::create('net_probe_alerts', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('monitor_id')->constrained('net_probe_monitors')->cascadeOnDelete();
            $table->foreignId('monitor_check_id')->nullable()->constrained('net_probe_monitor_checks')->nullOnDelete();
            $table->string('channel', 32)->index();
            $table->string('destination_hash', 64)->index();
            $table->string('status', 32)->default('pending')->index();
            $table->string('severity', 32)->default('warning')->index();
            $table->timestamp('triggered_at')->index();
            $table->timestamp('sent_at')->nullable();
            $table->text('error_message')->nullable();
            $table->json('payload')->nullable();
            $table->timestamps();

            $table->index(['monitor_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('net_probe_alerts');
        Schema::dropIfExists('net_probe_monitor_checks');
        Schema::dropIfExists('net_probe_monitors');
    }
};
