<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('benchmark_site_readiness', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('benchmark_score')->default(0);
            $table->unsignedTinyInteger('seo_aio_score')->default(0);
            $table->unsignedTinyInteger('adsense_score')->default(0);
            $table->unsignedTinyInteger('monetization_score')->default(0);
            $table->unsignedTinyInteger('frontend_score')->default(0);
            $table->unsignedTinyInteger('performance_score')->default(0);
            $table->unsignedTinyInteger('overall_score')->default(0)->index();
            $table->string('status')->default('planned')->index();
            $table->string('data_status')->default('estimated')->index();
            $table->json('evidence');
            $table->text('notes')->nullable();
            $table->boolean('external_provider_active')->default(false)->index();
            $table->boolean('real_ads_enabled')->default(false)->index();
            $table->boolean('real_billing_enabled')->default(false)->index();
            $table->timestamps();

            $table->unique('site_id', 'benchmark_site_readiness_site_unique');
        });

        Schema::create('benchmark_opportunities', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->string('category')->index();
            $table->string('title');
            $table->text('summary');
            $table->string('status')->default('planned')->index();
            $table->string('priority')->default('p1')->index();
            $table->unsignedTinyInteger('impact_score');
            $table->unsignedTinyInteger('effort_score');
            $table->unsignedTinyInteger('confidence_score');
            $table->unsignedTinyInteger('risk_score');
            $table->integer('priority_score')->index();
            $table->string('data_status')->default('estimated')->index();
            $table->json('evidence');
            $table->boolean('human_gate_required')->default(false)->index();
            $table->boolean('automation_enabled')->default(false)->index();
            $table->boolean('external_provider_active')->default(false)->index();
            $table->timestamps();

            $table->unique(['site_id', 'category', 'title'], 'benchmark_opps_site_category_title_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('benchmark_opportunities');
        Schema::dropIfExists('benchmark_site_readiness');
    }
};
