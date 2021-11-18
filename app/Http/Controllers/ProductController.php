<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;

class ProductController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function index() {
        $first_product_reviews = Product::find(1)->reviews;
        return $first_product_reviews;
    }
}
