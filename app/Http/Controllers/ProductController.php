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

    public function bestsale()
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
            'description' => 'bail|required|string',
            'stock' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'discount' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user_id = Auth::user()->id;
        $shop_id = $this->shopService->getIdShop($user_id);
        //endcode base64 image
        // $image_link_endcode = $this->productService->saveImgBase64($request->input('image_link'), 'product_img');
        // dd($request);

        $product = new Product();
        $product->name = $request->input('name');
        $product->category_id = $request->input('category_id');
        $product->image_link = $request->input('image_link');
        $product->price = $request->input('price');
        $product->description = $request->input('description');
        $product->stock = $request->input('stock');
        $product->discount = $request->input('discount');
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
        // dd($product);
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
            'description' => 'bail|string',
            'stock' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
            'discount' => 'bail|required|regex:/^\d+(\.\d{1,2})?$/',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $input = $request->all();
        // $image_link_endcode = $this->productService->saveImgBase64($input["image_link"], 'product_img');
        // $input["image_link"] = $image_link_endcode;
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
