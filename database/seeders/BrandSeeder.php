<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $brands = [
            'Toyota',
            'Honda',
            'Mercedes-Benz',
            'Lexus',
            'BMW',
            'Ford',
            'Hyundai',
            'Kia',
            'Nissan',
            'Volkswagen',
        ];

        foreach ($brands as $brand) {
            \App\Models\Brand::factory()->create([
                'name' => $brand,
                'slug' => \Illuminate\Support\Str::slug($brand),
            ]);
        }
    }
}
