<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'eth_address' => '0x7bDf331AdC423e2C0948406a7C9c37356fC65C4d'
        ]);

        User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@example.com',
            'eth_address' => '0xC1add5C3E2983C32467a7F202DA6f21e10C6dA4b'
        ]);

        DB::table('bloaks')->insert([
            [
                'name' => 'Independence DEV',
                'url' => 'independence-dev',
                'user_id' => 1,
                'links' => json_encode(["https://www.youtube.com/c/IndependenceDEV", "https://www.facebook.com/independencedev", "https://twitter.com/geof_dev", "https://www.instagram.com/independencedev", "https://www.tiktok.com/@independencedev", "https://www.threads.net/@independencedev"])
            ]
        ]);

        DB::table('posts')->insert([
            [
                'title' => 'Post 1',
                'slug' => 'post-1',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'type' => 'public',
                'active' => true,
                'bloak_id' => 1
            ]
        ]);

        DB::table('posts')->insert([
            [
                'title' => 'Post 2',
                'slug' => 'post-2',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'type' => 'private',
                'active' => true,
                'bloak_id' => 1
            ]
        ]);

        DB::table('posts')->insert([
            [
                'title' => 'Post 3',
                'slug' => 'post-3',
                'content' => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                'type' => 'public',
                'active' => true,
                'bloak_id' => 1
            ]
        ]);

        DB::table('subs')->insert([
            [
                'user_id' => 2,
                'bloak_id' => 1
            ]
        ]);

    }
}
