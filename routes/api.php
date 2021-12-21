<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\HistoryController;
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
    Route::get('/count', [ProductController::class, 'getCountProduct']);
    Route::get('/recommend', [ProductController::class, 'recommend']);
    Route::get('/shop', [ProductController::class, 'getShopProducts']);
    Route::post('/', [ProductController::class, 'store']);
    Route::get('/{id}', [ProductController::class, 'show']);
    Route::post('/{id}/edit', [ProductController::class, 'update']);
    Route::post('/{id}/delete', [ProductController::class, 'destroy']);
});

Route::group(['prefix' => 'category'], function ($router) {
    Route::get('/', [CategoryController::class, 'index']);
    Route::post('/', [CategoryController::class, 'store']);
    Route::get('/{id}', [CategoryController::class, 'show']);
    Route::post('/{id}/edit', [CategoryController::class, 'update']);
    Route::post('/{id}/delete', [CategoryController::class, 'destroy']);
});

Route::group(['prefix' => 'shop'], function ($router) {
    Route::get('/', [ShopController::class, 'index']);
    Route::get('/user/{user_id}', [ShopController::class, 'getShopOfUser']);
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

Route::group(['prefix' => 'favorite'], function ($router) {
    Route::get('/', [FavoriteController::class, 'index']);
    Route::post('/', [FavoriteController::class, 'store']);
    Route::delete('/{id}', [FavoriteController::class, 'destroy']);
});

Route::group(['prefix' => 'history'], function ($router) {
    Route::get('/', [HistoryController::class, 'index']);
    Route::post('/', [HistoryController::class, 'store']);
    Route::delete('/{id}', [HistoryController::class, 'destroy']);
});

Route::group(['prefix' => 'storage'], function ($router) {
    Route::get('/{filename}', function ($filename) {
        $path = storage_path('app/public/product_img/' . $filename);

        if (!File::exists($path)) {
            abort(404);
        }

        $file = File::get($path);
        $type = File::mimeType($path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    });
});
