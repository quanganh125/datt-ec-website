<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CouponSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            $timestamp = rand(strtotime("Jan 01 2022"), strtotime("Nov 01 2023"));
            $random_Date = date("Y-m-d H:i:s", $timestamp);

            DB::table('coupons')->insert([
                'code' => strtoupper(Str::random(6)),
                'event_id' => 1,
                'discount' => rand(10, 20),
                'created_at' => $random_Date,
                'updated_at' => $random_Date,
            ]);
        }
    }
}
