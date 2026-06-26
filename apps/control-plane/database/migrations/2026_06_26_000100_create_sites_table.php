<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sites', function (Blueprint $table): void {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('kind')->index();
            $table->string('category')->nullable()->index();
            $table->unsignedSmallInteger('launch_order')->nullable()->index();
            $table->string('status')->default('planned')->index();
            $table->string('temporary_url')->nullable();
            $table->json('locales');
            $table->boolean('adsense_ready')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('sites');
    }
};
