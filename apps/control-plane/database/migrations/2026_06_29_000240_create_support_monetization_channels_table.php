<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('support_monetization_channels', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->constrained()->cascadeOnDelete();
            $table->string('channel')->index();
            $table->string('provider')->default('not_selected')->index();
            $table->string('label');
            $table->string('account_status')->default('human_required')->index();
            $table->string('terms_status')->default('human_required')->index();
            $table->string('tax_status')->default('human_required')->index();
            $table->string('disclosure_status')->default('human_required')->index();
            $table->string('privacy_status')->default('human_required')->index();
            $table->string('policy_status')->default('human_required')->index();
            $table->string('destination_url_status')->default('not_configured')->index();
            $table->string('webhook_status')->default('disabled')->index();
            $table->string('human_approval_status')->default('human_required')->index();
            $table->boolean('channel_ready')->default(false);
            $table->boolean('public_enabled')->default(false);
            $table->string('destination_url')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->unique(['site_id', 'channel']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('support_monetization_channels');
    }
};
