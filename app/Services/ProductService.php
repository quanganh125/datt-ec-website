<?php
namespace App\Services;

use App\Models\Product;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

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
        return Product::all();
    }

    public function getVisibleProducts()
    {
        if (Auth::user()) {
            $user = Auth::user()->id;
            $shop_id = User::find($user)->shops()->get()->pluck('id')->first();
            return Product::where('stock', '>', 0)
                ->where('shop_id', '!=', $shop_id)
                ->get();
        } else {
            return Product::all();
        }
    }

    public function getBestSale()
    {
        return Product::join('invoices', 'products.id', '=', 'invoices.product_id')
            ->select('products.*', \DB::raw('SUM(quantity) as quantity'))
            ->groupBy('products.id')
            ->orderBy('quantity', 'desc')
            ->take(4)
            ->get(['products.*']);
    }

    public function getBestSaleCategory()
    {
        $user_id = Auth::user()->id;
        $shop_id = User::find($user_id)->shops()->get()->pluck('id')->first();
        return Invoice::where('user_id', '=', $user_id)
            ->get(['category_id'])->toArray();
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

    public function getCount()
    {
        return Product::count();
    }

    public function saveImgBase64($param, $folder)
    {
        list($extension, $content) = explode(';', $param);
        $tmpExtension = explode('/', $extension);
        preg_match('/.([0-9]+) /', microtime(), $m);
        $fileName = sprintf('img%s%s.%s', date('YmdHis'), $m[1], $tmpExtension[1]);
        $content = explode(',', $content)[1];
        $storage = Storage::disk('public');

        $checkDirectory = $storage->exists($folder);

        if (!$checkDirectory) {
            $storage->makeDirectory($folder);
        }

        $storage->put($folder . '/' . $fileName, base64_decode($content), 'public');

        $path = Storage::url($fileName);
        return $fileName;
    }

    public function updateOne($id, $feild, $value)
    {
        Product::where('id', $id)->update(array($feild => $value));
    }

}
