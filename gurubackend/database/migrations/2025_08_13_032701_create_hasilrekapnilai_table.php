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
        Schema::create('hasilrekapnilai', function (Blueprint $table) {
            $table->uuid('idhasilrekapnilai')->primary();
            $table->uuid('idbookingprivate');
            $table->uuid('idguru');
            $table->integer('toalnilai')->nullable();
          $table->text('catatan')->nullable();
            $table->timestamps();

           
             $table->foreign('idguru', 'fk_hasilrekapnilai_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

             $table->index('idbookingprivate', 'index_hasilrekapnilai_idbookingprivate');
        });

           DB::statement('
            ALTER TABLE `gurugopintar_db`.`hasilrekapnilai`
            ADD CONSTRAINT `fk_hasilrekapnilai_idbookingprivate`
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
            ALTER TABLE `gurugopintar_db`.`hasilrekapnilai`
            DROP FOREIGN KEY `fk_hasilrekapnilai_idbookingprivate`
        ');

        Schema::table('hasilrepkapnilai', function (Blueprint $table) {
            $table->dropForeign('fk_hasilrekapnilai_idguru');
            $table->dropIndex('idx_hasilrekapnilai_idbookingprivate');

        });

        Schema::dropIfExists('hasilrekapnilai');
    }
};
