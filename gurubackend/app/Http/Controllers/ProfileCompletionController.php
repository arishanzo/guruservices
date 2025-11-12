<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserGuru;

class ProfileCompletionController extends Controller
{
    public function getCompletion(Request $request)
    {
        $user = $request->user();
        
        if (!$user) {
            return response()->json(['percent' => 0, 'missing' => ['User not found']], 401);
        }

        $requiredFields = [
            'name' => 'Nama Lengkap',
            'email' => 'Email',
        ];

        $filledFields = 0;
        $totalFields = count($requiredFields);
        $missing = [];

        foreach ($requiredFields as $field => $label) {
            if (!empty($user->$field)) {
                $filledFields++;
            } else {
                $missing[] = $label;
            }
        }

        $percent = $totalFields > 0 ? round(($filledFields / $totalFields) * 100) : 0;

        return response()->json([
            'percent' => $percent,
            'missing' => $missing
        ]);
    }
}