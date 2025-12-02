<?php

namespace App\Http\Controllers\Gateway;

use App\Http\Controllers\Controller;
use App\Models\ProfilGuru;
use App\Services\ServiceClient;
use Illuminate\Http\Request;

class ServiceCommunicationController extends Controller
{
    private $serviceClient;

    public function __construct(ServiceClient $serviceClient)
    {
        $this->serviceClient = $serviceClient;
    }

    public function getUserProfile(Request $request, $userId)
    {
        $result = $this->serviceClient->getUserData($userId);
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch user data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }

     public function getBookingKelas($idprofilguru)
    {
        $result = $this->serviceClient->getBookingKelas($idprofilguru);
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch user data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }


    public function putBookingKelas(Request $request, $idBookingPrivate)
{
    $payload = [
        'status' => $request->status ?? 'Mulai'
    ];

   
    $result = $this->serviceClient->putBookingKelas($idBookingPrivate, $payload);

    if (!$result['success']) {
        return response()->json([
            'error' => 'Failed to update booking',
            'message' => $result['error'] ?? 'Service unavailable'
        ], $result['status']);
    }

    return response()->json($result['data'], $result['status']);
}



    public function putTglBooking(Request $request, $idtglbooking)
{
    $payload = [
        'tglbooking' => $request->tglbooking ?? ''
    ];

   
    $result = $this->serviceClient->putTglBooking($idtglbooking, $payload);

    if (!$result['success']) {
        return response()->json([
            'error' => 'Failed to update Tanggal booking',
            'message' => $result['error'] ?? 'Service unavailable'
        ], $result['status']);
    }

    return response()->json($result['data'], $result['status']);
}
    
    public function getGuruProfile(Request $request, $guruId)
    {
        $result = $this->serviceClient->getGuruData($guruId);
        
        if (!$result['success']) {
            return response()->json([
                'error' => 'Failed to fetch guru data',
                'message' => $result['error'] ?? 'Service unavailable'
            ], $result['status']);
        }

        return response()->json($result['data']);
    }

    public function getAllGurus(Request $request)
    {
        try {
            // Debug: Cek total data di tabel
            $totalGurus = ProfilGuru::count();
            $aktifGurus = ProfilGuru::where('statusakun', 'complete')->count();
            
            // Ambil semua guru dengan relasi user
            $gurus = ProfilGuru::with('User_guru')->where('statusakun', 'complete')
                ->get();

            return response()->json([
                'success' => true,
                'debug' => [
                    'total_gurus' => $totalGurus,
                    'aktif_gurus' => $aktifGurus
                ],
                'data' => $gurus
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }

   
    public function crossServiceData(Request $request)
    {
        $userId = $request->input('user_id');
        $guruId = $request->input('guru_id');

        $responses = [];

        if ($userId) {
            $userResult = $this->serviceClient->getUserData($userId);
            $responses['user'] = $userResult['success'] ? $userResult['data'] : null;
        }

        if ($guruId) {
            $guruResult = $this->serviceClient->getGuruData($guruId);
            $responses['guru'] = $guruResult['success'] ? $guruResult['data'] : null;
        }

        return response()->json($responses);
    }
}