<?php

namespace App\Http\Controllers\Saldo;

use App\Http\Controllers\Controller;
use App\Models\SaldoKeluar;
use Illuminate\Http\Request;

class SaldoKeluarController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function getAllSaldoKeluar()
    {
         $getAll = SaldoKeluar::all();
          return response()->json([
            'data' => $getAll,
        ]);
    }

       public function getSaldoByIDGuru()
    {
        $idguru = auth()->user()->idguru;
        $getByID = SaldoKeluar::where('idguru', $idguru)->get();
          return response()->json([
            'data' => $getByID,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SaldoKeluar $saldoKeluar)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SaldoKeluar $saldoKeluar)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SaldoKeluar $saldoKeluar)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SaldoKeluar $saldoKeluar)
    {
        //
    }
}
