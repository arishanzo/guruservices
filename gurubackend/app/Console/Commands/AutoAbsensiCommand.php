<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

use Illuminate\Support\Facades\DB;

class AutoAbsensiCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:auto-absensi-command';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Auto create absensi for past bookings';

    /**
     * Execute the console command.
     */
    public function handle()
    {
         $this->info('Starting auto absensi process...');

        $pastBookings = DB::table('tglbooking')
            ->where('tglbooking', '<', now()->toDateString())
            ->get();

        $processedBookings = [];

        foreach ($pastBookings as $booking) {
           $existingAbsensi = DB::connection('gurugopintar_db')->table('absensiguru')
                ->where('idtglbooking', $booking->idtglbooking)
                ->exists();


            if (!$existingAbsensi) {
               
                DB::connection('gurugopintar_db')->table('absensiguru')->insert([
                    'idabsensiguru' => (string) \Illuminate\Support\Str::uuid(),
                    'idtglbooking' => $booking->idtglbooking,
                    'idprofilguru' => $booking->idprofilguru,
                    'tanggal' => $booking->tglbooking,
                    'sesi' => $booking->sesi,
                    'statusabsen' => 'Tidak Hadir',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);

                $this->info("Created absensi for booking: {$booking->idtglbooking}");
                $processedBookings[] = $booking;
            }
        }

      
        if (!empty($processedBookings)) {
            $latestBooking = DB::table('tglbooking')
                ->orderBy('tglbooking', 'desc')
                ->first();

            if ($latestBooking) {
                $baseDate = $latestBooking->tglbooking;
                $dayCounter = 1;

                foreach ($processedBookings as $booking) {
                    $nextDate = date('Y-m-d', strtotime($baseDate . ' +' . $dayCounter . ' day'));

                    DB::table('tglbooking')->insert([
                        'idtglbooking' => (string) \Illuminate\Support\Str::uuid(),
                        'iduser' => $booking->iduser,
                        'idprofilguru' => $booking->idprofilguru,
                        'idbookingprivate' => $booking->idbookingprivate,
                        'tglbooking' => $nextDate,
                        'sesi' => $booking->sesi,
                        'statusngajar' => 'Belum Mengajar',
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $this->info("Created new booking for date: {$nextDate}");
                    $dayCounter++;
                }
            }
        }

        $this->info('Auto absensi process completed!');
 
    }
}
