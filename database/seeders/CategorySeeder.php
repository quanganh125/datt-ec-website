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
            ['id' => 1, 'name' => 'アウター'],
            ['id' => 2, 'name' => 'トップス'],
            ['id' => 3, 'name' => 'ボトムス'],
            ['id' => 4, 'name' => 'インナー・下着'],
            ['id' => 5, 'name' => 'スポーツユーティリティウェア'],
            ['id' => 6, 'name' => 'ルーム・ホーム'],
        ];

        DB::table('categories')->insert($categories);
    }
}
