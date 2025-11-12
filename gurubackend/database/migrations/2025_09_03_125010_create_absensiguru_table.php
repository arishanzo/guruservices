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
        Schema::create('absensiguru', function (Blueprint $table) {
            $table->uuid('idabsensiguru')->primary();
            $table->uuid('idguru');
            $table->uuid('idtglbooking');
            $table->date('tanggal');
            $table->string('sesi');
            $table->string('statusabsen');
            $table->timestamps();


             $table->foreign('idguru', 'fk_absensiguru_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

             
             $table->index('idtglbooking', 'index_absensiguru_idtglbooking');
        });

       

            DB::statement('
            ALTER TABLE `gurugopintar_db`.`absensiguru`
            ADD CONSTRAINT `fk_absensiguru_idtglbooking`
            FOREIGN KEY (`idtglbooking`)
            REFERENCES `usrgopintar_db`.`tglbooking` (`idtglbooking`)
            ON DELETE CASCADE
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void

    
    {

       

        DB::statement('
            ALTER TABLE `gurugopintar_db`.`absensiguru`
            DROP FOREIGN KEY `fk_absensiguru_idtglbooking`
        ');

        Schema::table('absensiguru', function (Blueprint $table) {
            $table->dropForeign('fk_absensiguru_idguru');
            $table->dropForeign('fk_absensiguru_idtglbooking');

        });

        Schema::dropIfExists('absensiguru');
    }
};
