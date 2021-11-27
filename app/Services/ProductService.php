<?php
namespace App\Services;

use App\Models\Product;

class ProductService
{
    /**
     * Get's a Product by it's ID
     *
     * @param int
     * @return collection
     */
    public function get($id)
    {
        $product = Product::find($id);
        $product->reviews = $product->reviews->sortByDesc('created_at');
        return $product;
    }

    /**
     * Get's all Products.
     *
     * @return mixed
     */
    public function getAll()
    {
        return Product::paginate(8);
    }

    public function update($id, array $product_data)
    {
        $product = Product::findOrFail($id);
        $product->fill($product_data)->save();
        return $product;
    }

    /**
     * Deletes a Product.
     *
     * @param int
     */
    public function delete($id)
    {
        $product = Product::destroy($id);
        return response()->json($id);
    }

    public function addRecommendMark($products)
    {
        foreach ($products as $product) {
            $product->getRecommendMarkAttribute();
        }
    }

    public function getProductOfShop($shop_id)
    {
        $products = Product::where("shop_id", "=", $shop_id)->get();
        return $products;
    }

    public function getCount(){
        return Product::count();
    }
}
