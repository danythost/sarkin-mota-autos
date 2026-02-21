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
        Schema::create('financing_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('vehicle_id')->constrained()->onDelete('cascade');
            
            // Personal Information
            $table->string('full_name');
            $table->string('email');
            $table->string('phone');
            $table->date('date_of_birth');
            $table->string('marital_status')->nullable();
            $table->text('residential_address');
            
            // Employment Information
            $table->string('employment_status');
            $table->string('employer_name')->nullable();
            $table->decimal('monthly_income', 15, 2);
            $table->integer('years_employed')->nullable();
            
            // Finance Details
            $table->decimal('vehicle_price', 15, 2);
            $table->decimal('proposed_deposit', 15, 2);
            $table->integer('preferred_duration'); // In months
            $table->decimal('calculated_monthly_payment', 15, 2);
            
            // Guarantor Information
            $table->string('guarantor_name')->nullable();
            $table->string('guarantor_phone')->nullable();
            $table->text('guarantor_address')->nullable();
            
            $table->enum('status', ['pending', 'reviewed', 'approved', 'rejected'])->default('pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('financing_applications');
    }
};
