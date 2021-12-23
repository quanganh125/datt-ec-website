<?php

namespace App\Http\Controllers;

use App\Http\Resources\ShopCollection;
use App\Http\Resources\ShopResource;
use App\Models\Shop;
use App\Services\ProductService;
use App\Services\ShopService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;

class ShopController extends Controller
{
    protected $shopService;
    protected $userService;
    protected $productService;

    public function __construct(ShopService $shopService, UserService $userService, ProductService $productService)
    {
        $this->shopService = $shopService;
        $this->userService = $userService;
        $this->productService = $productService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $shops = $this->shopService->getAll();
        return (new ShopCollection($shops))->response();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
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
            'address' => 'bail|required|string|max:255',
            'logo' => 'bail|required|string',
            'url' => 'bail|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }
        $user_id = Auth::user()->id;
        // $logo_storage = $this->productService->saveImgBase64($request->input('logo'), 'product_img');

        $shop = new Shop();
        $shop->name = $request->input('name');
        $shop->address = $request->input('address');
        $shop->logo = $request->input('logo');
        $shop->url = $request->input('url');
        $shop->user_id = $user_id;
        $shop->save();
        return (new ShopResource($shop))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $shop = $this->shopService->get($id);
        return (new ShopResource($shop))->response();
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
            'address' => 'bail|required|string|max:255',
            'logo' => 'bail|required|string',
            'url' => 'bail|required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $input = $request->all();
        // $logo_storage = $this->productService->saveImgBase64($request->input('logo'), 'product_img');
        // $input["logo"] = $logo_storage;
        $shop = $this->shopService->update($id, $input);
        return (new ShopResource($shop))->response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function delete($id)
    {
        $shop = $this->shopService->delete($id);
    }

    public function getShopOfUser()
    {
        return $this->shopService->getIdShop();
    }
}
