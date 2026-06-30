<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Vehicle;
use App\Models\VehicleImage;
use App\Models\Brand;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // High quality Unsplash car images categorized by brand slug
        $carImagesByBrand = [
            'toyota' => [
                'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800', // Toyota Camry
                'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800', // Toyota Land Cruiser / SUV
                'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800', // Toyota Hiace / Van
                'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800', // Toyota RAV4
            ],
            'mercedes-benz' => [
                'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', // Mercedes E Class
                'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', // Mercedes C63 AMG
                'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=800', // Mercedes G Wagon
                'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800', // Mercedes A Class
            ],
            'bmw' => [
                'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800', // BMW 5 Series
                'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800', // BMW M4 Coupe
                'https://images.unsplash.com/photo-1523983388277-336a66bf9bcd?w=800', // BMW M3
                'https://images.unsplash.com/photo-1617654112364-3074056312cd?w=800', // BMW 3 Series
            ],
            'honda' => [
                'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=800', // Honda Civic
                'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', // Honda CRV
                'https://images.unsplash.com/photo-1596731902620-7f324157d197?w=800', // Honda Accord
                'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=800', // Honda Fit
            ],
            'lexus' => [
                'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', // Lexus RX SUV
                'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800', // Lexus IS Sedan
                'https://images.unsplash.com/photo-1618843479619-f13505b36157?w=800', // Lexus LC Coupe
            ],
            'ford' => [
                'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800', // Ford Mustang Black
                'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800', // Ford Mustang Red
                'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', // Ford Explorer SUV
                'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', // Ford GT
            ],
            'hyundai' => [
                'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800', // Hyundai Sonata
                'https://images.unsplash.com/photo-1620216447814-dcbb175d713c?w=800', // Hyundai Elantra
                'https://images.unsplash.com/photo-1616788494707-ec28f08d05a1?w=800', // Hyundai Santa Fe
            ],
            'kia' => [
                'https://images.unsplash.com/photo-1629019725048-7767194a7738?w=800', // Kia Stinger
                'https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=800', // Kia Sportage
                'https://images.unsplash.com/photo-1631880386644-f8ae4dd7768e?w=800', // Kia Sorento
            ],
        ];

        // Generic pool for other brands or extra gallery slots
        $generalCarPool = [
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', // Porsche 911
            'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800', // Audi R8
            'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800', // Lamborghini Aventador
            'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800', // Chevrolet Corvette
            'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800', // Aston Martin
            'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800', // Tesla Model S
            'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800', // Sports Car Side
            'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', // SUV Offroad
        ];

        // Common car models by brand
        $carModelsByBrand = [
            'toyota' => ['Camry', 'Corolla', 'RAV4', 'Highlander', 'Land Cruiser', 'Hilux', 'Prado'],
            'honda' => ['Civic', 'Accord', 'CR-V', 'Pilot', 'Fit', 'HR-V'],
            'mercedes-benz' => ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'G-Wagon', 'A-Class'],
            'lexus' => ['RX 350', 'ES 350', 'IS 250', 'LX 570', 'GX 460', 'NX 300'],
            'bmw' => ['3 Series', '5 Series', 'X3', 'X5', '7 Series', 'M4', 'X6'],
            'ford' => ['Mustang', 'F-150', 'Explorer', 'Escape', 'Ranger', 'Edge'],
            'hyundai' => ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Palisade'],
            'kia' => ['Optima', 'Sorento', 'Sportage', 'Rio', 'Telluride', 'Stinger'],
            'nissan' => ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Armada'],
            'volkswagen' => ['Golf', 'Passat', 'Tiguan', 'Jetta', 'Touareg'],
        ];

        Brand::all()->each(function ($brand) use ($carImagesByBrand, $generalCarPool, $carModelsByBrand) {
            $slug = strtolower($brand->slug);
            
            // Get brand specific images or fallback to general pool
            $brandImages = $carImagesByBrand[$slug] ?? $generalCarPool;
            $brandModels = $carModelsByBrand[$slug] ?? ['Sedan', 'SUV', 'Coupe', 'Hatchback', 'Truck'];

            // Create 5 vehicles for each brand
            for ($i = 0; $i < 5; $i++) {
                $modelName = collect($brandModels)->random();
                $year = rand(2010, 2024);
                $title = $year . ' ' . $brand->name . ' ' . $modelName;

                $vehicle = Vehicle::factory()->create([
                    'brand_id' => $brand->id,
                    'model' => $modelName,
                    'title' => $title,
                    'slug' => \Illuminate\Support\Str::slug($title . '-' . rand(1000, 9999)),
                ]);
                
                // Determine how many images to assign (between 2 and 4)
                $imageCount = rand(2, 4);
                
                // Shuffle pools to get random variation
                $primaryPool = $brandImages;
                shuffle($primaryPool);
                
                $secondaryPool = $generalCarPool;
                shuffle($secondaryPool);

                for ($j = 0; $j < $imageCount; $j++) {
                    // Use brand-specific image if available, else pick from general pool
                    $imageUrl = $primaryPool[$j] ?? $secondaryPool[$j] ?? $generalCarPool[0];

                    VehicleImage::create([
                        'vehicle_id' => $vehicle->id,
                        'image_path' => $imageUrl,
                        'is_cover' => ($j === 0), // First image is cover
                    ]);
                }
            }
        });
    }
}
