<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
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
        for ($i = 0; $i < 50; $i++) {
            DB::table('products')->insert([
                'name' => Str::random(10),
                'price' => rand(100,100000),
                'description' => Str::random(100),
                'category_id' => random_int(1,5)
            ]);
        }
    }
}
