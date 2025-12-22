<?php

namespace App\Http\Controllers\PermintaanPenarikan;

use App\Http\Controllers\Controller;
use App\Models\PermintaanPenarikan;
use App\Models\ProfilGuru;
use App\Notifications\ActivityNotification;
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

    public function storePermintaanPenarikan(Request $request)
    {
        $request->validate([
            'tglpermintaanpenarikan' => 'required|date',
            'jumlahpenarikan' => 'required|numeric',
            'statuspermintaan' => 'required|string',
        ]);

       
        $user = $request->user();

        $idprofilguru = ProfilGuru::where('idguru', $user->idguru)->first()->idprofilguru;

        $permintaanPenarikan = PermintaanPenarikan::create([
            'idprofilguru' => $idprofilguru,
            'tglpermintaanpenarikan' => $request->tglpermintaanpenarikan,
            'jumlahpenarikan' => $request->jumlahpenarikan,
            'statuspermintaan' => $request->statuspermintaan,
        ]);

         $user->notify(new ActivityNotification("Permintaan Penarikan {$request->jumlahpenarikan} pada tgl {$request->tglpermintaanpenarikan}. Berhasil, Mohon Tunggu di Proses Admin"));


        return response()->json([
            'message' => 'Permintaan penarikan berhasil dibuat',
            'data' => $permintaanPenarikan,
        ], 201);
    }
}
