<?php

use App\Http\Controllers\Auth\AuthProsesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\bank\RekeningController;
use App\Http\Controllers\User\UserProfileController;
use App\Http\Controllers\Gateway\ApiGatewayController;
use App\Http\Controllers\Gateway\ServiceCommunicationController;
use App\Http\Controllers\KegiatanBelajar\AbsensiController;
use App\Http\Controllers\KegiatanBelajar\KegiatanBelajarController;
use App\Http\Controllers\KegiatanBelajar\NilaiTugasController;
use App\Http\Controllers\KegiatanBelajar\TugasBelajarController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PermintaanPenarikan\PermintaanPenarikanController;
use App\Http\Controllers\Saldo\SaldoKeluarController;
use App\Http\Controllers\Saldo\SaldoMasukController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('/auth/google/redirect', [GoogleController::class, 'redirectToGoogle']);
// Route::post('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::middleware(['auth:sanctum', 'throttle:1000,1'])->get('/user', [AuthProsesController::class, 'user']);


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => csrf_token()]);
});

Route::get('/check-session', function () {
    return response()->json([
        'authenticated' => Auth::check()
    ]);
});


Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Logout berhasil']);
});


Route::post('/daftar', [AuthProsesController::class, 'register']);


Route::post('/login', [AuthProsesController::class, 'login'])->name('login');

Route::post('/logout', [AuthProsesController::class, 'logout'])->middleware('auth:sanctum');


Route::post('/password/send-code', [PasswordResetController::class, 'requestCode']);
Route::post('/password/verify-code', [PasswordResetController::class, 'checkCode']);
Route::post('/password/reset', [PasswordResetController::class, 'updatePassword']);


Route::post('/vertifpenarikan/send-code', [PasswordResetController::class, 'requestCode']);
Route::post('/vertifpenarikan/verify-code', [PasswordResetController::class, 'checkCode']);
Route::post('/vertifpenarikan/reset', [PasswordResetController::class, 'updatePassword']);



Route::get('/hello', function () {
    return ['message' => 'Hello from Laravel API 🚀'];
});


Route::prefix('services')->middleware(['throttle:100,1', 'service.auth'])->group(function () {

    Route::get('permintaanpenarikan', [PermintaanPenarikanController::class, 'getAllPermintaanPenarikan']);
    Route::get('guruall', [UserProfileController::class, 'getAll']);

    Route::get('kegiatanbelajar/{idbookingprivate}', [KegiatanBelajarController::class, 'getByUserID'])
        ->where('idbookingprivate', '[0-9a-fA-F\-]+');

        
    Route::get('tugaskelas/{idbookingprivate}', [TugasBelajarController::class, 'getByUserID'])
        ->where('idbookingprivate', '[0-9a-fA-F\-]+');

    Route::get('booking/{idprofilguru}', [ServiceCommunicationController::class, 'getBookingKelas']);
    Route::put('bookingupdate/{idBookingPrivate}', [ServiceCommunicationController::class, 'putBookingKelas']);
    Route::put('tglbooking/{idtglbooking}', [ServiceCommunicationController::class, 'putTglBooking']);
    Route::get('gurus', [ServiceCommunicationController::class, 'getAllGurus']);
    Route::post('cross-data', [ServiceCommunicationController::class, 'crossServiceData']);
    Route::put('puttugaskelas/{idtugasbelajar}', [TugasBelajarController::class, 'putTugasKelas']);

    Route::get('/absensiguru/{idprofilguru}', [AbsensiController::class, 'getAbsensiByTglBooking']);
});

// Public photo endpoint for guru photos (must be before auth middleware)
Route::get('/photosuser/{path}', [UserProfileController::class, 'getPhoto'])->where('path', '.*');
Route::get('/fotokegiatan/{path}', [KegiatanBelajarController::class, 'getPhoto'])->where('path', '.*');






Route::middleware('auth:sanctum')->group(function () {
    Route::post('/profile', [UserProfileController::class, 'store']);
    Route::post('/profileedit/{idprofilguru}', [UserProfileController::class, 'update']);
    Route::get('/profile/{idguru}', [UserProfileController::class, 'getByID']);
    Route::get('/photos/{path}', [UserProfileController::class, 'getPhoto'])->where('path', '.*');

    Route::get('/profiles', [UserProfileController::class, 'getAll']);
    Route::post('/fileguru', [UserProfileController::class, 'uploadFile']);
    Route::get('/getfileguru/{idguru}', [UserProfileController::class, 'getFileGuru']);
    Route::get('/profiles/completion', [UserProfileController::class, 'getProfileCompletion']);
    Route::get('/profiles/storestatus', [UserProfileController::class, 'storeStatusakun']);
  Route::put('/profile/ubahpassword', [UserProfileController::class, 'ubahpassword']);
  
  Route::post('/kegiatanbelajar', [KegiatanBelajarController::class, 'store']);
   Route::get('/kegiatanbelajar/{idguru}', [KegiatanBelajarController::class, 'getByID']);
   Route::put('/kegiatanbelajar/editkegiatanbelajar/{idkegiatanbelajar}', [KegiatanBelajarController::class, 'update']);
   


   Route::post('/tugasbelajar', [TugasBelajarController::class, 'store']);
   Route::get('/tugasbelajar/{idguru}', [TugasBelajarController::class, 'getByID']);
    Route::put('/tugasbelajar/edittugasbelajar/{idkegiatanbelajar}', [TugasBelajarController::class, 'update']);
     Route::delete('/tugasbelajar/{idkegiatanbelajar}', [TugasBelajarController::class, 'destroy']);


   
   Route::post('/nilaitugas', [NilaiTugasController::class, 'store']);
   Route::get('/nilaitugas/{idguru}', [NilaiTugasController::class, 'getByID']);

   Route::post('/absensi', [AbsensiController::class, 'store']);
   Route::get('/absensi/{idprofilguru}', [AbsensiController::class, 'getByID']);


   Route::get('/saldomasuk', [SaldoMasukController::class, 'getAllSaldoMasuk']);
   Route::get('/saldokeluar', [SaldoKeluarController::class, 'getAllSaldoKeluar']);

   
    Route::get('permintaanpenarikan/{idprofilguru}', [PermintaanPenarikanController::class, 'getAllByID']);
    Route::post('/permintaanpenarikan', [PermintaanPenarikanController::class, 'storePermintaanPenarikan']);
    


    Route::get('/notifications', function (Request $request) {
        return $request->user()->notifications;
    });

 

    // Tandai 1 notifikasi sudah dibaca
    Route::post('/notifications/{id}/read', function (Request $request, $id) {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();
        return response()->json(['success' => true]);
    });

    // Tandai semua notifikasi sudah dibaca
    Route::post('/notifications/read-all', function (Request $request) {
        $request->user()->unreadNotifications->markAsRead();
        return response()->json(['success' => true]);
    });


     // Hapus Notifikasi
    Route::post('/notifications/{iduser}/clear', function (Request $request, $iduser) {
        $request->user()->notifications()->delete($iduser);
        return response()->json(['success' => true]);
    });


    Route::post('/tambahrekening',  [RekeningController::class, 'storeRekening']);
    Route::get('/getdatarekening/{idguru}', [RekeningController::class, 'getDataRekening']);

});




// // API Gateway Routes (dengan keamanan)
// Route::prefix('gateway')->middleware(['throttle:100,1', 'service.auth'])->group(function () {
//     Route::any('{service}/{endpoint?}', [ApiGatewayController::class, 'proxy'])
//         ->where('endpoint', '.*');
// });

// Service Communication Routes (dengan keamanan)