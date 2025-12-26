<?php

namespace App\Http\Controllers\KegiatanBelajar;

use App\Http\Controllers\Controller;
use App\Http\Requests\TugasBelajarRequest;
use App\Models\TugasBelajar;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class TugasBelajarController extends Controller
{

        public function getByID ($idguru) {

            $tugasbelajar = TugasBelajar::with('User_Guru')->where('idguru', $idguru)->get();
        

        return response()->json([
            'data' => $tugasbelajar,
            'message' => $tugasbelajar ? 'Ada' : 'Tidak Ada'
        ]);

    }

      public function getByUserID ($idbookingprivate) {


        
        $tugasbelajar = TugasBelajar::with('User_Guru', 'Nilai_Tugas')->where('idbookingprivate', $idbookingprivate)->get();
    


       return response()->json([
        'data' => $tugasbelajar,
        'message' => $tugasbelajar->isEmpty() ? 'Tidak Ada' : 'Ada'
    ]);

    }

    
   public function putTugasKelas($idtugasbelajar, Request $request)
{
    try {
        
        $tugas = TugasBelajar::where('idtugasbelajar', $idtugasbelajar)->first();

        if (!$tugas) {
            return response()->json([
                'success' => false,
                'message' => 'Tugas tidak ditemukan'
            ], 404);
        }

         $status = $request->status ?? 'selesai';
        // Update status
        $tugas->update([
            'statustugas' => $status,
        ]);

         Cache::forget("tugas_" . $tugas->idbookingprivate);

        return response()->json([
            'success' => true,
            'message' => 'Tugas berhasil diKumpulkan',
            'data'    => $tugas
        ], 200);

    } catch (\Exception $e) {
        Log::error('Error updating tugas', [
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);

        return response()->json([
            'success' => false,
            'message' => 'Gagal memperbarui tugas: ' . $e->getMessage()
        ], 500);
    }
}
    
    
public function store (TugasBelajarRequest $request) {

        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

     
        try {
           
            $result = TugasBelajar::create($data);

            Cache::forget("tugasbelajar_" . $user->idguru);


            return response()->json([
                'message' => 'Tugas Berhasil Disimpan',
                'data' => $result
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan',
                'error' => $e->getMessage()
            ], 500);
        }
    }  


    
public function update (TugasBelajarRequest $request, $idtugasbelajar)  {

        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

             $cek = TugasBelajar::where('idtugasbelajar', $idtugasbelajar)->firstOrFail();;
        try {
           
           if($cek){
                
                $cek->update($data);
                $result = $cek;
                
              Cache::forget("tugasbelajar_{$user->idguru}");

            } 


            return response()->json([
                'message' => 'Tugas Berhasil Disimpan',
                'data' => $result
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan',
                'error' => $e->getMessage()
            ], 500);
        }
    }  

public function destroy($idtugasbelajar)
{
    try {
        $tugas = TugasBelajar::findOrFail($idtugasbelajar);
        $tugas->delete();

        Cache::forget("tugasbelajar_" . $tugas->idguru);

        return response()->json([
            'success' => true,
            'message' => 'Tugas berhasil dihapus',
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Gagal menghapus tugas',
            'error' => $e->getMessage()
        ], 500);
    }
}
}
