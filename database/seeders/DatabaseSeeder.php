<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            UserTableSeeder::class,
            CategorySeeder::class,
            EventSeeder::class,
            CouponSeeder::class,
            // ShopSeeder::class,
            // ProductSeeder::class,
            // ReviewSeeder::class,
        ]);
    }
}
