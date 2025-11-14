<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('permintaanpenarikan', function (Blueprint $table) {
            $table->ulid('idpermintaanpenarikan')->primary();
            $table->uuid('idguru');
            $table->date('tglpermintaanpenarikan');
            $table->integer('jumlahpenarikan');
            $table->string('statuspermintaan');
            $table->timestamps();

                  $table->foreign('idguru', 'fk_permintaanpenarikan_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

         Schema::table('permintaanpenarikan', function (Blueprint $table) {
               $table->dropForeign('fk_permintaanpenarikan_idguru');
        });

        Schema::dropIfExists('permintaanpenarikan');
    }
};
