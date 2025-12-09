<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('saldomasuk', function (Blueprint $table) {
            $table->uuid('idsaldomasuk')->primary();
            $table->uuid('idguru')->unique();
            $table->uuid('idbookingprivate');
            $table->float('jumlahsaldomasuk');
            $table->date('tglsaldomasuk');
            $table->timestamps();

               $table->foreign('idguru', 'fk_saldomasuk_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

            $table->index('idbookingprivate', 'index_saldomasuk_idbookingprivate');
        });

           DB::statement('
            ALTER TABLE `gurugopintar_db`.`saldomasuk`
            ADD CONSTRAINT `fk_saldomasuk_idbookingprivate`
            FOREIGN KEY (`idbookingprivate`)
            REFERENCES `usrgopintar_db`.`booking` (`idbookingprivate`)
            ON DELETE CASCADE
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

          DB::statement('
            ALTER TABLE `gurugopintar_db`.`saldomasuk`
            DROP FOREIGN KEY `fk_saldomasuk_idbookingprivate`
        ');


         Schema::table('saldomasuk', function (Blueprint $table) {
            $table->dropForeign('fk_saldomasuk_idguru');
            $table->dropIndex('index_saldomasuk_idbookingprivate');
            $table->dropForeign('fk_saldomasuk_idbookingprivate');
        });


        Schema::dropIfExists('saldomasuk');
    }
};
