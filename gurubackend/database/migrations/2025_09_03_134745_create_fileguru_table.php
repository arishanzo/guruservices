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
        Schema::create('fileguru', function (Blueprint $table) {
             $table->uuid('idfileguru')->primary();
            $table->uuid('idguru')->unique();
            $table->string('file_cv');
            $table->string('file_ijazah');
            $table->string('file_sertifikat');
            $table->string('file_portofolio');
            $table->timestamps();

                $table->foreign('idguru', 'fk_fileguru_idguru')
                  ->references('idguru')->on('userguru')
                  ->onDelete('cascade');
        });

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {

          
        Schema::table('fileguru', function (Blueprint $table) {
            $table->dropForeign('fk_fileguru_idguru');
        });

        

        Schema::dropIfExists('fileguru');
    }
};
