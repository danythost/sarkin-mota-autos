<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GalleryImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'gallery_id',
        'image_path',
        'is_cover',
        'sort_order',
    ];

    protected $casts = [
        'is_cover' => 'boolean',
    ];

    protected $appends = ['url'];

    public function gallery()
    {
        return $this->belongsTo(Gallery::class);
    }

    public function getUrlAttribute()
    {
        return asset('storage/' . $this->image_path);
    }
}
