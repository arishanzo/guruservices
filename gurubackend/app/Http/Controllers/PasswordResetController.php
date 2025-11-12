<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Carbon;
use App\Models\PasswordResetTokens;
use App\Mail\PasswordResetCodeMail;
use App\Models\UserGuru;

class PasswordResetController extends Controller
{
    public function requestCode(Request $request){
        try {
            $validate = validator::make($request->all(), [
                'email' => 'required|email',
            ]);

            if($validate->fails()) return response()->json(['errors' => $validate->errors()], 422);

            $email = trim(strtolower($request->email));
            $key = 'reset:'.$email.':'.$request->ip();

            if (RateLimiter::tooManyAttempts($key, 3)) {
                return response()->json(['errors' => 'Terlalu sering, coba lagi nanti.'], 429);
            }

            RateLimiter::hit($key, 60);

            $user = UserGuru::where('email', $email)->first();
            if (!$user) {
                // hindari user enumeration
                return response()->json(['errors' => 'Email Belum Terdaftar'], 401);
            }

            PasswordResetTokens::where('email', $email)->delete();

            $code = random_int(100000, 999999);
            $hashed = Hash::make((string)$code);

            PasswordResetTokens::create([
                'email' => $email,
                'token' => $hashed,
                'attempts' => 0,
                'ip_address' => $request->ip(), 
                'expires_at' => Carbon::now()->addMinutes(15),
                 'created_at' => Carbon::now(),
            ]);

            Mail::to($email)->queue(new PasswordResetCodeMail($code));

            return response()->json(['message' => 'Kode reset password telah dikirim ke email.']);
        } catch (\Exception $e) {
            return response()->json(['errors' => 'Terjadi kesalahan sistem.'], 500);
        }
    }




      public function checkCode(Request $request)
    {
        try {
            $v = Validator::make($request->all(), [
                'email' => 'required|email',
                'token' => 'required',
            ]);
            if ($v->fails()) {
                return response()->json(['errors' => $v->errors()], 422);
            }

            $email = $request->email;
            $token = $request->token;

            $record = PasswordResetTokens::where('email', $email)->first();
            
            if (!$record || $record->expires_at->isPast()) {
                return response()->json(['errors' => 'Kode tidak valid atau sudah kedaluwarsa.'], 400);
            }

            if (!Hash::check($token, $record->token)) {
                $record->increment('attempts');
                return response()->json(['errors' => 'Kode salah.'], 400);
            }

            return response()->json(['message' => 'Kode benar, silakan ubah password.']);
        } catch (\Exception $e) {
            return response()->json(['errors' => 'Terjadi kesalahan sistem.'], 500);
        }
    }



      public function updatePassword(Request $request)
    {
        try {
            $v = Validator::make($request->all(), [
                
                'comfrimPasssword' => 'required|min:8',
                'email' => 'required|email',
                'newPassword' => 'required|min:8',
                'oldPassword' => 'required',
                'token' => 'required',
            ]);

            if ($v->fails()) {
                return response()->json(['errors' => $v->errors()], 422);
            }

            $email = $request->email;
            $code = $request->token;
            $record = PasswordResetTokens::where('email', $email)->first();

            if (!$record || $record->expires_at->isPast()) {
                return response()->json(['errors' => 'Kode tidak valid atau kedaluwarsa.'], 400);
            }

            if (!Hash::check($code, $record->token)) {
                $record->increment('attempts');
                return response()->json(['errors' => 'Kode salah.'], 400);
            }

            $user = UserGuru::where('email', $email)->first();
            if (!$user) {
                return response()->json(['errors' => 'User tidak ditemukan.'], 404);
            };

            if (!Hash::check($request->oldPassword, $user->password)) {
                return response()->json(['errors' => 'Password lama salah.'], 400);
            };

            $user->password = Hash::make($request->newPassword);
            $user->save();

            $record->delete(); // hapus kode agar tidak bisa dipakai ulang

            return response()->json(['message' => 'Password berhasil diubah.']);
        } catch (\Exception $e) {
            return response()->json(['errors' => 'Terjadi kesalahan sistem.'], 500);
        }
    }


}
