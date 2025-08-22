<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookCategory extends Model
{
    use HasFactory;

    // Nama tabel (karena default Laravel menganggap "book_categories")
    protected $table = 'book_category';

    protected $fillable = [
        'book_id',
        'category_id',
    ];

    // Relasi ke Book
    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    // Relasi ke Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
