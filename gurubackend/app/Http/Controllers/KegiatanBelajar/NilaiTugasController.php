<?php

namespace App\Http\Controllers\KegiatanBelajar;

use App\Http\Controllers\Controller;
use App\Http\Requests\NilaiTugasRequest;
use App\Http\Requests\TugasBelajarRequest;
use App\Models\NilaiTugas;
use App\Models\TugasBelajar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class NilaiTugasController extends Controller
{
  
       public function getByID ($idguru) {

        $TugasBelajar = Cache::remember("nilaitugas_$idguru", now()->addMinutes(60), function() use($idguru) {
            return NilaiTugas::with('User_Guru')->where('idguru', $idguru)->get();
        });


        return response()->json([
            'data' => $TugasBelajar,
            'message' => $TugasBelajar ? 'Ada' : 'Tidak Ada'
        ]);

    }


    public function store (NilaiTugasRequest $request) {

        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

       
       
        try {
           
                $result = NilaiTugas::create($data);
        
        
                Cache::forget("nilaitugas_" . $user->idguru);

            return response()->json([
                'message' => 'Tugas Belajar Berhasil Disimpan',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan Tugas Belajar',
                'error' => $e->getMessage()
            ], 500);
        }
    }  


    
}
