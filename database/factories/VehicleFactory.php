<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'brand_id' => \App\Models\Brand::factory(),
            'title' => $this->faker->sentence(3),
            'slug' => $this->faker->unique()->slug(),
            'model' => $this->faker->word(),
            'year' => $this->faker->year(),
            'price' => $this->faker->numberBetween(1000000, 50000000),
            'mileage' => $this->faker->numberBetween(0, 200000),
            'transmission' => $this->faker->randomElement(['Automatic', 'Manual']),
            'fuel_type' => $this->faker->randomElement(['Petrol', 'Diesel', 'Electric', 'Hybrid']),
            'engine' => $this->faker->numerify('V# #.#L'),
            'color' => $this->faker->safeColorName(),
            'condition' => $this->faker->randomElement(['New', 'Used', 'Tokunbo']),
            'description' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['available', 'sold', 'reserved']),
            'is_featured' => $this->faker->boolean(20),
        ];
    }
}
