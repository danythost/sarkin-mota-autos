<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\Brand;
use App\Models\Enquiry;
use App\Models\FinancingApplication;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Vehicle stats
        $totalVehicles     = Vehicle::count();
        $availableVehicles = Vehicle::where('status', 'available')->count();
        $soldVehicles      = Vehicle::where('status', 'sold')->count();
        $featuredVehicles  = Vehicle::where('is_featured', true)->count();
        $totalBrands       = Brand::count();

        // Lead stats
        $newEnquiries       = Enquiry::where('status', 'pending')->count();
        $pendingFinancing   = FinancingApplication::where('status', 'pending')->count();

        // Recent activity feed — last 8 enquiries + last 8 financing apps, merged
        $recentEnquiries = Enquiry::latest()
            ->take(8)
            ->get()
            ->map(fn ($e) => [
                'type'       => 'enquiry',
                'icon'       => 'chat',
                'title'      => $e->name . ' sent an enquiry',
                'detail'     => $e->subject ?? $e->message,
                'status'     => $e->status,
                'created_at' => $e->created_at,
            ]);

        $recentFinancing = FinancingApplication::with('vehicle')->latest()
            ->take(8)
            ->get()
            ->map(fn ($f) => [
                'type'       => 'financing',
                'icon'       => 'document',
                'title'      => $f->full_name . ' applied for financing',
                'detail'     => $f->vehicle?->title ?? 'Vehicle not specified',
                'status'     => $f->status,
                'created_at' => $f->created_at,
            ]);

        $activityFeed = $recentEnquiries
            ->concat($recentFinancing)
            ->sortByDesc('created_at')
            ->take(10)
            ->values();

        return Inertia::render('Admin/Overview', [
            'stats' => [
                'total_vehicles'     => $totalVehicles,
                'available_vehicles' => $availableVehicles,
                'sold_vehicles'      => $soldVehicles,
                'featured_vehicles'  => $featuredVehicles,
                'total_brands'       => $totalBrands,
                'new_enquiries'      => $newEnquiries,
                'pending_financing'  => $pendingFinancing,
            ],
            'activityFeed' => $activityFeed,
        ]);
    }
}
