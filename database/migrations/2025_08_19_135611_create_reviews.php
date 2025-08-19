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
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();
            // Primary key auto increment (id)

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel users (user yang memberi ulasan),
            // jika user dihapus maka ulasannya ikut terhapus

            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel books (buku yang diulas),
            // jika buku dihapus maka ulasan ikut terhapus

            $table->text('review')->nullable();
            // Isi ulasan (teks bebas), boleh kosong/null

            $table->integer('rating');
            // Rating buku (misalnya 1–5 bintang), tipe INT(11)

            $table->timestamps();
            // Kolom created_at & updated_at otomatis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviews');
        // Menghapus tabel reviews saat rollback migration
    }
};
