<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\FavoriteService;
use App\Models\Favorite;
use App\Http\Resources\FavoriteCollection;
use App\Http\Resources\FavoriteResource;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    protected $favoriteService;

    public function __construct(FavoriteService $favoriteService)
    {
        $this->favoriteService = $favoriteService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $favortites = $this->favoriteService->getAll();
        return (new FavoriteCollection($favortites))->response();
    }

    public function favoriteOfUser()
    {
        $favortites = $this->favoriteService->getAllOfUser();
        return (new FavoriteCollection($favortites))->response();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(){
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user_id = Auth::user()->id;
        $favorite = new Favorite();
        $favorite->user_id = $user_id;
        $favorite->product_id = $request->input('product_id');
        $favorite->save();
        return (new FavoriteResource($favorite))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id){
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($product_id)
    {
        return $this->favoriteService->delete($product_id);
    }
}
