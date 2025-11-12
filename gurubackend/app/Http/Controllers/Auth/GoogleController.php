<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use App\Models\UserLogin;
use Illuminate\Support\Facades\Auth;

class GoogleController extends Controller
{
    public function redirectToGoogle()
    {
        return response()->json(['message' => 'Redirecting to Google...']);
    }

    public function handleGoogleCallback(Request $request)
    {
        // Handle the Google callback logic here
        // For example, you can retrieve user information and create a session or token

        try {
            if (!$request->has('token')) {
                return response()->json(['error' => 'Token tidak ditemukan'], 400);
            }

            $googleUser = Socialite::driver('google')->stateless()->userFromToken($request->token);

            $user = UserLogin::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'nama_user' => $googleUser->getName(),
                    'password' => bcrypt('google_login_' . time())
                ]
            );

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'message' => 'Login Google berhasil',
                'access_token' => $token,
                'token_type' => 'Bearer'
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'error' => 'Login Google gagal: ' . $e->getMessage()
            ], 401);
        }

    }
}
