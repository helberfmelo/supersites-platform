<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('executive_reports', function (Blueprint $table): void {
            $table->id();
            $table->string('ulid', 26)->unique();
            $table->string('period_type')->index();
            $table->date('period_start')->index();
            $table->date('period_end')->index();
            $table->string('title');
            $table->string('status')->default('ready')->index();
            $table->string('contract_version')->default('2026-06-27.1');
            $table->json('data_status_summary');
            $table->string('causality_status')->default('not_inferred')->index();
            $table->timestamp('generated_at')->nullable();
            $table->string('source')->default('seeded')->index();
            $table->text('notes')->nullable();
            $table->boolean('export_ready')->default(false)->index();
            $table->timestamps();

            $table->unique(['period_type', 'period_start', 'period_end'], 'exec_reports_period_unique');
        });

        Schema::create('executive_report_items', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('executive_report_id')->constrained()->cascadeOnDelete();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('section')->index();
            $table->string('label');
            $table->string('value')->nullable();
            $table->string('unit')->nullable();
            $table->string('data_status')->index();
            $table->string('source')->index();
            $table->json('evidence');
            $table->text('notes')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['executive_report_id', 'section', 'label'], 'exec_report_items_report_section_label_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('executive_report_items');
        Schema::dropIfExists('executive_reports');
    }
};
