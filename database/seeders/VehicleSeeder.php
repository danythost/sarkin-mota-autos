<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\Brand::all()->each(function ($brand) {
            \App\Models\Vehicle::factory()->count(5)->create([
                'brand_id' => $brand->id,
            ]);
        });
    }
}
