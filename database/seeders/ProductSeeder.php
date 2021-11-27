<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 25; $i++) {
            $timestamp = rand( strtotime("Jan 01 2018"), strtotime("Nov 01 2021") );
            $random_Date = date("Y-m-d H:i:s", $timestamp );
            DB::table('products')->insert([
                'name' => Str::random(10),
                'price' => rand(100, 100000),
                'description' => Str::random(100),
                'category_id' => random_int(1, 5),
                'shop_id' => 1,
                'created_at' => $random_Date,
                'updated_at' => $random_Date,
            ]);
        }
    }
}
