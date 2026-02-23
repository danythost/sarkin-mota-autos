<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Feedback/Index', [
            'feedbacks' => Feedback::latest()->get(),
        ]);
    }

    public function update(Request $request, Feedback $feedback)
    {
        $validated = $request->validate([
            'is_published' => 'required|boolean',
        ]);

        $feedback->update($validated);

        return back()->with('success', 'Feedback status updated.');
    }

    public function destroy(Feedback $feedback)
    {
        $feedback->delete();

        return back()->with('success', 'Feedback deleted successfully.');
    }
}
