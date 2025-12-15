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
            $table->uuid('idprofilguru');
            $table->date('tglpermintaanpenarikan');
            $table->integer('jumlahpenarikan');
            $table->string('statuspermintaan');
            $table->timestamps();

                  $table->foreign('idprofilguru', 'fk_permintaanpenarikan_idprofilguru')
                  ->references('idprofilguru')->on('profilguru')
                  ->onDelete('cascade');
        });


    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

         Schema::table('permintaanpenarikan', function (Blueprint $table) {
               $table->dropForeign('fk_permintaanpenarikan_idprofilguru');
        });

        Schema::dropIfExists('permintaanpenarikan');
    }
};
