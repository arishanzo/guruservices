<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\UserGuru;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthProsesController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nama_user' => 'required|string|max:255',
            'email_user' => 'required|string|email|max:255|unique:userguru,email',
            'password_user' => 'required|string|min:6',
        ]);

        UserGuru::create([
            'name' => $request->nama_user,
            'email' => $request->email_user,
            'password' => Hash::make($request->password_user),
        ]);

        return response()->json(['message' => 'berhasil'], 201);
    }
public function login(Request $request)
{
    $request->validate(
        [
            'email_user' => 'required|email',
            'password_user' => 'required'
        ],
        [
            'email_user.required' => 'Email wajib diisi.',
            'email_user.email' => 'Format email tidak valid.',
            'password_user.required' => 'Password wajib diisi.'
        ]
    );

    $user = UserGuru::where('email', $request->email_user)->first();

    if (!$user) {
        return response()->json([
            'errors' => [
                'email_user' => ['Email belum terdaftar.']
            ]
        ], 404);
    }

    if (!Hash::check($request->password_user, $user->password)) {
        return response()->json([
            'errors' => [
                'password_user' => ['Password salah.']
            ]
        ], 401);
    }

    // Login via Sanctum token
  Auth::login($user);
$request->session()->regenerate();
$token = $user->createToken('auth_token')->plainTextToken;


    return response()->json([
        'access_token' => $token,
        'token_type' => 'Bearer',
        'user' => $user->makeHidden(['password']),
    ]);
}

    public function user(Request $request)
    {
        return $request->user();
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        
         // Hapus session user
        Auth::guard('web')->logout();

        // Hapus session di server
        $request->session()->invalidate();

        // Regenerasi CSRF token biar lebih aman
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out']);
    }
}
