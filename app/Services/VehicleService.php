<?php

namespace App\Services;

use App\Models\Vehicle;
use App\Models\VehicleImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class VehicleService
{
    public function getFilteredVehicles(array $filters, $perPage = 12)
    {
        return Vehicle::with(['brand', 'images'])
            ->available()
            ->filter($filters)
            ->latest()
            ->paginate($perPage)
            ->withQueryString();
    }

    public function getFeaturedVehicles($limit = 6)
    {
        return Vehicle::with(['brand', 'images'])
            ->available()
            ->featured()
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function createVehicle(array $data)
    {
        if (!isset($data['slug'])) {
            $data['slug'] = $this->generateUniqueSlug($data['title']);
        }
        
        $vehicle = Vehicle::create($data);
        
        if (isset($data['images'])) {
            $this->uploadImages($vehicle, $data['images']);
        }
        
        return $vehicle;
    }

    public function updateVehicle(Vehicle $vehicle, array $data)
    {
        if (isset($data['title']) && !isset($data['slug'])) {
            $data['slug'] = $this->generateUniqueSlug($data['title'], $vehicle->id);
        }
        
        $vehicle->update($data);
        
        if (isset($data['images'])) {
            $this->uploadImages($vehicle, $data['images']);
        }
        
        return $vehicle;
    }

    protected function uploadImages(Vehicle $vehicle, array $images)
    {
        foreach ($images as $index => $image) {
            $path = $image->store('vehicles', 'public');
            
            VehicleImage::create([
                'vehicle_id' => $vehicle->id,
                'image_path' => $path,
                'is_cover' => $index === 0 && !$vehicle->images()->where('is_cover', true)->exists(),
            ]);
        }
    }

    protected function generateUniqueSlug($title, $excludeId = null)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;
        
        while (Vehicle::where('slug', $slug)->when($excludeId, fn($q) => $q->where('id', '!=', $excludeId))->exists()) {
            $slug = $originalSlug . '-' . $count++;
        }
        
        return $slug;
    }
}
