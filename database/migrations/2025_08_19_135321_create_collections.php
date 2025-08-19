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
        Schema::create('collections', function (Blueprint $table) {
            $table->id();
            // Primary key auto increment (id)

            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel users (user yang menyimpan buku),
            // jika user dihapus maka koleksi ikut terhapus

            $table->foreignId('book_id')->constrained()->onDelete('cascade');
            // Relasi ke tabel books (buku yang disimpan ke koleksi),
            // jika buku dihapus maka koleksi ikut terhapus

            $table->timestamps();
            // Kolom created_at & updated_at otomatis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('collections');
        // Menghapus tabel jika rollback migration
    }
};
