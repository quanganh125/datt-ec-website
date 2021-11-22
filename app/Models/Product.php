<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_link',
        'price',
        'description',
        'category_id',
    ];

    protected $appends = ['recommend_mark'];

    public $timestamps = true;

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function shop()
    {
        return $this->belongsTo(Shop::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    public function getRecommendMarkAttribute()
    {
        $review_count = $this->reviews->count();
        $rating_count = $this->reviews->sum('rating');
        /* CACH TINH DIEM RECOMMEND
        Moi review tang 1 diem recommend
        rating 1 sao -2
        rating 2 sao -1
        rating 3 sao 0
        rating 4 sao +1
        rating 5 sao +2
        => Tong diem
         */
        $recommend_mark = $rating_count - 2 * $review_count;
        return $recommend_mark;
    }
}
