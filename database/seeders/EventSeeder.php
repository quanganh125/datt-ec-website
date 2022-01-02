<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('events')->insert([
            'name' => '2022年・正月イベント',
            'description' => '初日の出や初詣、餅つき大会といった正月ならではのイベントに加え、レジャー施設の新春イベント、ミュージアムの展覧会など、元日から1月3日に開催するベントをセレクト。福袋、バーゲンの情報も紹介。',
            'banner_url' => 'shougatsu_banner.jpg',
            'icon_url' => 'shougatsu_icon_url.PNG',
            'start_time' => date("Y-m-d H:i:s", strtotime("Jan 01 2022")),
            'end_time' => date("Y-m-d H:i:s", strtotime("Jan 20 2022")),
            'created_at' => date("Y-m-d H:i:s", strtotime("Jan 01 2022")),
            'updated_at' => date("Y-m-d H:i:s", strtotime("Jan 01 2022")),
        ]);
    }
}
