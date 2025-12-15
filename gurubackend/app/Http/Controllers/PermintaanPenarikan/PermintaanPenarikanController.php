<?php

namespace App\Http\Controllers\PermintaanPenarikan;

use App\Http\Controllers\Controller;
use App\Models\PermintaanPenarikan;
use Illuminate\Http\Request;

class PermintaanPenarikanController extends Controller
{
       public function getAllPermintaanPenarikan()
    {
         $getAll = PermintaanPenarikan::with('Profil_guru')->get();
          return response()->json([
            'data' => $getAll,
        ]);
    }

    public function getAllByID($idprofilguru)
    {
         $getByID = PermintaanPenarikan::with('Profil_guru') ->where('idprofilguru', $idprofilguru)->get();
          return response()->json([
            'data' => $getByID,
        ]);
    }
}
