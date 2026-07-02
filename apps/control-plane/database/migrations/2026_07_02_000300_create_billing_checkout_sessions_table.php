<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billing_checkout_sessions', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('billing_provider_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('billing_plan_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('provider')->index();
            $table->string('kind')->index();
            $table->string('mode')->index();
            $table->string('catalog_key')->nullable()->index();
            $table->string('provider_session_id')->nullable()->unique();
            $table->string('checkout_url_hash')->nullable();
            $table->string('client_reference_id')->nullable()->index();
            $table->unsignedBigInteger('amount_minor')->nullable();
            $table->char('currency', 3)->nullable()->index();
            $table->string('status')->default('created')->index();
            $table->string('request_fingerprint')->index();
            $table->string('metadata_hash')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_checkout_sessions');
    }
};
