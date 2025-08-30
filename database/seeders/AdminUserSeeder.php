<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => '2324343.tiara@smkn-2sbg.sch.id'], // cek kalau sudah ada, update
            [
                'name' => 'TiaraSugianto',
                'password' => Hash::make('Pass2324343!'),
            ]
        );
    }
}
