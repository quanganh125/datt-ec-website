<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $user = \App\Models\User::create([
            'name' => 'admin',
            'email' => 'admin@email.com',
            'password' => bcrypt('admin'),
            'role' => 1
        ]);
    }
}
