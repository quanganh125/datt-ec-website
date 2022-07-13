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
            ['id' => 1, 'name' => 'Lipstick'],
            ['id' => 2, 'name' => 'Powder Foundation'],
            ['id' => 3, 'name' => 'Hair dye'],
            ['id' => 4, 'name' => 'Eyeliner'],
        ];

        DB::table('categories')->insert($categories);
    }
}
