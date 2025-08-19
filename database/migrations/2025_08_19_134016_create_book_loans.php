<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('book_loans', function (Blueprint $table) {
            $table->id(); 
            // Kolom id primary key auto increment

            $table->foreignId('user_id')->constrained()->onDelete('cascade'); 
            // Relasi ke tabel users (kolom id), jika user dihapus maka pinjaman ikut terhapus

            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel books (kolom id), jika buku dihapus maka pinjaman ikut terhapus

            $table->date('date_loan');
            // Tanggal buku dipinjam

            $table->date('date_return')->nullable();
            // Tanggal buku dikembalikan (boleh kosong/null jika belum dikembalikan)

            $table->enum('state', ['dipinjam', 'dikembalikan', 'terlambat'])->default('dipinjam');
            // Status pinjaman: dipinjam, dikembalikan, atau terlambat
            // Default = "dipinjam"

            $table->timestamps();
            // created_at & updated_at otomatis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_loans');
        // Menghapus tabel jika rollback migration
    }
};
