<?php

namespace App\Http\Controllers\Saldo;

use App\Http\Controllers\Controller;
use App\Http\Requests\SaldoMasukRequest;
use App\Models\SaldoMasuk;
use Illuminate\Http\Request;

class SaldoMasukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
     public function getAllSaldoMasuk()
    {
        $getAll = SaldoMasuk::all();
          return response()->json([
            'data' => $getAll,
        ]);
    }

    public function getSaldoByIDGuru()
    {
        $idguru = auth()->user()->idguru;
        $getByID = SaldoMasuk::where('idguru', $idguru)->get();
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
    public function store(SaldoMasukRequest $request, $idguru)
    {
        $data = $request->validated();
        $data['idguru'] = $idguru;

        try {
            // Log data yang akan disimpan untuk debugging
            \Log::info('Data yang akan disimpan:', $data);
            
            $result = SaldoMasuk::create($data);

            return response()->json([
                'message' => 'Saldo Berhasil Disimpan',
                'data' => $result
            ], 201);
            
        } catch (\Exception $e) {
            // Log error detail untuk debugging
            \Log::error('Error saat menyimpan saldo masuk:', [
                'error' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'data' => $data
            ]);
            
            return response()->json([
                'error' => 'Failed to update',
                'message' => 'Gagal menyimpan: ' . $e->getMessage()
            ], 500);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(SaldoMasuk $saldoMasuk)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SaldoMasuk $saldoMasuk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SaldoMasuk $saldoMasuk)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SaldoMasuk $saldoMasuk)
    {
        //
    }
}
