<?php
namespace App\Services;

use App\Models\Shop;
use App\Models\User;
class ShopService
{
    /**
     * Get's a Shop by it's ID
     *
     * @param int
     * @return collection
     */
    public function get($id)
    {
        return Shop::find($id);
    }

    /**
     * Get's all Shops.
     *
     * @return mixed
     */
    public function getAll()
    {
        return Shop::all();
    }

    public function find($id)
    {
        return Shop::find($id);
    }

    public function getIdShop($user_id){
        $shop_id = User::find($user_id)->shops()->get()->pluck('id')->first();
        return $shop_id;
    }

    public function update($id, array $shop_data){
        $shop = tap(Shop::where('id', $id))->update($shop_data)->first();
        return $shop;
    }

    /**
     * Deletes a Shop.
     *
     * @param int
     */
    public function delete($id)
    {
        $shop = Shop::destroy($id);
        return response()->json($id);
    }
}