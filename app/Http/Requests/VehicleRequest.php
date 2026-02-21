<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $vehicleId = $this->route('vehicle')?->id;

        return [
            'brand_id' => 'required|exists:brands,id',
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:vehicles,slug,' . $vehicleId,
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'price' => 'required|numeric|min:0',
            'mileage' => 'required|integer|min:0',
            'transmission' => 'required|string|in:Automatic,Manual',
            'fuel_type' => 'required|string|in:Petrol,Diesel,Electric,Hybrid',
            'engine' => 'nullable|string|max:255',
            'color' => 'nullable|string|max:255',
            'condition' => 'required|string|in:New,Used,Tokunbo',
            'description' => 'nullable|string',
            'is_featured' => 'boolean',
            'status' => 'required|string|in:available,sold,reserved',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }
}
