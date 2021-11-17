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
        for ($i = 0; $i < 100; $i++) {
            DB::table('reviews')->insert([
                'comment' => Str::random(100),
                'rating' => random_int(1,10),
                'user_id' => 1,
                'product_id' => random_int(1,50)
            ]);
        }
    }
}
