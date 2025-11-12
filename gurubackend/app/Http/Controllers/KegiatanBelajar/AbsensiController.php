<?php

namespace App\Http\Controllers\KegiatanBelajar;

use App\Http\Controllers\Controller;
use App\Http\Requests\AbsensiGuruRequest;
use App\Models\AbsensiGuru;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;


class AbsensiController extends Controller
{
    
        public function getByID ($idguru) {

            $absensiBelajar = AbsensiGuru::with('User_Guru')->where('idguru', $idguru)->get();

            return response()->json([
            'data' => $absensiBelajar,
            'message' => $absensiBelajar ? 'Ada' : 'Tidak Ada'
        ]);
        
    }

    public function store(AbsensiGuruRequest $request) {

               $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }
         
        
        $data = $request->validated();
        $data['idguru'] = $user['idguru'];

         try {

            
           
            $result = AbsensiGuru::create($data);


            return response()->json([
                'message' => 'Absesi Berhasil Disimpan',
                'data' => $result
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan',
                'error' => $e->getMessage()
            ], 500);
        }
        }

}
