import {  useState } from "react";
import { UseBookingKelas } from "../../../../hook/useGetBookingKelas";
import ModalTugas from "../showmodal/ModalTugas";
import { useAuth } from "../../../../context/AuthContext";
import { UseTugasBelajar } from "../../../../hook/useGetTugasBelajar";

import {  Edit, Pencil, Trash} from "lucide-react";
import ModalNilai from "../showmodal/ModalNilai";
import { UseNilaiTugas } from "../../../../hook/useGetNilaiTugas";
import ModalEditTugas from "../showmodal/ModalEditTugas";
import axiosClient from "../../../../lib/axios";

import { toast } from "react-hot-toast";

const TugasNilai = ({ profil }) => {

    
  const options = { day: "numeric", month: "long", year: "numeric" };

    const { booking } = UseBookingKelas(profil?.idprofilguru);

    const { user } = useAuth();
    
    const { nilaiTugas } = UseNilaiTugas(user?.idguru);
    const { tugasBelajar} = UseTugasBelajar(user?.idguru);

    const [selectedTugasBelajar, setSelectedTugasBelajar] = useState(null);
    const [selectedHapus, setSelectedHapus] = useState(null);


  const [status, setStatus] = useState("");
 

    const [showModalTugas, setShowModalTugas] = useState(null);
    const [showModalNilai, setShowModalNilai] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalHapus, setShowModalHapus] = useState(false);


      const tambahTugas = () => {
              if(booking.length === 0){
                toast.error("Maaf, Kelas Belum Ada Anda Tidak Dapat Menambahkan Tugas.", {
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
              }else{
              setShowModalTugas(true);
              }
    };


      const tambahEdit = (idtugasbelajar) => {
            const selected = tugasBelajar.find(
              (b) => b?.idtugasbelajar === idtugasbelajar
            );
            if (selected) {
              setSelectedTugasBelajar(selected);
              setShowModalEdit(true);
            } 
          };

          const hapusTugas = (idtugasbelajar) => {
              const selected = tugasBelajar.find(
              (b) => b?.idtugasbelajar === idtugasbelajar
            );
            if (selected) {
              setSelectedHapus(selected);
              setShowModalHapus(true);
            } 
          }

    const tambahNilai = (idtugasbelajar) => {

    const selected = tugasBelajar.find(
              (b) => b?.idtugasbelajar === idtugasbelajar
            );

            
    const ceknilai = nilaiTugas.find(
              (n) => n?.idtugasbelajar === idtugasbelajar
            );

    if ( ceknilai) {
      toast.error("Maaf, Anda Sudah Menginputkan Nilai Tugas.", {
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
              return;
    }

    if(selected.statustugas === 'belum selesai') { 
      
      toast.error("Maaf, Tugas Belum Dikerjakan Siswa.", {  
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
              return;
    }
    
    if (selected) {
              setSelectedTugasBelajar(selected);
              setShowModalNilai(true);
     }


    };

    
    const [textButtonHapus, setTextButtonHapus] = useState("Hapus");
    const handleHapus = async (selectedHapus) => {
      try {
        setTextButtonHapus('Prosess...')

        const toastLoading = toast.loading("Memproses data...");
        // kirim request DELETE ke backend
         await axiosClient.delete(`/api/tugasbelajar/${selectedHapus.idtugasbelajar}`);
        toast.dismiss(toastLoading);
        
        setShowModalHapus(false);
          toast.success("🎉 Data Tugas Berhasil Dihapus", {
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
            
        setTimeout(() => window.location.reload(), 2000);
      

      } catch (err) {
        setStatus("Gagal menghapus data:", err.response?.data || err.message);
      } finally {
        setTextButtonHapus('Hapus');
      }
    };

    return (

        <>

     {status && 
                                <div 
                                role="alert"
                                className={`flex items-start gap-3 p-4 bg-red-50 border-l-4 border-red-400 rounded-md shadow-sm w-full text-sm text-red-800 space-y-1 mb-4 font-bold"'}`}>
                                   <strong> {status}</strong>
                                </div>              
                           }

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
                <strong>Penting:</strong> Data Tugas & Nilai Akan{' '}
                <span className="font-semibold">
                  Hilang / Hapus 
                </span>
              {' '}  Otomatis Apabila Melampaui Tanggal Deadline Tugas
              </p>
             
            </div>
          </div>

  <div className="flex items-center justify-between mb-4 pt-4">
        


    <div class="flex-1 items-center w-full mx-auto mb-3 space-y-4 sm:flex sm:space-y-0">
  <div class="relative w-full">
    <div class="items-center justify-center mx-auto w-full">

<button 
 onClick={() => tambahTugas()}
    type="button"
        class="flex justify-center items-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none" 
        id="drop"
      >
        <span class="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" 
               class="w-6 h-6 text-gray-600" 
               fill="none" viewBox="0 0 24 24" 
               stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" 
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12">
            </path>
          </svg>
          <span class="font-medium text-gray-600">
            Tambah Tugas Siswa
          </span>
        </span>
      
      </button>


    </div>
  </div>
</div>
  </div>





<div className="flex items-center justify-between mb-4 pt-4">
  <h3 className="text-lg font-bold text-green-800">Daftar Tugas Siswa</h3>
</div>

 { !tugasBelajar ? (
         <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200 animate-pulse">
  <div className="flex-1">
    <div className="h-3 w-32 bg-gray-300 rounded mb-2"></div>
    <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
  </div>
</div>

        ) : tugasBelajar.length === 0 ? (

          <div className="flex flex-col md:flex-row  md:items-center md:justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
  <div className="flex-1">
    <p className="text-gray-500 text-sm flex items-center gap-2 mb-2">
      Tugas Belum Ada
    </p>
    <h1 className="md:text-xl text-lg font-bold text-green-800 mb-4">
    Tugas Belum Ada
    </h1>

  </div>

</div>

          
        ) : (
< div className="space-y-4">
          {tugasBelajar.map((t, i) => (
<div  key={i} className="flex flex-col md:flex-row  md:items-center md:justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200">
  <div className="flex-1">
    <h1 className="md:text-xl text-lg font-bold text-green-800 ">
     {t.namatugas}
    </h1>

    <div className="mt-2 space-y-2">
      <p className="text-gray-500 text-sm flex items-center gap-2 mb-4">
        <span className="font-medium"> {t.deskripsitugas}</span>
      </p>

        <p className="text-gray-500 text-sm flex items-center gap-2">
        Siswa: <span className="font-bold text-gray-600">
         {booking?.find((b) => b?.bookingprivate === t.bookingprivate)?.namamurid || "-"}</span>
      </p>
      <p className="text-gray-500 text-sm flex items-center gap-2">
        Deadline: <span className="font-bold text-red-600">
          {new Date(t.tgldeadlinetugas).toLocaleDateString("id-ID", options)}
        </span>
      </p>
      <p className="text-gray-500 text-sm flex items-center gap-2">
        Link Tugas: 
        <button
        onClick={() =>
            window.open(`${t?.filetugas}`, '_blank', 'noopener,noreferrer')
          } className="font-semibold text-grey-500 underline">
            Lihat Tugas</button>
      </p>
      <p className="text-gray-500 text-sm flex items-center gap-2">
        Status: <span className="font-semibold text-gray-500">{t.tgldeadlinetugas < new Date().toISOString() ? "Terlambat" :
         t.statustugas}</span>
      </p>

       <p className="text-gray-500 text-sm flex items-center gap-2">
        Nilai: <span className="font-semibold text-gray-500">
           <span className="font-bold text-green-500"> {nilaiTugas?.find((n) => n?.idtugasbelajar === t.idtugasbelajar)?.nilaitugas || "-"}</span>  {''}/100
        </span>
      </p>
    </div>
    
  </div>
  
  <div className="flex gap-3 pt-8">

 {/* Tombol Detail */}
      <div className="relative group">
        <button 
         onClick={() => (tambahNilai(t.idtugasbelajar))}
        className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-lg transition-colors duration-200">
          <Pencil className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Nilai Tugas
        </span>
      </div>

       {/* Tombol Edit */}
      <div className="relative group">
        <button 
         onClick={() => (tambahEdit(t.idtugasbelajar))}
        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200">
          <Edit className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Edit
        </span>
      </div>


   {/* Tombol Hapus */}
      <div className="relative group">
        <button 
         onClick={() => (hapusTugas(t.idtugasbelajar))}
        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors duration-200">
          <Trash className="w-5 h-5" />
        </button>
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-800 text-white text-xs rounded px-2 py-1">
          Edit
        </span>
      </div>

     
  </div>
</div>
 
  ))}
</div>
        )}
          <ModalTugas
                  isOpen={showModalTugas}
                  onClose={() => setShowModalTugas(false)}
                  booking={booking} 
                />

                   <ModalNilai
                  isOpen={showModalNilai}
                  onClose={() => setShowModalNilai(false)}
                  selectedTugasBelajar={selectedTugasBelajar} 
                  booking={booking} 
                />

                   <ModalEditTugas
                  isOpen={showModalEdit}
                  onClose={() => setShowModalEdit(false)}
                  editTugas={selectedTugasBelajar} 
                  booking={booking} 
                />


     {/* Modal Popup */}
            {showModalHapus && (
               <div 
  className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  onClick={() => setShowModalHapus(false)}
>
  <div 
    className="bg-white rounded-lg p-6 max-w-sm mx-4 relative"
    onClick={(e) => e.stopPropagation()}
  >
    {/* Tombol X */}
    <button
      onClick={() => setShowModalHapus(false)}
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
      <p className="text-sm text-gray-500 mb-4">Apa Anda Yakin Hapus Data Tugas Ini</p>
    <div className="grid grid-cols-2 gap-4">
  <button
   onClick={() => handleHapus(selectedHapus)}
    className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
  >
    {textButtonHapus}
  </button>
  <button
     onClick={() => setShowModalHapus(false)}
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

export default TugasNilai;