<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('qr_route_links', function (Blueprint $table): void {
            $table->id();
            $table->string('code', 32)->unique();
            $table->text('destination_url');
            $table->string('destination_hash', 64)->index();
            $table->string('status', 24)->default('active')->index();
            $table->string('abuse_status', 24)->default('unchecked')->index();
            $table->unsignedBigInteger('click_count')->default(0);
            $table->timestamp('last_accessed_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('qr_route_links');
    }
};
