<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class KegiatanBelajar extends Model
{
    use HasFactory;

      
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'kegiatanbelajar';
     protected $primaryKey = 'idkegiatanbelajar';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

      public function User_guru()
        {
            return $this->belongsTo(UserGuru::class, 'idguru'); // Relasi Many-to-One
        }
    protected $fillable = [
        'idbookingprivate',   
        'idguru',
        'fotokegiatan',
        'videokegiatan',
        'linkmateri',
        'namakegiatan',
        'deskripsikegiatan',
        'tglkegiatan',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idkegiatanbelajar = (string) Str::uuid();
        });
    }
}
