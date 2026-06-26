<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('deployment_records', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('environment')->index();
            $table->string('workflow')->index();
            $table->string('status')->index();
            $table->string('reference')->nullable()->index();
            $table->string('commit_sha')->nullable()->index();
            $table->text('summary')->nullable();
            $table->timestamp('started_at')->nullable()->index();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });

        Schema::create('incidents', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('severity')->default('info')->index();
            $table->string('status')->default('open')->index();
            $table->text('summary')->nullable();
            $table->timestamp('detected_at')->nullable()->index();
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
        });

        Schema::create('operational_tasks', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('title');
            $table->string('priority')->default('medium')->index();
            $table->string('status')->default('open')->index();
            $table->string('source')->default('roadmap')->index();
            $table->text('summary')->nullable();
            $table->date('due_on')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('operational_tasks');
        Schema::dropIfExists('incidents');
        Schema::dropIfExists('deployment_records');
    }
};
