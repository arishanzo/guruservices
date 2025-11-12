
import { useAuth } from "../../context/AuthContext";
import { UseGetProfil } from "../../hook/useGetProfil";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";
import { useState, useMemo } from "react";
import axiosClient, { serviceClient } from "../../lib/axios";
import { toast } from "react-hot-toast";
import { UseGetAbsensiGuru } from "../../hook/useGetAbsensiGuru";

const AbsensiForm = () => {
  const { user } = useAuth();
  const { profil } = UseGetProfil(user?.idguru);
  const { booking } = UseBookingKelas(profil?.idprofilguru);
  const { absensiGuru} = UseGetAbsensiGuru(user?.idguru);

  const [disabled, setDisabled] = useState(false);


  
    const [showModalIjin, setShowModalIjin] = useState(false);
    const [selectedIjin, setSelectedIjin] = useState(null);
  
    

      // Flatten all tgl__booking__kelas arrays from all booking items
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
          toast.dismissAll();
      }
    };

  

  return (
    <div className="w-full mx-auto mb-4 md:px-4">
      
  

      <header className="mb-6 ">
        <h1 className="md:text-2xl text-xl  text-green-800 font-bold">Absensi Kelas</h1>
        <p className="text-sm text-gray-600">Isi form absensi sesuai jadwal mengajar.</p>
      </header>


      {/* Kotak Peringatan */}
        <div className="mb-6">
          <div className="flex items-start gap-3 p-4
          bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.93 5.93a10 10 0 0112.14 0
                  10 10 0 010 12.14 10 10 0 01-12.14 0
                  10 10 0 010-12.14z"
              />
            </svg>
            <div className="text-xs md:text-sm text-yellow-800 space-y-1">
              <p>
                <strong>Penting:</strong> Anda Hanya Bisa Absensi Hari Ini Sesuai Dengan Jadwal{' '}
                <span className="font-semibold">
                  , Jika Lupa Absensi Maka Anda Akan Dianggap Tidak Hadir.
                </span>{' '}              </p>
           
            <ul className="list-disc list-inside pl-1 space-y-1 pt-2">
                <li>
                  <span className="font-semibold ">Ijin / Cuti</span> → Jadwal Akan Otomatis{' '}
                  <span className="font-medium">Menambahkan 1 Hari Setelah Tanggal Jadwal Berakhir</span>.
                </li>
                <li>
                  <span className="font-semibold">Anda Bisa Ubah Sesi Di Menu <a href="/jadwal" className="text-red-500">Jadwal</a> </span> → Dengan Cara Klik Tanggal Pada Kalender.{' '}
                  <span className="font-medium">Setelah Ubah Sesi Anda Harus Komfirmasi Langsung Pada Wali Murid</span>.
                </li>
                
              </ul>
            </div>
          </div>
          </div>

      {/* Konten Utama */}
      
      {!booking ? (
      <div className="p-8 border border-gray-200 rounded-2xl shadow-sm flex flex-col animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-2/3 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/6"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
            <div className="mt-8 h-10 bg-gray-200 rounded"></div>
          </div>
      ) : (
        <div className="w-full mx-auto mb-4">
            {/* Jadwal Hari Ini */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-800">📅 Absensi Kelas</h3>
          
        </div>
        <div className="space-y-8">
          {/* Jadwal Kelas */}
          {[...allBookingDates].sort((a, b) => new Date(a.tglbooking) - new Date(b.tglbooking)).map((date, index) => (
            
          <div key={index}>
          <div className={`flex items-center p-3 shadow shadow-xs  rounded-xl ${new Date(date.tglbooking).toDateString() === new Date().toDateString() ? `bg-green-100` : new Date(date.tglbooking) < new Date() ? 'bg-gray-100'  : `bg-gray-50`} `}>
                <div className="flex-1 px-4">
              <h4 className="font-medium text-sm text-green-800 mb-2">
                  {new Date(date.tglbooking).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) + ' • ' + booking.find(b => b.idbookingprivate === date.idbookingprivate)?.mapeldipilih }
              </h4>

              <p className="text-xs text-gray-600">{ date.sesi} • Siswa: {booking.find(b => b.idbookingprivate === date.idbookingprivate)?.namamurid}</p>
            </div>
            {absensiGuru.find(a => a.idtglbooking === date.idtglbooking)?.statusabsen === 'Ijin' ? (
                  
                     <span className="text-xs bg-yellow-600 text-yellow-100 px-4 py-1 font-semibold text-center rounded-full">
                    Izin 
                  </span>
            ) : absensiGuru.find(a => a.idtglbooking === date.idtglbooking)?.statusabsen === 'Hadir' ? (
            <span className="text-xs bg-green-700 text-green-100 px-4 py-1 font-semibold text-center rounded-full">
                    Hadir
                  </span>
            
             ) :   absensiGuru.find(a => a.idtglbooking === date.idtglbooking)?.statusabsen === 'Tidak Hadir'  ? (
            <span className="text-xs bg-red-800 text-red-100 px-4 py-1 font-semibold text-center rounded-full">
                   Tidak Hadir
                  </span>
            
             ): (
       <div className="flex flex-col items-center justify-center gap-4 text-gray-500 mt-auto">
         {new Date(date.tglbooking).toDateString() === new Date().toDateString()  && (
           <button onClick={() => handleHadir(date?.idtglbooking)} 
           disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } text-xs bg-green-700 text-green-100 p-4 font-semibold py-1 text-center rounded-full`}>Hadir</button>
       
         )}
               <button  onClick={() => ijin(date?.idtglbooking)} 
                  disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } text-xs bg-red-100 text-red-700 p-4 font-semibold py-1 text-center rounded-full`}>Izin</button>
              </div>
            )}
       
          </div>
          </div>
          ))}

        
        </div>
      </div>
        </div>
        
      )}

      {/* End Konten Utama */}





       {/* Modal Popup */}
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


    </div>
    
  );
};

export default AbsensiForm;