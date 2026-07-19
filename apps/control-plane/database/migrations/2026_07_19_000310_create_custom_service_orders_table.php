<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('custom_service_orders', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('site_id')->nullable()->constrained()->nullOnDelete();
            $table->string('reference')->unique();
            $table->string('service_slug')->index();
            $table->string('status')->default('inquiry')->index();
            $table->string('title');
            $table->text('scope_summary')->nullable();
            $table->unsignedBigInteger('amount_minor')->nullable();
            $table->char('currency', 3)->nullable();
            $table->string('payment_status')->default('not_applicable')->index();
            $table->timestamp('requested_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('custom_service_orders');
    }
};
