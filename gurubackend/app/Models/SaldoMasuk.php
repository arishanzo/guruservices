<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use Illuminate\Support\Str;

class SaldoMasuk extends Model
{
    use HasFactory;

        
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'saldomasuk';
     protected $primaryKey = 'idsaldomasuk';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

     public function User_guru()
        {
            return $this->belongsTo(UserGuru::class, 'idguru'); // Relasi Many-to-One
     }


    protected $fillable = [
        'idguru',
        'idbookingprivate',   
        'jumlahsaldomasuk',
        'tglsaldomasuk',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idksaldomasuk = (string) Str::uuid();
        });
    }
}
