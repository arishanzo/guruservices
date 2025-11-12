<?php

namespace App\Http\Controllers\bank;

use App\Http\Controllers\Controller;
use App\Http\Requests\RekeningBankRequest;
use App\Models\Bank;
use Illuminate\Support\Facades\Cache;

class RekeningController extends Controller
{
    public function getDataRekening($idguru) {
        try {
            $rekening = Bank::where('idguru', $idguru)->first();
            
            return response()->json([
                'data' => $rekening,
                'message' => $rekening ? 'Data rekening ditemukan' : 'Data rekening tidak ditemukan'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengambil data rekening',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function storeRekening (RekeningBankRequest $request ) {

     $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

         $cek = Bank::where('idguru', $user->idguru)->first();
        
         
        try {

            if($cek){
                  $cek->update($data);
            }else{
                Bank::create($data);
            }


            return response()->json([
                'message' => 'Rekening bank berhasil disimpan',
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengunggah file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

        
}
