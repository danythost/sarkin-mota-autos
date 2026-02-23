<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\FinancingApplication;
use App\Models\Vehicle;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class FinancingController extends Controller
{
    public function index(Request $request)
    {
        $vehicle = null;
        if ($request->has('vehicle_id')) {
            $vehicle = Vehicle::find($request->vehicle_id);
        }

        return Inertia::render('Public/Financing', [
            'vehicle' => $vehicle,
            'vehicles' => Vehicle::where('status', 'available')->get(['id', 'title', 'price']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'vehicle_id' => 'required|exists:vehicles,id',
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'marital_status' => 'nullable|string',
            'residential_address' => 'required|string',
            'employment_status' => 'required|string',
            'employer_name' => 'nullable|string|max:255',
            'monthly_income' => 'required|numeric|min:0',
            'years_employed' => 'nullable|integer|min:0',
            'vehicle_price' => 'required|numeric|min:0',
            'proposed_deposit' => 'required|numeric|min:0',
            'preferred_duration' => 'required|integer|in:6,12,18,24',
            'calculated_monthly_payment' => 'required|numeric|min:0',
            'guarantor_name' => 'nullable|string|max:255',
            'guarantor_phone' => 'nullable|string|max:20',
            'guarantor_address' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();

        FinancingApplication::create($validated);

        return redirect()->route('dashboard')->with('success', 'Your financing application has been submitted successfully. Our team will review it and get back to you shortly.');
    }

    public function downloadPdf(FinancingApplication $financing)
    {
        // Ensure user owns the application
        if ($financing->user_id !== auth()->id()) {
            abort(403);
        }

        $financing->load('vehicle');

        $pdf = Pdf::loadView('pdf.application', ['application' => $financing]);
        
        return $pdf->stream('Financing-Application-' . $financing->id . '.pdf');
    }
}
