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
        Schema::create('pengeluaran', function (Blueprint $table) {
            $table->uuid('idpengeluaran')->primary();
            $table->uuid('idguru');
            $table->string('deskripsi');
            $table->float('jumlah');
             $table->string('status')->default('pending');
            $table->date('tanggal'); // misalnya: pending, approved, rejected
            $table->timestamps();

            
               $table->foreign('idguru', 'fk_bank_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
           Schema::table('bank', function (Blueprint $table) {
            $table->dropForeign('fk_bank_idguru');
        });

        Schema::dropIfExists('pengeluaran');
    }
};
