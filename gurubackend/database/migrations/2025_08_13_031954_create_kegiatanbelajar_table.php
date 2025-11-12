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
        Schema::create('kegiatanbelajar', function (Blueprint $table) {
            $table->uuid('idkegiatanbelajar')->primary();
            $table->uuid('idbookingprivate');
            $table->uuid('idguru');
            $table->string('fotokegiatan')->nullable();
            $table->string('videokegiatan')->nullable();
            $table->string('linkmateri')->nullable();
            $table->string('namakegiatan')->nullable();
            $table->text('deskripsikegiatan')->nullable();
            $table->date('tglkegiatan')->nullable();
            $table->timestamps();

            
            $table->foreign('idguru', 'fk_tb_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

             $table->index('idbookingprivate', 'index_tb_idbookingprivate');
        });

           DB::statement('
            ALTER TABLE `gurugopintar_db`.`kegiatanbelajar`
            ADD CONSTRAINT `fk_tb_idbookingprivate`
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
            ALTER TABLE `gurugopintar_db`.`kegiatanbelajar`
            DROP FOREIGN KEY `fk_tb_idbookingprivate`
        ');

        Schema::table('kegiatanbelajar', function (Blueprint $table) {
            $table->dropForeign('fk_tb_idguru');
            $table->dropIndex('idx_tb_idbookingprivate');
        });


        Schema::dropIfExists('kegiatanbelajar');
    }
};
