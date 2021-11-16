<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->delete();

        $categories = [
            ['id' => 1, 'name' => 'Spring'],
            ['id' => 2, 'name' => 'Summer'],
            ['id' => 3, 'name' => 'Autumn'],
            ['id' => 4, 'name' => 'Winter'],
            ['id' => 5, 'name' => 'Whatever']
        ];

        DB::table('categories')->insert($categories);
    }
}
