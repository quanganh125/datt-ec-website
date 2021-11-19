<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ShopController;
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

Route::group(['middleware' => 'api','prefix' => 'auth'], function ($router) {
  Route::post('/login', [AuthController::class, 'login']);
  Route::post('/register', [AuthController::class, 'register']);
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::post('/refresh', [AuthController::class, 'refresh']);
  Route::get('/user-profile', [AuthController::class, 'userProfile']); 
  Route::post('/change-pass', [AuthController::class, 'changePassWord']);   
});

Route::group(['middleware' => 'api'], function ($router) {  
  Route::get('/products', [ProductController::class, 'index']);  
});

Route::group(['prefix' => 'shop'], function ($router) {
  Route::get('/', [ShopController::class, 'index']);
  Route::post('/', [ShopController::class, 'store']);
  Route::get('/{id}', [ShopController::class, 'show']);
  Route::post('/{id}/edit', [ShopController::class, 'update']);
  Route::post('/{id}/delete', [ShopController::class, 'delete']);
});