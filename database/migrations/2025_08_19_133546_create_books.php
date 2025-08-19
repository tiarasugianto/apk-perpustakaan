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
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            // Kolom primary key auto increment (id)

            $table->string('title', 255);
            // Judul buku, tipe VARCHAR(255)

            $table->string('author', 255);
            // Penulis buku, tipe VARCHAR(255)

            $table->string('publisher', 255);
            // Penerbit buku, tipe VARCHAR(255)

            $table->integer('year');
            // Tahun terbit, tipe INT (default panjang 11 di MySQL)

            $table->timestamps();
            // Kolom created_at & updated_at otomatis
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
        // Hapus tabel books saat rollback
    }
};
