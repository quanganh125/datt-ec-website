<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'banner_url',
        'icon_url',
        'description',
        'start_time',
        'end_time',
    ];

    public function coupons()
    {
        return $this->hasMany(Coupon::class);
    }
}
