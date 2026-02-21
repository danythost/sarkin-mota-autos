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

// Admin Login (redirect to dashboard if already logged in as admin)
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('login', [AdminLoginController::class, 'create'])->name('login');
    Route::post('login', [AdminLoginController::class, 'store'])->name('login.store');
    Route::post('logout', [AdminLoginController::class, 'destroy'])->name('logout')->middleware('admin');
});

// Admin Routes (admin guard required)
Route::middleware(['admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('vehicles', AdminVehicleController::class);
    Route::resource('brands', AdminBrandController::class);
    Route::resource('gallery', AdminGalleryController::class);
    Route::delete('gallery-images/{image}', [AdminGalleryController::class, 'destroyImage'])->name('gallery-images.destroy');
    Route::patch('gallery-images/{image}/cover', [AdminGalleryController::class, 'setCover'])->name('gallery-images.cover');
});

// User Auth Routes
use App\Http\Controllers\Auth\LoginController;

Route::middleware('guest')->group(function () {
    Route::get('login', [LoginController::class, 'create'])->name('login');
    Route::post('login', [LoginController::class, 'store'])->name('login.store');
});

Route::post('logout', [LoginController::class, 'destroy'])->name('logout');

