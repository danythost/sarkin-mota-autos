<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FinancingApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FinancingController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Financing/Index', [
            'applications' => FinancingApplication::with(['vehicle', 'user'])->latest()->get(),
        ]);
    }

    public function show(FinancingApplication $financing)
    {
        return Inertia::render('Admin/Financing/Show', [
            'application' => $financing->load(['vehicle', 'user']),
        ]);
    }

    public function update(Request $request, FinancingApplication $financing)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,reviewing,approved,rejected',
        ]);

        $financing->update($validated);

        return back()->with('success', 'Application status updated.');
    }

    public function destroy(FinancingApplication $financing)
    {
        $financing->delete();

        return back()->with('success', 'Application deleted successfully.');
    }
}
