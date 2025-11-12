<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProfilGuru extends Model
{
    use HasFactory;

          /**
     * fillable
     *
     * @var array
     */
    protected $table = 'profilguru';
     protected $primaryKey = 'idprofilguru';
       public $incrementing = false; // UUID tidak auto increment
    protected $keyType = 'string'; // tipe primary key

      public function User_guru()
        {
            return $this->belongsTo(UserGuru::class, 'idguru'); // Relasi Many-to-One
        }
 

    protected $fillable = [
        'idguru',
        'foto_profil',
        'aboutguru',
        'alamatlengkap',
        'no_telp',
        'kelurahan',
        'kecamatan',    
        'kabupaten',
        'provinsi',
        'kode_pos',
        'lulusan',
        'fakultas',
        'universitas',
        'bidangngajar',
        'mapel',
        'skillpertama',
        'skillkedua',
        'skillketiga',
        'skillkeempat',
        'statusakun',
    ];

        protected static function booted()
    {
        static::creating(function ($model) {
            $model->idprofilguru = (string) Str::uuid();
        });
    }

   
public function files()
{
    return $this->hasOne(FileGuru::class, 'idguru', 'idguru');
}

public function bank()
{
    return $this->hasOne(Bank::class, 'idguru', 'idguru');
}


 protected $appends = ['profile_completion', 'profile_missing_fields'];


 
    public function getProfileCompletionAttribute()
    {
        $score = 0;
        $total = 0;

        // === BAGIAN 1: Profil Guru ===
        $bioFields = [
            'foto_profil'   => 'Foto Profil',
            'aboutguru'     => 'Tentang Guru',
            'alamatlengkap' => 'Alamat Lengkap',
            'no_telp'       => 'No. Telepon',
            'kelurahan'     => 'Kelurahan',
            'kecamatan'     => 'Kecamatan',
            'kabupaten'     => 'Kabupaten',
            'provinsi'      => 'Provinsi',
            'kode_pos'      => 'Kode Pos',
            'lulusan'       => 'Lulusan',
            'fakultas'      => 'Fakultas',
            'universitas'   => 'Universitas',
            'bidangngajar' =>  'bidangngajar',
            'mapel'         => 'Mata Pelajaran',
            'skillpertama'  => 'Skill Pertama',
            'skillkedua'    => 'Skill Kedua',
            'skillketiga'   => 'Skill Ketiga',
            'skillkeempat'  => 'Skill Keempat',
        ];

        $total += count($bioFields);
        foreach ($bioFields as $f => $label) {
            if (!empty($this->$f)) {
                $score++;
            }
        }

        // === BAGIAN 2: File Guru ===
        $file = $this->files;
        $fileFields = [
               'file_cv'         => 'File CV',
            'file_ijazah'     => 'File Ijazah',
            'file_sertifikat' => 'File Sertifikat',
            'file_portofolio' => 'File Portofolio',
        ];
        $total += count($fileFields);
        if ($file) {
            foreach ($fileFields as $f => $label) {
                if (!empty($file->$f)) {
                    $score++;
                }
            }
        }

        // === BAGIAN 3: Data Bank ===
        $bank = $this->bank;
        $bankFields = [
            'nama_bank'      => 'Nama Bank',
    'norekening'     => 'Nomor Rekening',
    'pemilikrekening'=> 'Pemilik Rekening',
        ];
        $total += count($bankFields);
        if ($bank) {
            foreach ($bankFields as $f => $label) {
                if (!empty($bank->$f)) {
                    $score++;
                }
            }
        }

        if ($total === 0) {
            return 0;
        }

        return round(($score / $total) * 100);
    }

    public function getProfileMissingFieldsAttribute()
    {
        $missing = [];

        $bioFields = [
            'foto_profil'   => 'Foto Profil',
            'aboutguru'     => 'Tentang Guru',
            'alamatlengkap' => 'Alamat Lengkap',
            'no_telp'       => 'No. Telepon',
            'kelurahan'     => 'Kelurahan',
            'kecamatan'     => 'Kecamatan',
            'kabupaten'     => 'Kabupaten',
            'provinsi'      => 'Provinsi',
            'kode_pos'      => 'Kode Pos',
            'lulusan'       => 'Lulusan',
            'fakultas'      => 'Fakultas',
            'universitas'   => 'Universitas',
            'mapel'         => 'Mata Pelajaran',
            'skillpertama'  => 'Skill Pertama',
            'skillkedua'    => 'Skill Kedua',
            'skillketiga'   => 'Skill Ketiga',
            'skillkeempat'  => 'Skill Keempat',
        ];
        foreach ($bioFields as $f => $label) {
            if (empty($this->$f)) {
                $missing[] = $label;
            }
        }

        $file = $this->files;
        $fileFields = [
              'file_cv'         => 'File CV',
    'file_ijazah'     => 'File Ijazah',
    'file_sertifikat' => 'File Sertifikat',
    'file_portofolio' => 'File Portofolio',
        ];
        foreach ($fileFields as $f => $label) {
            if (!$file || empty($file->$f)) {
                $missing[] = $label;
            }
        }

        $bank = $this->bank;
        $bankFields = [
            'nama_bank'   => 'Nama Bank',
            'no_rekening' => 'Nomor Rekening',
            'atas_nama'   => 'Atas Nama',
        ];
        foreach ($bankFields as $f => $label) {
            if (!$bank || empty($bank->$f)) {
                $missing[] = $label;
            }
        }

        return $missing;
    }

}


