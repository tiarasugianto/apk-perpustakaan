<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    // Nama tabel
    protected $table = 'reviews';

    // Kolom yang bisa diisi
    protected $fillable = [
        'user_id',
        'book_id',
        'review',
        'rating',
    ];

    /**
     * Relasi ke User
     * Review dimiliki oleh seorang user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke Book
     * Review terkait dengan satu buku
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
