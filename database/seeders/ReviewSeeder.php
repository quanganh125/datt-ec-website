<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 150; $i++) {
            $timestamp = rand( strtotime("Jan 01 2020"), strtotime("Nov 01 2022") );
            $random_Date = date("Y-m-d H:i:s", $timestamp );
            DB::table('reviews')->insert([
                'comment' => Str::random(100),
                'rating' => random_int(1, 5),
                'user_id' => 1,
                'product_id' => random_int(1, 25),
                'created_at' => $random_Date,
                'updated_at' => $random_Date,
            ]);
        }
    }
}
