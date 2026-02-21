<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Gallery extends Model
{
    use HasFactory;

    protected $appends = ['video_url'];

    protected $fillable = [
        'title',
        'slug',
        'category',
        'description',
        'event_date',
        'location',
        'is_featured',
        'video_path',
    ];

    protected $casts = [
        'event_date' => 'date',
        'is_featured' => 'boolean',
    ];

    // Auto-generate slug from title
    protected static function booted()
    {
        static::creating(function ($gallery) {
            if (empty($gallery->slug)) {
                $gallery->slug = Str::slug($gallery->title);
            }
        });
    }

    public function getVideoUrlAttribute(): ?string
    {
        if (!$this->video_path) {
            return null;
        }

        return Storage::disk('public')->url($this->video_path);
    }

    public function images()
    {
        return $this->hasMany(GalleryImage::class)->orderBy('sort_order');
    }

    public function coverImage()
    {
        return $this->hasOne(GalleryImage::class)->where('is_cover', true);
    }

    // Query Scopes
    public function scopeEvents($query)
    {
        return $query->where('category', 'event');
    }

    public function scopeShowroom($query)
    {
        return $query->where('category', 'showroom');
    }

    public function scopeDelivery($query)
    {
        return $query->where('category', 'delivery');
    }

    public function scopeSold($query)
    {
        return $query->where('category', 'sold');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }
}
