<?php

namespace App\Http\Controllers\PermintaanPenarikan;

use App\Http\Controllers\Controller;
use App\Models\PermintaanPenarikan;
use Illuminate\Http\Request;

class PermintaanPenarikanController extends Controller
{
       public function getAllPermintaanPenarikan()
    {
         $getAll = PermintaanPenarikan::with('User_guru')->get();
          return response()->json([
            'data' => $getAll,
        ]);
    }
}
