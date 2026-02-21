<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\GalleryImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery/Index', [
            'galleries' => Gallery::withCount('images')->latest()->paginate(15),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Gallery/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|in:showroom,event,delivery,sold',
            'description' => 'nullable|string',
            'event_date'  => 'nullable|date',
            'location'    => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'video'       => 'nullable|file|mimes:mp4,webm,mov|max:51200',
            'images'      => 'nullable|array',
            'images.*'    => 'image|mimes:jpg,jpeg,png,webp|max:4096',
            'cover_index' => 'nullable|integer',
        ]);

        $videoPath = null;
        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store('gallery/videos', 'public');
        }

        $gallery = Gallery::create([
            'title'       => $validated['title'],
            'slug'        => Str::slug($validated['title']) . '-' . uniqid(),
            'category'    => $validated['category'],
            'description' => $validated['description'] ?? null,
            'event_date'  => $validated['event_date'] ?? null,
            'location'    => $validated['location'] ?? null,
            'is_featured' => $request->boolean('is_featured'),
            'video_path'  => $videoPath,
        ]);

        if ($request->hasFile('images')) {
            $coverIdx = $request->input('cover_index', 0);
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('gallery', 'public');
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image_path' => $path,
                    'is_cover'   => ($index == $coverIdx),
                    'sort_order' => $index,
                ]);
            }
        }

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery created successfully.');
    }

    public function edit(Gallery $gallery)
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'gallery' => $gallery->load('images'),
        ]);
    }

    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category'    => 'required|in:showroom,event,delivery,sold',
            'description' => 'nullable|string',
            'event_date'  => 'nullable|date',
            'location'    => 'nullable|string|max:255',
            'is_featured' => 'boolean',
            'video'       => 'nullable|file|mimes:mp4,webm,mov|max:51200',
            'remove_video'=> 'nullable|boolean',
            'images'      => 'nullable|array',
            'images.*'    => 'image|mimes:jpg,jpeg,png,webp|max:4096',
            'cover_index' => 'nullable|integer',
        ]);

        $update = [
            'title'       => $validated['title'],
            'category'    => $validated['category'],
            'description' => $validated['description'] ?? null,
            'event_date'  => $validated['event_date'] ?? null,
            'location'    => $validated['location'] ?? null,
            'is_featured' => $request->boolean('is_featured'),
        ];

        if ($request->boolean('remove_video') && $gallery->video_path) {
            Storage::disk('public')->delete($gallery->video_path);
            $update['video_path'] = null;
        }
        if ($request->hasFile('video')) {
            if ($gallery->video_path) {
                Storage::disk('public')->delete($gallery->video_path);
            }
            $update['video_path'] = $request->file('video')->store('gallery/videos', 'public');
        }
        $gallery->update($update);

        if ($request->hasFile('images')) {
            $existingCount = $gallery->images()->count();
            $coverIdx = $request->input('cover_index', -1);
            foreach ($request->file('images') as $index => $file) {
                $path = $file->store('gallery', 'public');
                GalleryImage::create([
                    'gallery_id' => $gallery->id,
                    'image_path' => $path,
                    'is_cover'   => ($index == $coverIdx),
                    'sort_order' => $existingCount + $index,
                ]);
            }
        }

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery updated successfully.');
    }

    public function destroy(Gallery $gallery)
    {
        foreach ($gallery->images as $image) {
            Storage::disk('public')->delete($image->image_path);
        }
        if ($gallery->video_path) {
            Storage::disk('public')->delete($gallery->video_path);
        }
        $gallery->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Gallery deleted successfully.');
    }

    public function destroyImage(GalleryImage $image)
    {
        Storage::disk('public')->delete($image->image_path);
        $image->delete();

        return back()->with('success', 'Image removed.');
    }

    public function setCover(GalleryImage $image)
    {
        // Unset all covers in this gallery
        GalleryImage::where('gallery_id', $image->gallery_id)->update(['is_cover' => false]);
        $image->update(['is_cover' => true]);

        return back()->with('success', 'Cover image updated.');
    }
}
