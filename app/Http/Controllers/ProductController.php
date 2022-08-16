<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use App\Services\ShopService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Validator;

class ProductController extends Controller
{
    protected $productService;
    protected $shopService;

    public function __construct(ProductService $productService, ShopService $shopService)
    {
        $this->productService = $productService;
        $this->shopService = $shopService;
    }
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function index()
    {
        $products = $this->productService->getAll();
        return (new ProductCollection($products))->response();
    }

    public function recommend()
    {
        $products = $this->productService->getVisibleProducts();
        $this->productService->addRecommendMark($products);
        return (new ProductCollection($products->sortBy('recommend_mark')->reverse()))->response();
    }

    public function bestSale()
    {
        $products = $this->productService->getBestSale();
        return (new ProductCollection($products))->response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string|max:255',
            'image_link' => 'bail|string',
            'category_id' => 'bail|required|numeric',
            'price' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'description' => 'bail',
            'stock' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'discount' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'color_code' => 'bail|required|string',
            'expiry' => 'bail|required|string',
            'brand' => 'bail|required|string',
            'finish' => 'bail|required|string',
            'material' => 'bail|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user_id = Auth::user()->id;
        $shop_id = $this->shopService->getIdShop($user_id);

        $product = new Product();
        $product->name = $request->input('name');
        $product->category_id = $request->input('category_id');
        $product->image_link = $request->input('image_link');
        $product->price = $request->input('price');
        if ($request->has('description')) 
            $product->description = $request->input('description');
        $product->stock = $request->input('stock');
        $product->discount = $request->input('discount');
        $product->expiry = $request->input('expiry');
        $product->brand = $request->input('brand');
        $product->finish = $request->input('finish');
        $product->material = $request->input('material');
        $product->color_code = $request->input('color_code');
        $product->shop_id = $shop_id;

        $product->save();
        return (new ProductResource($product))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = $this->productService->get($id);
        $url_image = Storage::url($product["image_link"]);
        return (new ProductResource($product))->response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
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
        $validator = Validator::make($request->all(), [
            'name' => 'bail|required|string|max:255',
            'image_link' => 'bail|required|string',
            'category_id' => 'bail|required|numeric',
            'price' => 'bail|regex:/^\d+(\.\d{1,2})?$/',
            'description' => 'bail',
            'stock' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'discount' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'color_code' => 'bail|required|string',
            'expiry' => 'bail|required|string',
            'brand' => 'bail|required|string',
            'finish' => 'bail|required|string',
            'material' => 'bail|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $input = $request->all();
        $product = $this->productService->update($id, $input);
        return (new ProductResource($product))->response();
    }

    public function updateOne(Request $request, $id)
    {
        $feild = $request->input('feild');
        $value = $request->input('value');
        $updateOne = $this->productService->updateOne($id, $feild, $value);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = $this->productService->delete($id);
    }

    public function getShopProducts()
    {
        $user_id = Auth::user()->id;
        $shop_id = $this->shopService->getIdShop($user_id);
        $products = $this->productService->getProductOfShop($shop_id);
        return (new ProductCollection($products))->response();
    }

    public function getCountProduct()
    {
        return $this->productService->getCount();
    }
}
