<?php

namespace App\Services;

use App\Models\Brand;
use Illuminate\Support\Str;

class BrandService
{
    public function getAllBrands()
    {
        return Brand::orderBy('name')->get();
    }

    public function createBrand(array $data)
    {
        if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        return Brand::create($data);
    }

    public function updateBrand(Brand $brand, array $data)
    {
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $brand->update($data);
        return $brand;
    }

    public function deleteBrand(Brand $brand)
    {
        return $brand->delete();
    }
}
