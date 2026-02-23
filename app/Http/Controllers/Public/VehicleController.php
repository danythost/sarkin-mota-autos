<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    protected $vehicleService;

    public function __construct(VehicleService $vehicleService)
    {
        $this->vehicleService = $vehicleService;
    }

    public function home()
    {
        return Inertia::render('Home', [
            'featuredVehicles' => $this->vehicleService->getFeaturedVehicles(6),
            'brands' => \App\Models\Brand::all(),
            'featuredGalleries' => \App\Models\Gallery::featured()->with('coverImage')->latest()->take(4)->get(),
        ]);
    }

    public function index(Request $request)
    {
        $filters = $request->only(['brand', 'min_price', 'max_price', 'year', 'transmission', 'fuel_type']);
        
        return Inertia::render('Vehicles/Index', [
            'vehicles' => $this->vehicleService->getFilteredVehicles($filters),
            'filters' => $filters,
            'brands' => Brand::all(),
        ]);
    }

    public function show(Vehicle $vehicle)
    {
        $vehicle->load(['brand', 'images']);
        
        return Inertia::render('Vehicles/Show', [
            'vehicle' => $vehicle,
            'similarVehicles' => Vehicle::with(['brand', 'images'])
                ->where('brand_id', $vehicle->brand_id)
                ->where('id', '!=', $vehicle->id)
                ->limit(4)
                ->get(),
        ]);
    }
}
