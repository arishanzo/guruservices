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
        Schema::create('saldo', function (Blueprint $table) {
               $table->uuid('idsaldo')->primary();
            $table->uuid('idguru')->unique();
            $table->float('jumlahsaldo');
            $table->date('tanggal');
            $table->string('keterangan');
            $table->timestamps();

               $table->foreign('idguru', 'fk_saldo_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void

    
    {
         Schema::table('saldo', function (Blueprint $table) {
            $table->dropForeign('fk_saldo_idguru');
        });


        Schema::dropIfExists('saldo');
    }
};
