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
        Schema::create('profilguru', function (Blueprint $table) {
             $table->uuid('idprofilguru')->primary();
            $table->uuid('idguru')->unique();
            $table->string('foto_profil')->nullable();
             $table->string('aboutguru')->nullable();
            $table->string('alamatlengkap')->nullable();
            $table->string('no_telp')->nullable();
            $table->string('kelurahan')->nullable();
            $table->string('kecamatan')->nullable();
            $table->string('kabupaten')->nullable();
            $table->string('provinsi')->nullable();
            $table->string('kode_pos')->nullable();
            $table->string('lulusan')->nullable();
            $table->string('jurusan')->nullable();
            $table->string('fakultas')->nullable();
            $table->string('universitas')->nullable();
             $table->string('bidangngajar')->nullable();
            $table->string('mapel')->nullable();
            $table->string('skillpertama')->nullable();
            $table->string('skillkedua')->nullable();
            $table->string('skillketiga')->nullable();
            $table->string('skillkeempat')->nullable();
            $table->string('statusakun')->nullable();
            $table->timestamps();

             
             $table->foreign('idguru', 'fk_profilguru_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

        
        Schema::table('profilguru', function (Blueprint $table) {
            $table->dropForeign('fk_profilguru_idguru');
        });

        
        Schema::dropIfExists('profilguru');
    }
};
