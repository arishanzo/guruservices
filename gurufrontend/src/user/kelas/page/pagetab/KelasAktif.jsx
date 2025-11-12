import { Users, Check, Info, Upload, MessageCircle} from "lucide-react";
import { serviceClient } from "../../../../lib/axios";
import { useState } from "react";
import { UseBookingKelas } from "../../../../hook/useGetBookingKelas";
import ModalDetailKelas from "../showmodal/ModalDetailkelas";
import ModalKegiatan from "../showmodal/ModalKegiataan";

const KelasAktif = ({profil}) => {

      const [status, setStatus] = useState("");
      const [disabled, setDisabled] = useState(false);
      const [showModal, setShowModal] = useState(false);
      const [showModalKegiatan, setShowModalKegiatan] = useState(false);
      
      const { booking} = UseBookingKelas(profil?.idprofilguru);
      const [bookingByID, setBookingByID] = useState(null);
        
      

    const handleKomfirmasi = async (idBookingPrivate) => {
       setDisabled(true);

    try {
      
    
      await serviceClient.putBookingKelasUser(idBookingPrivate, { status: "Sudah Mulai" });

   
      setStatus("Komfirmasi Kelas Berhasil.");
      
      setTimeout(() => window.location.reload(), 3000);
      
    } catch (err) {
       err.response?.data || {};
      setStatus("Ubah Data gagal. Silakan coba lagi.");
    } finally {
      setDisabled(false);
      setTimeout(() => setStatus(""), 3000);
    }
    };

        const detail = (idBookingPrivate) => {
            if (!booking) return; 

            const selectedBooking = booking.find(
              (b) => b.idbookingprivate === idBookingPrivate
            );

            if (selectedBooking) {
              setBookingByID(selectedBooking); 
              setShowModal(true);
            }
            
          };


            const kegiatan = (idBookingPrivate) => {
            if (!booking) return; 

            const selectedBooking = booking.find(
              (b) => b.idbookingprivate === idBookingPrivate
            );

            if (selectedBooking) {
              setBookingByID(selectedBooking); 
              setShowModalKegiatan(true);
            }
            
          };


    return (
       <>
          {/* Loading state */}
        


  {/* Loading state */}
        {!booking ? (
          <>
          <div className="flex items-center justify-between mb-4 pt-4 animate-pulse">
  <div className="h-6 w-32 bg-gray-300 rounded"></div>
</div>

<div className="h-12 w-full bg-gray-200 rounded-lg mb-4 animate-pulse"></div>


  <div
    
    className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200 animate-pulse mb-4"
  >
    <div className="flex-1">
      <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
      <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-40 bg-gray-200 rounded"></div>
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div className="flex gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </div>
</>
        ) : booking.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Tidak ada Kelas ditemukan</p>
          </div>
        ) : (
               <div className="md:p-6 space-y-6">

                
     { booking?.statusbooking === 'Belum Mulai' ? (

         <p className="text-green-600 bg-green-50 p-4 md:text-sm  text-xs flex items-center mb-2">
          *Klik Tombol Centang Untuk Memulai  <span className="font-bold px-1"> Kelas Anda</span> 
        </p>
        
          ): (
    <div className="flex flex-col gap-3 w-full">
          {/* Kotak Peringatan */}
          <div className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm w-full">
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
            <div className="text-sm text-yellow-800 space-y-1">
              <p>
                <strong>Penting:</strong> Setiap Guru Wajib{' '}
                <span className="font-semibold">
                  Upload Kegiatan, Materi, dan Tugas
                </span>{' '}
                untuk bahan laporan dan penarikan dana.
              </p>
              <ul className="list-disc list-inside pl-1 space-y-1 pt-2">
                <li>
                  <span className="font-semibold ">Tombol Detail</span> → Digunakan untuk{' '}
                  <span className="font-medium">melihat detail kelas</span>.
                </li>
                <li>
                  <span className="font-semibold">Tombol Upload</span> → Digunakan untuk{' '}
                  <span className="font-medium">mengunggah kegiatan</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>


        )}
         

  <div className="flex items-center justify-between mb-4 pt-4">
          <h3 className="text-lg font-bold text-green-800">Daftar Kelas</h3>
        </div>
      {/* Header Kelas */}

        {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('Berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }
      {  booking.map((b, i) => (

            
      <div key={i} className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
             <div className="flex-1">
             <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">
                Nama Kelas
             </p>
          <h1 className="md:text-xl text-lg font-bold text-green-800 mb-4">{b?.mapeldipilih}</h1>
          <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">

            <Users size={18} /> Max 1 - 3 Siswa
             
          </p>
       
       
        <div className="mt-4">
        <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">Siswa: <span className="font-bold">{b?.namamurid|| ''}</span></p>
        <p className="text-gray-500 text-sm flex items-center gap-2 mb-1">Status Kelas <span className="font-bold">{b?.statusbooking|| ''}</span></p>
       
              </div>
        </div>
       <div className="flex gap-3">
        
            {/* Tombol Konfirmasi */}
        {b?.statusbooking === 'Belum Mulai' && (

      <div className="relative group">
        <button 
       onClick={() => handleKomfirmasi(b?.idbookingprivate)}
         disabled={disabled}
        className={`${ disabled ? 'cursor-not-allowed opacity-50' : ''} bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200`}>
          <Check className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Konfirmasi
        </span>
      </div>

        )}
    

   <div className="grid grid-cols-1 gap-2 md:grid-cols-3 gap-2">
      {/* Tombol Detail */}
      <div className="relative group">
        <button 
         onClick={() => detail(b?.idbookingprivate)}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
          <Info className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Detail
        </span>
      </div>

      {b?.statusbooking === 'Sudah Mulai' && (

      <div className="relative group">
        <button 
        onClick={() => kegiatan(b?.idbookingprivate)}
        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-lg transition-colors duration-200">
          <Upload className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Upload Kegiatan
        </span>
      </div>

        )}

        
      {b?.statusbooking === 'Sudah Mulai' && (

      <div className="relative group">
       <button
       onClick={() =>
          window.open(`https://wa.me/${b?.noteleponortu}`, '_blank', 'noopener,noreferrer')
        } 
        className="bg-green-400 hover:bg-green-500 text-white p-2 rounded-lg transition-colors duration-200">
          <MessageCircle className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Hubungi WA Siswa
        </span>
      </div>

        )}
    </div>
    </div>
      </div>


          ))}
        
        
        
    
    </div>





      )}
      

      
 
                <ModalDetailKelas
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  bookingByID={bookingByID}
                />

                  <ModalKegiatan
                  isOpen={showModalKegiatan}
                  onClose={() => setShowModalKegiatan(false)}
                  bookingByID={bookingByID}
                />

            

        </>
    )
}

export default KelasAktif;