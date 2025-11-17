<?php

namespace App\Http\Controllers\User;

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Cache;

use App\Http\Controllers\Controller;
use App\Http\Requests\FileGuruRequest;
use App\Http\Requests\PhotoProfilRequest;
use App\Models\FileGuru;
use App\Models\ProfilGuru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;


// use App\Models\ProfilUser;
// use App\Models\StatusAkun;
// use Faker\Core\File;
// use Symfony\Component\HttpKernel\Profiler\Profile;

class UserProfileController extends Controller
{
    
    public function getAll () {
        $getAll = ProfilGuru::with('User_Guru')->get();

           return response()->json([
            'data' => $getAll,
        ]);
    }


    public function getByID ($idguru) {
        
    //  $profil = ProfilUser::with('User_Login')->where('idguru', $idguru)->first();

        $profil = Cache::remember("profil_$idguru", 60, function() use($idguru) {
            return ProfilGuru::with('User_Guru')->where('idguru', $idguru)->first();
        });


        return response()->json([
            'data' => $profil,
            'message' => $profil ? 'Profil Ada' : 'Profil Tidak Ada'
        ]);

    }


    
    public function getFileGuru ($idguru) {
        
    //  $profil = ProfilUser::with('User_Login')->where('idguru', $idguru)->first();

        $fileguru = FileGuru::with('User_Guru')->where('idguru', $idguru)->first();
    


        return response()->json([
            'data' => $fileguru,
            'message' => $fileguru ? 'Profil Ada' : 'Profil Tidak Ada'
        ]);

    }

    public function store (PhotoProfilRequest $request) {

        $user = $request->user();
        if (!$user) {
            return response()->json([
                'message' => 'User tidak terautentikasi'
            ], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

        $cekprofil = ProfilGuru::where('idguru', $user->idguru)->first();

        if ($request->hasFile('foto_profil')) {
            if ($cekprofil && $cekprofil->foto_profil && Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->exists($cekprofil->foto_profil)) {
                Storage::disk(env('PHOTO_PRIVATE_DISK', 'private'))->delete($cekprofil->foto_profil);
            }

            $file = $request->file('foto_profil');
            $image = Image::make($file)->encode('webp', 80);
            $encoded = (string) $image->encode();
            $disk = env('PHOTO_PRIVATE_DISK', 'private');
            $filename = Str::uuid()->toString().'.webp';
            $path = 'photos/'.date('Y/m/d').'/'.$filename;
            $data['foto_profil'] = $path;
            
            Storage::disk($disk)->put($path, $encoded, 'private');
        } else {
            unset($data['foto_profil']);
        }

        try {
            if($cekprofil){
                
                $cekprofil->update($data);
                $result = $cekprofil;
                
              Cache::forget("profil_{$user->idguru}");

            } else {
                $result = ProfilGuru::create($data);
            }


            return response()->json([
                'message' => 'Profile Berhasil Disimpan',
                'data' => $result
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menyimpan profil',
                'error' => $e->getMessage()
            ], 500);
        }
    }   

    public function ubahpassword(Request $request) {
        
        $request->validate([
            'current_password' => 'required|string',
            'password' => 'required|string|min:6',
            'password_confirmation' => 'required|string|same:password',
        ],
         [
             'current_password.required' => 'Password Harus Diisi',
             'password.required' => 'Password Harus Diisi',
             'password.min' => 'Password Harus minimal 6 karakter',
            'password_confirmation.same' => 'Password Berbeda Harus Sama',
        ]
    );

        $user = $request->user();
         
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['message' => 'Password lama salah'], 400);
        }
        
        $user->update(['password' => Hash::make($request->password)]);
        
        return response()->json(['message' => 'Password berhasil diubah'], 200);
    }

 public function uploadFile(FileGuruRequest $request) {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'User tidak terautentikasi'], 401);
        }

        $data = $request->validated();
        $data['idguru'] = $user->idguru;

        $fileFields = ['file_cv', 'file_ijazah', 'file_sertifikat', 'file_portofolio'];
        $disk = env('FILE_PRIVATE_DISK', 'private');

        

        foreach ($fileFields as $field) {
            if ($request->hasFile($field)) {
            
            $cekfiles = FileGuru::where('idguru', $user->idguru)->first();

            if ($cekfiles && $cekfiles->{$field} && Storage::disk(env('FILE_PRIVATE_DISK', 'private'))->exists($cekfiles->{$field})) {
                Storage::disk(env('FILE_PRIVATE_DISK', 'private'))->delete($cekfiles->{$field});
            }
            

                $file = $request->file($field);
                $filename = Str::uuid()->toString().'.'.$file->getClientOriginalExtension();
                $path = 'files/'.date('Y/m/d').'/'.$filename;
                
                Storage::disk($disk)->putFileAs('files/'.date('Y/m/d'), $file, $filename, 'private');
                $data[$field] = $path;
            }
        }

        try {
            FileGuru::updateOrCreate(['idguru' => $user->idguru],$data);

            Cache::forget("fileguru_{$user->idguru}");

            return response()->json([
                'message' => 'File berhasil diunggah'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengunggah file',
                'error' => $e->getMessage()
            ], 500);
        }
    }

  public  function downloadFileGuru($fileguru) {
       
       if (!$fileguru) {
            return response()->json(['message' => 'File tidak ditemukan'], 404);
        }

        $disk = env('FILE_PRIVATE_DISK', 'private');
        $filePath = $fileguru;

        if (!Storage::disk($disk)->exists($filePath)) {
            return response()->json(['message' => 'File tidak ditemukan di server'], 404);
        }

        $fileContent = Storage::disk($disk)->get($filePath);
        $mimeType = Storage::disk($disk)->mimeType($filePath) ?? 'application/pdf'; // default ke PDF
        $fileName = basename($filePath);

        return response($fileContent, 200)
            ->header('Content-Type', $mimeType)
            ->header('Content-Disposition', 'inline; filename="'.$fileName.'"');
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

    public function getProfileCompletion(Request $request)
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['percent' => 0, 'missing' => ['User tidak terautentikasi']], 401);
        }

        $profil = ProfilGuru::with(['files', 'bank'])->where('idguru', $user->idguru)->first();

        if (!$profil) {
            return response()->json([
                'percent' => 0,
                'missing' => ['Profil belum dibuat']
            ]);
        }

         try {
        $statusData = [
            'idguru' => $user->idguru,
            'statusakun' => $profil->profile_completion < 100 ? 'incomplete' : 'complete'
        ];
        ProfilGuru::updateOrCreate(['idguru' => $user->idguru], $statusData);
    } catch (\Exception $e) {
        // Ignore error
    }


       

        return response()->json([
            'percent' => $profil->profile_completion,
            'missing' => $profil->profile_missing_fields,
            'message' => 'Status Akun Anda Complete'
        ]);
    }
    


}
