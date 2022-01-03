<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CouponService;
use App\Models\Coupon;
use App\Http\Resources\CouponCollection;
use App\Http\Resources\CouponResource;

class CouponController extends Controller
{
    protected $couponService;

    public function __construct(CouponService $couponService)
    {
        $this->couponService = $couponService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $coupons = $this->couponService->getAll();
        return (new CouponCollection($coupons))->response();
    }

    public function couponOfEvent($id)
    {
        $coupons = $this->couponService->getAllOfEvent($id);
        return (new CouponCollection($coupons))->response();
    }

    public function getDiscount($code)
    {
        $coupon = $this->couponService->getDiscount($code);
        return $coupon;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $coupon = new Coupon();
        $coupon->id = $request->input('id');
        $coupon->code = $request->input('code');
        $coupon->discount = $request->input('discount');
        $coupon->event_id = $request->input('event_id');
        $coupon->save();
        return (new CouponResource($coupon))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $coupon = $this->couponService->update($id, $input);
        return (new CouponResource($coupon))->response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return $this->couponService->delete($id);
    }
}
