<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        $galleries = Gallery::with(['images' => function ($q) {
            $q->where('is_cover', true)->orWhere('sort_order', 0)->limit(1);
        }])->with('coverImage')->latest()->get();

        $featured = Gallery::with('coverImage')->featured()->latest()->take(3)->get();

        return Inertia::render('Public/Gallery', [
            'galleries' => $galleries,
            'featured'  => $featured,
        ]);
    }

    public function show(Gallery $gallery)
    {
        $gallery->load('images');

        return Inertia::render('Public/GalleryAlbum', [
            'gallery' => $gallery,
        ]);
    }
}
