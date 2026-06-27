<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('ai_growth_audits', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('audit_type')->index();
            $table->string('status')->default('ready')->index();
            $table->string('source')->default('seeded')->index();
            $table->json('evidence_summary')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('ai_growth_recommendations', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ai_growth_audit_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('category')->index();
            $table->string('title');
            $table->string('status')->default('candidate')->index();
            $table->unsignedTinyInteger('impact_score');
            $table->unsignedTinyInteger('effort_score');
            $table->unsignedTinyInteger('confidence_score');
            $table->unsignedTinyInteger('risk_score');
            $table->integer('priority_score')->index();
            $table->json('evidence');
            $table->text('recommendation');
            $table->text('risk_notes')->nullable();
            $table->boolean('human_gate_required')->default(false)->index();
            $table->boolean('automation_enabled')->default(false);
            $table->boolean('external_ai_used')->default(false);
            $table->timestamps();

            $table->unique(['ai_growth_audit_id', 'site_id', 'title'], 'ai_growth_recs_audit_site_title_unique');
        });

        Schema::create('ai_growth_anomalies', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('ai_growth_audit_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('metric_key')->index();
            $table->string('direction')->default('any')->index();
            $table->decimal('baseline_value', 12, 4);
            $table->decimal('current_value', 12, 4);
            $table->decimal('threshold_percent', 6, 2);
            $table->decimal('change_percent', 8, 2);
            $table->string('status')->default('within_threshold')->index();
            $table->json('evidence');
            $table->string('causality_status')->default('not_inferred');
            $table->timestamp('detected_at')->nullable();
            $table->timestamps();

            $table->unique(['ai_growth_audit_id', 'site_id', 'metric_key'], 'ai_growth_anoms_audit_site_metric_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_growth_anomalies');
        Schema::dropIfExists('ai_growth_recommendations');
        Schema::dropIfExists('ai_growth_audits');
    }
};
