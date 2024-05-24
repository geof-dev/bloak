<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Bloak extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'url'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function subs(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'subs')->using(Sub::class);
    }
}
