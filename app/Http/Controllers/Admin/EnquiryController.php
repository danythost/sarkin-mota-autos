<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Enquiry;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EnquiryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Enquiries/Index', [
            'enquiries' => Enquiry::latest()->get(),
        ]);
    }

    public function update(Request $request, Enquiry $enquiry)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:pending,responding,resolved',
        ]);

        $enquiry->update($validated);

        return back()->with('success', 'Enquiry status updated.');
    }

    public function destroy(Enquiry $enquiry)
    {
        $enquiry->delete();

        return back()->with('success', 'Enquiry deleted successfully.');
    }
}
