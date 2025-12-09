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
        Schema::create('saldokeluar', function (Blueprint $table) {
            $table->uuid('idsaldokeluar')->primary();
            $table->uuid('idguru')->unique();
            $table->float('jumlahsaldokeluar');
            $table->date('tglsaldokeluar');
            $table->timestamps();

            
               $table->foreign('idguru', 'fk_saldokeluar_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

          Schema::table('saldomasuk', function (Blueprint $table) {
            $table->dropForeign('fk_saldokeluar_idguru');
        });



        Schema::dropIfExists('saldokeluar');
    }
};
