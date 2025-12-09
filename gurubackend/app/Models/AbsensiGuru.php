<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class AbsensiGuru extends Model
{
    use HasFactory;

    
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'absensiguru';
     protected $primaryKey = 'idabsensiguru';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

      public function Profil_guru()
        {
            return $this->belongsTo(ProfilGuru::class, 'idprofilguru'); // Relasi Many-to-One
        }
    protected $fillable = [
        'idprofilguru', 
        'idtglbooking',  
        'tanggal',
        'sesi',
        'statusabsen',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idabsensiguru = (string) Str::uuid();
        });
    }
}
