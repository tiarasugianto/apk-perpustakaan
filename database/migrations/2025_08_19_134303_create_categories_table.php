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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            // Primary key auto increment (id)

            $table->string('category', 255);
            // Nama kategori, tipe VARCHAR(255)

            $table->timestamps();
            // Kolom created_at & updated_at otomatis dibuat oleh Laravel
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
        // Hapus tabel categories jika rollback migration
    }
};
