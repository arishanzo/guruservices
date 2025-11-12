<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Support\Str;

class FileGuru extends Model
{
    use HasFactory;

    
          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'fileguru';
     protected $primaryKey = 'idfileguru';
       public $incrementing = false; // jika auto increment
    protected $keyType = 'string'; // tipe primary key

      public function User_guru()
        {
            return $this->belongsTo(UserGuru::class, 'idguru'); // Relasi Many-to-One
        }
    protected $fillable = [
        'idguru',   
        'file_cv',
        'file_ijazah',
        'file_sertifikat',
        'file_portofolio',
    ];

           protected static function booted()
    {
        static::creating(function ($model) {
            $model->idfileguru = (string) Str::uuid();
        });
    }
}
