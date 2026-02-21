<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand_id', 'title', 'slug', 'model', 'year', 'price', 'mileage',
        'transmission', 'fuel_type', 'engine', 'color', 'condition',
        'description', 'is_featured', 'status'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function images()
    {
        return $this->hasMany(VehicleImage::class);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', 'available');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['brand'] ?? null, function ($query, $brand) {
            $query->whereHas('brand', function ($query) use ($brand) {
                $query->where('slug', $brand);
            });
        });

        $query->when($filters['min_price'] ?? null, function ($query, $price) {
            $query->where('price', '>=', $price);
        });

        $query->when($filters['max_price'] ?? null, function ($query, $price) {
            $query->where('price', '<=', $price);
        });

        $query->when($filters['year'] ?? null, function ($query, $year) {
            $query->where('year', $year);
        });

        $query->when($filters['transmission'] ?? null, function ($query, $transmission) {
            $query->where('transmission', $transmission);
        });

        $query->when($filters['fuel_type'] ?? null, function ($query, $fuelType) {
            $query->where('fuel_type', $fuelType);
        });
    }
}
