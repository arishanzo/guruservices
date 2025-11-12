import { useEffect, useState } from 'react';
import axiosClient, { serviceClient } from '../lib/axios';

export const UseAutoAbsensi= (absensiGuru, allBookingDates) => {
  
    const [hariBerikutnya, setHariBerikutnya] = useState(null);
    const [loadingAutoAbsensi, setLoadingAutoAbsensi] = useState(true);

    
      const absenTidakHadir = allBookingDates.filter(date => {
        const tanggalBooking = new Date(date.tglbooking).toISOString().slice(0, 10);
        const hariIni = new Date().toISOString().slice(0, 10);
        const absensi = absensiGuru.find(a => a.idtglbooking === date.idtglbooking);

        return (
          tanggalBooking < hariIni &&
          (!absensi)
        );
      });

  useEffect(() => {
     
    // if (!absensiGuru || allBookingDates.length === 0 )  {
      
    //  setLoadingAutoAbsensi(false);
    //   return;
    // }

    // ✅ Pastikan tidak kosong sebelum reduce
    if (absenTidakHadir.length === 0) {
      return;
    }

    
 const { end } = allBookingDates.reduce(
          (acc, item) => {
            const date = item.tglbooking;
            if (!acc.end || new Date(date) > new Date(acc.end)) acc.end = date;
            return acc;
          },
          { end: null }
        );
  
    
    const hariTambahan = new Date(end);
    hariTambahan.setDate(hariTambahan.getDate() + 1);
            
    const hariTambahans = hariTambahan.toISOString().split('T')[0];
    setHariBerikutnya(hariTambahans); 
    

  const updateTidakHadir = async () => {
    
      if (absenTidakHadir.length === 0) {
        return;
      }

      try {
       await Promise.all(
        absenTidakHadir.map(async (date, index) => {

            await axiosClient.post(`/api/absensi`, {
            idtglbooking: date.idtglbooking,
            tanggal: date.tglbooking,
            sesi: date.sesi,
            statusabsen: 'Tidak Hadir',
            });

            const nextDay = new Date(end);
            nextDay.setDate(nextDay.getDate() + (index + 1));
            const nextDaay = nextDay.toISOString().split('T')[0];
            await serviceClient.putUpdateTglBooking(date.idtglbooking, { tglbooking : nextDaay})
        })
        );

        setLoadingAutoAbsensi(false);

      } catch (err) {
        console.error("Gagal update absen:", err);
       setLoadingAutoAbsensi(false);
      }finally{
        setLoadingAutoAbsensi(false);
      }
    };

    updateTidakHadir();

   
  }, [absensiGuru, allBookingDates, absenTidakHadir]);


    return {hariBerikutnya, loadingAutoAbsensi };

};