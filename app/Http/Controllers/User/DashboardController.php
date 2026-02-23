<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\FinancingApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('Dashboard', [
            'applications' => FinancingApplication::with('vehicle')
                ->where('user_id', $request->user()->id)
                ->latest()
                ->get(),
            'feedbacks' => \App\Models\Feedback::where('email', $request->user()->email)
                ->latest()
                ->get(),
        ]);
    }
}
