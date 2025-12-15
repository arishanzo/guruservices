<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class PermintaanPenarikan extends Model
{
   
    use HasFactory;

      
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'permintaanpenarikan';
     protected $primaryKey = 'idpermintaanpenarikan';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

       public function Profil_guru()
        {
            return $this->belongsTo(ProfilGuru::class, 'idprofilguru'); // Relasi Many-to-One
        }

    protected $fillable = [   
        'idprofilguru',
        'tglpermintaanpenarikan',
        'jumlahpenarikan',
        'statuspermintaan',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idpermintaanpenarikan = (string) Str::uuid();
        });
    }
}
