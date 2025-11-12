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
        Schema::create('tugasbelajar', function (Blueprint $table) {
            $table->uuid('idtugasbelajar')->primary();
            $table->uuid('idbookingprivate');
            $table->uuid('idguru');
            $table->string('namatugas')->nullable();
            $table->text('deskripsitugas')->nullable();
            $table->date('tanggaltugas')->nullable();
            $table->string('filetugas')->nullable();
            $table->enum('statustugas', ['selesai', 'belum selesai'])->default('belum selesai');
            $table->string('catatantugas')->nullable();
            $table->date('tgldeadlinetugas')->nullable();
            $table->timestamps();

            
          
    
          $table->foreign('idguru', 'fk_tugasbelajar_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

             $table->index('idbookingprivate', 'index_tugasbelajar_idbookingprivate');
        });

         DB::statement('
            ALTER TABLE `gurugopintar_db`.`tugasbelajar`
            ADD CONSTRAINT `fk_tugasbelajar_idbookingprivate`
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
            ALTER TABLE `gurugopintar_db`.`tugasbelajar`
            DROP FOREIGN KEY `fk_tugasbelajar_idbookingprivate`
        ');

        Schema::table('tugasbelajar', function (Blueprint $table) {
            $table->dropForeign('fk_tugasbelajar_idguru');
            $table->dropIndex('idx_tugasbelajar_idbookingprivate');
        });

        Schema::dropIfExists('tugasbelajar');
    }
};
