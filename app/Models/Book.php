<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    // Tabel yang dipakai (opsional, default = "books")
    protected $table = 'books';

    // Kolom yang boleh diisi secara mass assignment (create, update)
    protected $fillable = [
        'title',
        'author',
        'publisher',
        'year',
    ];

    /**
     * Relasi ke Reviews
     * Satu buku bisa punya banyak ulasan
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Relasi ke Collections
     * Satu buku bisa dikoleksi banyak user
     */
    public function collections()
    {
        return $this->hasMany(Collection::class);
    }

    /**
     * Relasi Many-to-Many dengan Categories
     * Satu buku bisa masuk ke banyak kategori
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'book_category');
    }

    /**
     * Relasi ke BookLoans
     * Satu buku bisa dipinjam berkali-kali
     */
    public function loans()
    {
        return $this->hasMany(BookLoan::class);
    }
}
