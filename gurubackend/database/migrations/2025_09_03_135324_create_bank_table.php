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
        Schema::create('bank', function (Blueprint $table) {
            $table->uuid('idbank')->primary();
            $table->uuid('idguru')->unique();
            $table->string('nama_bank');
            $table->string('norekening');
            $table->string('pemilikrekening');
            $table->timestamps();

               $table->foreign('idguru', 'fk_bank2_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
           Schema::table('bank', function (Blueprint $table) {
            $table->dropForeign('fk_bank2_idguru');
        });

        Schema::dropIfExists('bank');
    }
};
