<?php
namespace App\Services;

use App\Models\Coupon;

class CouponService
{
    public function get($id)
    {
        $coupon = Coupon::find($id);
        return $coupon;
    }

    public function getAll()
    {
        return Coupon::all();
    }

    public function getAllOfEvent($event_id)
    {
        $coupons = Coupon::where("event_id", "=", $event_id)->get();
        return $coupons;
    }

    public function update($id, array $coupon_data)
    {
        $coupon = Coupon::findOrFail($id);
        $coupon->fill($coupon_data)->save();
        return $coupon;
    }

    public function delete($coupon_id)
    {
        $coupon = Coupon::destroy($coupon_id);
        return response()->json($coupon_id);
    }

    public function getDiscount($code)
    {
        $coupon = Coupon::where("code", "=", $code)->get();
        return $coupon;
    }
}
