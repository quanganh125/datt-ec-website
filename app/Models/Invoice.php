<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'coupon_id',
        'discount_at_purchase_time',
        'price_at_purchase_time',
        'quantity',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function coupon()
    {
        return $this->hasOne(Coupon::class);
    }
}
