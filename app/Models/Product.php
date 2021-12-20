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
        'stock',
        'discount',
        'description',
        'category_id',
        'shop_id',
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

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }

    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    public function getRecommendMarkAttribute()
    {
        $recommend_mark = 0;
        foreach ($this->reviews as $review) {
            switch ($review->rating) {
                case 1:
                    $recommend_mark -= 2;
                    break;
                case 2:
                    $recommend_mark += 0;
                    break;
                    break;
                case 3:
                    $recommend_mark += 1;
                    break;
                case 4:
                    $recommend_mark += 2;
                    break;
                default:
                    $recommend_mark += 3;
                    break;
            }
        }
        /* CACH TINH DIEM RECOMMEND
        Moi review tang 0.5 diem recommend
        rating 1 sao -2
        rating 2 sao 0
        rating 3 sao +1
        rating 4 sao +2
        rating 5 sao +3
        => Tong diem
         */
        $recommend_mark += ($this->reviews->count() / 2);
        return $recommend_mark;
    }
}
