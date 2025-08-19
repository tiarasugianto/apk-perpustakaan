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
        Schema::create('book_category', function (Blueprint $table) {
            $table->id();
            // Primary key auto increment (id)

            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel books (jika buku dihapus, otomatis hapus relasi)

            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel categories (jika kategori dihapus, otomatis hapus relasi)

            $table->timestamps();
            // Kolom created_at & updated_at otomatis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('book_category');
        // Menghapus tabel jika rollback migration
    }
};
