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
        Schema::create('nilaitugas', function (Blueprint $table) {
            $table->uuid('idnilaitugas')->primary();
            $table->uuid('idtugasbelajar');
            $table->uuid('idbookingprivate');
            $table->uuid('idguru');
            $table->integer('nilaitugas')->nullable();
            $table->timestamps();


            
              $table->foreign('idtugasbelajar', 'fk_nilaitugas_tugasbelajar')
                  ->references('idtugasbelajar')->on('tugasbelajar')
                  ->onDelete('cascade');

           
             $table->foreign('idguru', 'fk_nilaitugas_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');


             $table->index('idbookingprivate', 'index_tb_idbookingprivate');
           
        });

         DB::statement('
            ALTER TABLE `gurugopintar_db`.`nilaitugas`
            ADD CONSTRAINT `fk_nilaitugas_idbookingprivate`
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
            ALTER TABLE `gurugopintar_db`.`nilaitugas`
            DROP FOREIGN KEY `fk_nilaitugas_idbookingprivate`
        ');

        Schema::table('nilaitugas', function (Blueprint $table) {
            $table->dropForeign('fk_nilaitugas_idguru');
            $table->dropIndex('idx_nilaitugas_idbookingprivate');
            $table->dropForeign('fk_nilaitugas_tugasbelajar');

        });

        Schema::dropIfExists('nilaitugas');
    }
};
