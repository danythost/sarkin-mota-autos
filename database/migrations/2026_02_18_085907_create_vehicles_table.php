<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('model');
            $table->year('year');
            $table->decimal('price', 12, 2);
            $table->integer('mileage');
            $table->string('transmission'); // Automatic, Manual
            $table->string('fuel_type'); // Petrol, Diesel, Electric, Hybrid
            $table->string('engine')->nullable();
            $table->string('color')->nullable();
            $table->string('condition'); // New, Used, Tokunbo
            $table->text('description')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->enum('status', ['available', 'sold', 'reserved'])->default('available');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
