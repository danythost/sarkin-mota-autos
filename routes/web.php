<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Public\VehicleController as PublicVehicleController;
use App\Http\Controllers\Admin\VehicleController as AdminVehicleController;
use App\Http\Controllers\Admin\BrandController as AdminBrandController;

use App\Http\Controllers\Public\PageController;
use App\Http\Controllers\Public\FinancingController;
use App\Http\Controllers\Public\GalleryController as PublicGalleryController;
use App\Http\Controllers\Admin\GalleryController as AdminGalleryController;
use App\Http\Controllers\Admin\LoginController as AdminLoginController;

// Public Routes
Route::get('/', [PublicVehicleController::class, 'home'])->name('home');
Route::get('/vehicles', [PublicVehicleController::class, 'index'])->name('vehicles.index');
Route::get('/vehicles/{vehicle:slug}', [PublicVehicleController::class, 'show'])->name('vehicles.show');

Route::get('/financing', [FinancingController::class, 'index'])->name('financing.index');
Route::post('/financing', [FinancingController::class, 'store'])->name('financing.store');

Route::get('/gallery', [PublicGalleryController::class, 'index'])->name('gallery.index');
Route::get('/gallery/{gallery:slug}', [PublicGalleryController::class, 'show'])->name('gallery.show');

Route::get('/feedback', [\App\Http\Controllers\Public\FeedbackController::class, 'index'])->name('feedback.index');
Route::post('/feedback', [\App\Http\Controllers\Public\FeedbackController::class, 'store'])->name('feedback.store');
Route::post('/enquiry', [\App\Http\Controllers\Public\EnquiryController::class, 'store'])->name('enquiry.store');

// Admin Login (redirect to dashboard if already logged in as admin)
Route::prefix('sarki-manager')->name('admin.')->group(function () {
    Route::get('login', [AdminLoginController::class, 'create'])->name('login');
    Route::post('login', [AdminLoginController::class, 'store'])->name('login.store');
    Route::post('logout', [AdminLoginController::class, 'destroy'])->name('logout')->middleware('admin');
});

// Admin Routes (admin guard required)
Route::middleware(['admin'])->prefix('sarki-manager')->name('admin.')->group(function () {
    Route::resource('vehicles', AdminVehicleController::class);
    Route::resource('brands', AdminBrandController::class);
    Route::resource('gallery', AdminGalleryController::class);
    Route::delete('gallery-images/{image}', [AdminGalleryController::class, 'destroyImage'])->name('gallery-images.destroy');
    Route::patch('gallery-images/{image}/cover', [AdminGalleryController::class, 'setCover'])->name('gallery-images.cover');

    // Lead Management
    Route::resource('enquiries', \App\Http\Controllers\Admin\EnquiryController::class)->only(['index', 'update', 'destroy']);
    Route::resource('feedback', \App\Http\Controllers\Admin\FeedbackController::class)->only(['index', 'update', 'destroy']);
    Route::resource('financing', \App\Http\Controllers\Admin\FinancingController::class)->only(['index', 'show', 'update', 'destroy']);

    // Admin Profile
    Route::get('profile', [\App\Http\Controllers\Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('profile', [\App\Http\Controllers\Admin\ProfileController::class, 'update'])->name('profile.update');
    Route::put('profile/password', [\App\Http\Controllers\Admin\ProfileController::class, 'updatePassword'])->name('profile.password.update');
});

// User Auth Routes
use App\Http\Controllers\Auth\LoginController;

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('login.store');

    Route::get('forgot-password', [\App\Http\Controllers\Auth\ForgotPasswordController::class, 'create'])->name('password.request');
    Route::post('forgot-password', [\App\Http\Controllers\Auth\ForgotPasswordController::class, 'store'])->name('password.email');
    Route::get('reset-password/{token}', [\App\Http\Controllers\Auth\ResetPasswordController::class, 'create'])->name('password.reset');
    Route::post('reset-password', [\App\Http\Controllers\Auth\ResetPasswordController::class, 'store'])->name('password.update');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\User\DashboardController::class, 'index'])->name('dashboard');
    
    Route::get('/profile', [\App\Http\Controllers\User\ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [\App\Http\Controllers\User\ProfileController::class, 'update'])->name('profile.update');
    Route::put('/profile/password', [\App\Http\Controllers\User\ProfileController::class, 'updatePassword'])->name('profile.update-password');
});

Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

