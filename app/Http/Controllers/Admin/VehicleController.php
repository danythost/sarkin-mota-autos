<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\VehicleRequest;
use App\Models\Brand;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Inertia\Inertia;

class VehicleController extends Controller
{
    protected $vehicleService;

    public function __construct(VehicleService $vehicleService)
    {
        $this->vehicleService = $vehicleService;
    }

    public function index()
    {
        return Inertia::render('Admin/Vehicles/Index', [
            'vehicles' => Vehicle::with('brand')->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Vehicles/Create', [
            'brands' => Brand::all()
        ]);
    }

    public function store(VehicleRequest $request)
    {
        $this->vehicleService->createVehicle($request->validated());

        return redirect()->route('admin.vehicles.index')
            ->with('success', 'Vehicle created successfully.');
    }

    public function edit(Vehicle $vehicle)
    {
        return Inertia::render('Admin/Vehicles/Edit', [
            'vehicle' => $vehicle->load('images'),
            'brands' => Brand::all()
        ]);
    }

    public function update(VehicleRequest $request, Vehicle $vehicle)
    {
        $this->vehicleService->updateVehicle($vehicle, $request->validated());

        return redirect()->route('admin.vehicles.index')
            ->with('success', 'Vehicle updated successfully.');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->route('admin.vehicles.index')
            ->with('success', 'Vehicle deleted successfully.');
    }
}
