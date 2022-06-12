<?php
namespace App\Services;

use App\Models\Review;

class ReviewService
{
    /**
     * Get's a Review by it's ID
     *
     * @param int
     * @return collection
     */
    public function get($id)
    {
        return Review::find($id);
    }

    /**
     * Get's all Review.
     *
     * @return mixed
     */
    public function getAll()
    {
        return Review::all();
    }

    public function find($id)
    {
        return Review::find($id);
    }

    public function getReviewForProduct($product_id)
    {
        $reviews = Review::where('product_id', $product_id)->get();
        return $reviews;
    }

    public function update($id, array $review_data){
        $review = Review::findOrFail($id);
        $review->fill($review_data)->save();
        return $review;
    }

    /**
     * Deletes a Review.
     *
     * @param int
     */
    public function delete($id)
    {
        $review = Review::destroy($id);
        return response()->json($review);
    }
}