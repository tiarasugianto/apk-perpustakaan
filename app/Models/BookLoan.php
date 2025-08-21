<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookLoan extends Model
{
    use HasFactory;

    // Nama tabel 
    protected $table = 'book_loans';

    // Kolom yang boleh diisi (mass assignment)
    protected $fillable = [
        'user_id',
        'book_id',
        'date_loan',
        'date_return',
        'state',
    ];

    /**
     * Relasi ke model User
     * Satu pinjaman hanya dimiliki oleh satu user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi ke model Book
     * Satu pinjaman hanya terkait dengan satu buku
     */
    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
