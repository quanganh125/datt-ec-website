<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Shop;
use App\Http\Resources\ShopResource;
use App\Http\Resources\ShopCollection;
use App\Services\ShopService;
use App\Services\UserService;
use Validator;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    protected $shopService;
    protected $userService;

    public function __construct(ShopService $shopService, UserService $userService)
    {
        $this->shopService = $shopService;
        $this->userService = $userService;
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
            'logo' => 'bail|string',
            'url' => 'bail|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }
        // $user_id = auth()->user()->id;
        $user_id = Auth::user()->id;

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
            'logo' => 'bail|string',
            'url' => 'bail|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $input = $request->all();
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

    public function getShopOfUser($user_id){
        // dd($this->shopService->getIdShop($user_id));
        return $this->shopService->getIdShop($user_id);
    }
}
