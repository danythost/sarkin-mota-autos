<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class GallerySeeder extends Seeder
{
    public function run()
    {
        $galleries = [
            [
                'title' => 'King of Performance',
                'category' => 'showroom',
                'description' => 'A showcase of our premium high-performance sports cars and supercars.',
                'is_featured' => true,
                'video_path' => 'https://video.wixstatic.com/video/11062b_1ed35c60e58e469595860dd3971e4793/1080p/mp4/file.mp4',
                'location' => 'Abuja Showroom',
                'images' => [
                    'https://images.unsplash.com/photo-1525609004556-c46c7d6cf0a3?w=800', // Lamborghini Aventador (Cover)
                    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800', // Porsche 911
                    'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800', // Audi R8
                    'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', // Ferrari F8
                ]
            ],
            [
                'title' => 'Luxury SUV Showcase',
                'category' => 'showroom',
                'description' => 'Exploring the unparalleled comfort, safety, and power of our latest luxury SUVs.',
                'is_featured' => true,
                'video_path' => 'https://video.wixstatic.com/video/11062b_1ed35c60e58e469595860dd3971e4793/1080p/mp4/file.mp4',
                'location' => 'Lagos Office',
                'images' => [
                    'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=800', // Toyota Land Cruiser SUV (Cover)
                    'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800', // Lexus LX SUV
                    'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=800', // Mercedes G Wagon
                    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800', // Ford Explorer SUV
                ]
            ],
            [
                'title' => 'Happy Client Delivery',
                'category' => 'delivery',
                'description' => 'Celebrating another successful delivery of keys to our amazing clients across Nigeria.',
                'is_featured' => true,
                'video_path' => null,
                'location' => 'Victoria Island, Lagos',
                'images' => [
                    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800', // Mercedes E Class (Cover)
                    'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800', // AMG Sedan
                    'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800', // Ford Mustang
                    'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800', // Tesla Model S
                ]
            ],
        ];

        foreach ($galleries as $galleryData) {
            $images = $galleryData['images'];
            unset($galleryData['images']);
            
            // Create slug automatically if not present
            $galleryData['slug'] = Str::slug($galleryData['title']);

            $gallery = Gallery::create($galleryData);

            // Create cover and gallery images
            foreach ($images as $index => $imageUrl) {
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image_path' => $imageUrl,
                    'is_cover' => ($index === 0),
                    'sort_order' => $index,
                ]);
            }
        }
    }
}
