<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReviewResource;
use App\Http\Resources\ReviewCollection;
use Illuminate\Http\Request;
use App\Models\Review;
use App\Services\ReviewService;
use Validator;
use Illuminate\Support\Facades\Auth;
class ReviewController extends Controller
{
    protected $reviewService;

    public function __construct(ReviewService $reviewService)
    {
        $this->reviewService = $reviewService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->reviewService->getAll();
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
        $validator = Validator::make($request->all(), [
            'comment' => 'bail|required|string|max:255',
            'rating' => 'bail|required|numeric',
            'product_id' => 'bail|required|numeric'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }

        $user_id = Auth::user()->id;
        $review = new Review();
        $review->comment = $request->input('comment');
        $review->rating = $request->input('rating');
        $review->product_id = $request->input('product_id');
        $review->user_id = $user_id;

        $review->save();
        return (new ReviewResource($review))->response();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showAllReviewForProduct($product_id)
    {
        return $this->reviewService->getReviewForProduct($product_id);
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
    public function update(Request $request, $id)
    {
        
        $validator = Validator::make($request->all(), [
            'comment' => 'bail|required|string|max:255',
            'rating' => 'bail|required|numeric',
            'user_id' => 'bail|required|numeric',
            'product_id' => 'bail|required|numeric'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());       
        }
        
        $input = $request->all();
        return $this->reviewService->update($id, $input);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        return  $this->reviewService->delete($id);
    }
}
