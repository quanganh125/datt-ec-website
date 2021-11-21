<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\ReviewController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
    Route::post('/change-pass', [AuthController::class, 'changePassWord']);
});

Route::group(['prefix' => 'product'], function ($router) {
    Route::get('/', [ProductController::class, 'index']);
    Route::get('/recommend', [ProductController::class, 'recommend']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/{id}/edit', [ProductController::class, 'update']);
    Route::post('/{id}/delete', [ProductController::class, 'destroy']);
});

Route::group(['prefix' => 'shop'], function ($router) {
  Route::get('/', [ShopController::class, 'index']);
  Route::post('/', [ShopController::class, 'store']);
  Route::get('/{id}', [ShopController::class, 'show']);
  Route::post('/{id}/edit', [ShopController::class, 'update']);
  Route::post('/{id}/delete', [ShopController::class, 'delete']);
});

Route::group(['prefix' => 'review'], function ($router) { 
  Route::get('/', [ReviewController::class, 'index']);
  Route::post('/', [ReviewController::class, 'store']);
  Route::get('/{product_id}', [ReviewController::class, 'showAllReviewForProduct']);
  Route::put('/{id}', [ReviewController::class, 'update']);
  Route::delete('/{id}', [ReviewController::class, 'destroy']);
});
