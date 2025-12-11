<?php

namespace App\Http\Controllers\KegiatanBelajar;

use App\Http\Controllers\Controller;
use App\Http\Requests\KegiatanBelajarRequest;
use App\Models\KegiatanBelajar;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class KegiatanBelajarController extends Controller
{

 
    public function getByID ($idguru) {

         $KegiatanBelajar = KegiatanBelajar::with('User_Guru')->where('idguru', $idguru)->get();
       


        return response()->json([
            'data' => $KegiatanBelajar,
            'message' => $KegiatanBelajar ? 'Ada' : 'Tidak Ada'
        ]);

    }

     public function getByUserID ($idbookingprivate) {

          $KegiatanBelajar = KegiatanBelajar::where('idbookingprivate', $idbookingprivate)->get();
        

       return response()->json([
        'data' => $KegiatanBelajar,
        'message' => $KegiatanBelajar->isEmpty() ? 'Tidak Ada' : 'Ada'
    ]);

    }
    

    public function getPhoto($path) {
        $disk = env('PHOTO_PRIVATE_DISK', 'private');
        $decodedPath = urldecode($path);

        if (!Storage::disk($disk)->exists($decodedPath)) {
            abort(404);
        }

        $file = Storage::disk($disk)->get($decodedPath);
        $type = Storage::disk($disk)->mimeType($decodedPath) ?? 'image/webp';

        return response($file, 200)->header('Content-Type', $type);
    }


public function update (KegiatanBelajarRequest $request, $idkegiatanbelajar)  {
            
            
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

        $cek = KegiatanBelajar::where('idkegiatanbelajar', $idkegiatanbelajar)->firstOrFail();

        if ($request->hasFile('fotokegiatan')) {
            if ($cek && $cek->fotokegiatan && Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->exists($cek->fotokegiatan)) {
                Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->delete($cek->fotokegiatan);
            }

            $file = $request->file('fotokegiatan');
            $image = Image::make($file)->encode('webp', 80);
            $encoded = (string) $image->encode();
            $disk = env('PHOTO_PRIVATE_DISK', 'private');
            $filename = Str::uuid()->toString().'.webp';
            $path = 'photos/'.date('Y/m/d').'/'.$filename;
            $data['fotokegiatan'] = $path;
            
            Storage::disk($disk)->put($path, $encoded, 'private');
        } else {
            unset($data['fotokegiatan']);
        }

        try {
            if($cek){
                
                $cek->update($data);
                $result = $cek;
                
              Cache::forget("kegiatanbelajar_{$user->idguru}");

            } 

            return response()->json([
                'message' => 'Kegiatan Belajar Berhasil Disimpan',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan Kegiatan Belajar',
                'error' => $e->getMessage()
            ], 500);
        }
    
        }

public function store (KegiatanBelajarRequest $request) {
       $cek = KegiatanBelajar::where('tglkegiatan', $request->tglkegiatan)->first();

            if ($cek) {
                return response()->json([
                    'messageerors' => 'Gagal Menyimpan, Kegiatan Belajar Sudah Ada'
                ], 400);
            }


        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idbookingprivate'] = $request->idbookingprivate;
        
        $data['idguru'] = $user->idguru;

        if ($request->hasFile('fotokegiatan')) {
          
            $file = $request->file('fotokegiatan');
            $image = Image::make($file)->encode('webp', 80);
            $encoded = (string) $image->encode();
            $disk = env('PHOTO_PRIVATE_DISK', 'private');
            $filename = Str::uuid()->toString().'.webp';
            $path = 'photos/'.date('Y/m/d').'/'.$filename;
            $data['fotokegiatan'] = $path;
            
            Storage::disk($disk)->put($path, $encoded, 'private');
        } else {
            unset($data['fotokegiatan']);
        }

        try {
           
            $result = KegiatanBelajar::create($data);

                Cache::forget("kegiatanbelajar_" . $data['idguru']);
            return response()->json([
                'message' => 'Kegiatan Belajar Berhasil Disimpan',
                'data' => $result
            ], 201);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }   
}
