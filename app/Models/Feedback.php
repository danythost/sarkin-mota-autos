<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Feedback extends Model
{
    protected $table = 'feedback';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'rating',
        'comment',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];
}
