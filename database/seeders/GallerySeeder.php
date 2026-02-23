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
                'description' => 'A short highlight of our premium performance lineup.',
                'is_featured' => true,
                'video_path' => 'sample_videos/video1.mp4',
                'location' => 'Abuja Showroom',
            ],
            [
                'title' => 'Luxury SUV Showcase',
                'category' => 'showroom',
                'description' => 'Exploring the comfort and power of our latest SUVs.',
                'is_featured' => true,
                'video_path' => 'sample_videos/video2.mp4',
                'location' => 'Lagos Office',
            ],
            [
                'title' => 'Happy Client Delivery',
                'category' => 'delivery',
                'description' => 'Celebrating another successful delivery to a happy customer.',
                'is_featured' => true,
                'video_path' => 'sample_videos/video3.mp4',
                'location' => 'Victoria Island',
            ],
        ];

        foreach ($galleries as $galleryData) {
            $gallery = Gallery::create($galleryData);

            // Create a placeholder cover image
            GalleryImage::create([
                'gallery_id' => $gallery->id,
                'image_path' => 'placeholders/gallery_cover_' . Str::slug($gallery->title) . '.jpg',
                'is_cover' => true,
                'sort_order' => 0,
            ]);
        }
    }
}
