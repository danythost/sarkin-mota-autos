<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// Models in same namespace — no explicit use needed; resolved automatically

class FinancingApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'vehicle_id',
        'full_name',
        'email',
        'phone',
        'date_of_birth',
        'marital_status',
        'residential_address',
        'employment_status',
        'employer_name',
        'monthly_income',
        'years_employed',
        'vehicle_price',
        'proposed_deposit',
        'preferred_duration',
        'calculated_monthly_payment',
        'guarantor_name',
        'guarantor_phone',
        'guarantor_address',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }
}
