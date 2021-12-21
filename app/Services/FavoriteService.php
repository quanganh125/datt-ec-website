<?php
namespace App\Services;

use App\Models\Favorite;
class FavoriteService
{
    public function get($id)
    {
        $favorite = Favorite::find($id);
        return $favorite;
    }

    public function getAll()
    {
        return Favorite::all();
    }

    public function update($id, array $favorite_data)
    {
        $favorite = Favorite::findOrFail($id);
        $favorite->fill($favorite_data)->save();
        return $favorite;
    }

    public function delete($id)
    {
        $favorite = Favorite::destroy($id);
        return response()->json($id);
    }

    public function getIdFollowProductId ($product_id){
        
    }

}
