<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class TugasBelajar extends Model
{
   
    use HasFactory;

      
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'tugasbelajar';
     protected $primaryKey = 'idtugasbelajar';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

      public function User_guru()
        {
            return $this->belongsTo(UserGuru::class, 'idguru'); // Relasi Many-to-One
        }
        public function Nilai_tugas()
        {
            return $this->hasMany(NilaiTugas::class, 'idtugasbelajar', 'idtugasbelajar'); // Relasi One-to-One
        }
        
    protected $fillable = [
        'idbookingprivate',   
        'idguru',
        'namatugas',
        'deskripsitugas',
        'tanggaltugas',
        'filetugas',
        'statustugas',
        'catatantugas',
        'tgldeadlinetugas',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idtugasbelajar = (string) Str::uuid();
        });
    }
}
