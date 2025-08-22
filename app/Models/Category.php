<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    // nama tabel (opsional, karena default Laravel sudah "categories")
    protected $table = 'categories';

    // kolom yang boleh diisi (mass assignable)
    protected $fillable = [
        'category',
    ];
}
