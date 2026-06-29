<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('growth_provider_ingestions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('source', 40);
            $table->string('provider_label')->nullable();
            $table->string('access_status')->default('human_required');
            $table->string('token_status')->default('human_required');
            $table->string('quota_status')->default('human_required');
            $table->string('data_contract_status')->default('human_required');
            $table->string('retention_status')->default('human_required');
            $table->string('import_status')->default('human_required');
            $table->string('data_status')->default('unavailable');
            $table->boolean('import_enabled')->default(false);
            $table->timestamp('last_successful_import_at')->nullable();
            $table->timestamp('latest_snapshot_at')->nullable();
            $table->string('latest_error_code')->nullable();
            $table->json('evidence')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['site_id', 'source']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('growth_provider_ingestions');
    }
};
