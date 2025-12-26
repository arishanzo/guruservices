import { BookOpen, Computer, MessageCircle, Phone } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import axiosClient, { serviceClient } from "../../../lib/axios";

const AbsenHariIni  = ( {tglBooking, booking, dataAbsen, tglBookingBesok}) => {

  
  const [disabled, setDisabled] = useState(false);
  const [showModalIjin, setShowModalIjin] = useState(false);
  const [selectedIjin, setSelectedIjin] = useState(null);

  const filterTglAbsen = dataAbsen?.filter( (absen) => absen.idtglbooking === tglBooking?.idtglbooking );
  const options = { day: "numeric", month: "long", year: "numeric" };


  const allBookingDates = useMemo(() => {
         return booking && booking.length > 0 
           ? booking.flatMap(item => item.tgl__booking__kelas || []) 
           : [];
       }, [booking]);
  
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

  const ijin = (idtglbooking) => {
    
        const selected = allBookingDates.find(b => b?.idtglbooking === idtglbooking);
      if (selected) {
            
              setSelectedIjin(selected);
              setShowModalIjin(true);
            }
          }
          
   const handleIjin = async (selectedIjin) => {
        
        const formData = {
          idprofilguru : booking[0]?.idprofilguru,
          idtglbooking : selectedIjin.idtglbooking,
          tanggal: selectedIjin.tglbooking,
          sesi: selectedIjin.sesi,
          statusabsen: 'Ijin',
        }

        const dataForm = new FormData();
        Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== "") {
          dataForm.append(key, val);
        }
        });

   try {
        setDisabled(true);
        const toastLoading = toast.loading("Prosess...");
       
      await axiosClient.post(`/api/absensi`, dataForm);
      await serviceClient.putUpdateTglBooking(selectedIjin.idtglbooking, { tglbooking : hariTambahans})
                   
     toast.dismiss(toastLoading);
        setShowModalIjin(false);
          toast.success("🎉 Izin Berhasil Ditambahkan", {
                style: {
                    border: '1px solid #16A34A',
                    background: '#ECFDF5', 
                    color: '#065F46',
                    fontWeight: '500',
                },
                iconTheme: {
                    primary: '#16A34A',
                    secondary: '#ECFDF5',
                    },
            });
            
        setTimeout(() => window.location.reload(), 1500);

      } catch (err) {
        console.error('Gagal kirim data:', err.response?.data || err.message);
        toast.error(`Maaf, Izin Tidak Berhasil. ${err.message}`, {  
            style: {
            border: '1px solid #f63b3bff',
            padding: '16px',
            color: '#f1474dff',
            background: '#ffffffff',
            fontWeight: '500',
            },

            iconTheme: {
            primary: '#e6132fff',
            secondary: '#ffffffff',
            },
        });
      } finally {
         setShowModalIjin(false);
          setDisabled(false);
      }
    };
    

     const handleHadir = async (idtglbooking) => {
         const selected = allBookingDates.find(
              (b) => b?.idtglbooking === idtglbooking
            );
           
      try {
       
        setDisabled(true);
        const toastLoading = toast.loading("Prosess...");
       
          await axiosClient.post(`/api/absensi`, {
          idprofilguru : booking[0]?.idprofilguru,
          idtglbooking: selected.idtglbooking,
          tanggal: selected.tglbooking,
          sesi: selected.sesi,
          statusabsen: 'Hadir',
        });

        toast.dismiss(toastLoading);
        
          toast.success("🎉 Berhasil Absensi", {
                style: {
                    border: '1px solid #16A34A',
                    background: '#ECFDF5', 
                    color: '#065F46',
                    fontWeight: '500',
                },
                iconTheme: {
                    primary: '#16A34A',
                    secondary: '#ECFDF5',
                    },
            });
            
        setTimeout(() => window.location.reload(), 1500);

      } catch (err) {
        toast.error(`Maaf, Absen Tidak Berhasil. ${err.message}`, {  
            style: {
            border: '1px solid #f63b3bff',
            padding: '16px',
            color: '#f1474dff',
            background: '#ffffffff',
            fontWeight: '500',
            },

            iconTheme: {
            primary: '#e6132fff',
            secondary: '#ffffffff',
            },
        });


      } finally {
         setDisabled(false);
      }
    };

  return (
    <>
      <div className="space-y-6">
        {/* Card Hari Ini */}
        <div className="p-4 bg-white rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-base text-gray-800 mb-1 truncate">{booking[0]?.mapeldipilih}</h4>
              <p className="text-sm text-gray-600 font-semibold">{tglBooking?.sesi} - {new Date(tglBooking?.tglbooking).toLocaleDateString("id-ID", options)}</p>
            </div>
            <div className="flex items-center gap-2">
              {filterTglAbsen?.length > 0 && (
                <span className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-full font-bold">Sudah Absen</span>
              )}
              <div className="relative group">
                <button
                  onClick={() => window.open(`https://wa.me/${booking[0]?.noteleponortu}`, '_blank', 'noopener,noreferrer')}
                  className="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg transition-colors duration-200">
                  <MessageCircle className="w-4 h-4" />
                </button>
                <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  Hubungi WA Siswa
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-3 py-2 rounded-lg mb-3">
            <span>📍</span>
            <span className="font-medium truncate">Lokasi: {booking[0]?.catatanalamat}</span>
          </div>
          {filterTglAbsen == 0 && (
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => handleHadir(tglBooking?.idtglbooking)} 
                disabled={disabled}
                className={`${
                  disabled ? 'cursor-not-allowed opacity-50' : ''
                } bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95`}>
                Absen Sekarang
              </button>
              <button 
                onClick={() => ijin(tglBooking?.idtglbooking)} 
                disabled={disabled}
                className={`${
                  disabled ? 'cursor-not-allowed opacity-50' : ''
                } bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95`}>
                Izin Sekarang
              </button>
            </div>
          )}
        </div>

        {/* Card Besok */}
        {tglBookingBesok && (
          <div className="p-4 bg-white rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-base text-gray-800 mb-1 truncate">{booking[0]?.mapeldipilih}</h4>
                <p className="text-sm text-gray-600 font-semibold">{tglBookingBesok?.sesi} - {new Date(tglBookingBesok?.tglbooking).toLocaleDateString("id-ID", options)}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative group">
                  <button
                    onClick={() => window.open(`https://wa.me/${booking[0]?.noteleponortu}`, '_blank', 'noopener,noreferrer')}
                    className="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg transition-colors duration-200">
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    Hubungi WA Siswa
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-3 py-2 rounded-lg mb-3">
              <span>📍</span>
              <span className="font-medium truncate">Lokasi: {booking[0]?.catatanalamat}</span>
            </div>
            <button 
              onClick={() => ijin(tglBookingBesok?.idtglbooking)} 
              disabled={disabled}
              className={`${
                disabled ? 'cursor-not-allowed opacity-50' : ''
              } w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95`}>
              Izin Besok
            </button>
          </div>
        )}
      </div>


                {/* pop up ijin */}


    {showModalIjin && (
                    <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={() => setShowModalIjin(false)}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-sm mx-4 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Tombol X */}
          <button
            onClick={() => setShowModalIjin(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                viewBox="0 0 20 20" 
                fill="currentColor">
              <path fillRule="evenodd" 
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                      1.414L11.414 10l4.293 4.293a1 1 0 
                      01-1.414 1.414L10 11.414l-4.293 
                      4.293a1 1 0 01-1.414-1.414L8.586 
                      10 4.293 5.707a1 1 0 010-1.414z" 
                    clipRule="evenodd" />
            </svg>
          </button>

          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 
                2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 
                0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>

            <h3 className="text-lg font-medium text-gray-900 mb-2">Peringatan!</h3>
            <p className="text-sm text-gray-500 mb-4">Apa Anda Yakin Untuk Izin Hari Ini</p>
          <div className="grid grid-cols-2 gap-4">
        <button
        onClick={() => handleIjin(selectedIjin)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Izin
        </button>
        <button
          onClick={() => setShowModalIjin(false)}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Batal
        </button>
      </div>

          </div>
          
        </div>
      </div>
      )}


          
          </>

  )
}

export default AbsenHariIni