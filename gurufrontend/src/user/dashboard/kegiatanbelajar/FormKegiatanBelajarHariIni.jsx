import { useState, useRef } from 'react';
import axiosClient from '../../../lib/axios';
import toast from 'react-hot-toast';

const FormKegiatanBelajarHariIni = ({bookingByID}) => {
   

   const userId = bookingByID[0]?.iduser || null;
   const cameraInputRef = useRef(null);


    const [formData, setFormData] = useState({
      fotokegiatan: "",
      videokegiatan: "",
      linkmateri: "",
      namakegiatan: "",
      deskripsikegiatan: "",
      tglkegiatan:  new Date().toISOString().split('T')[0],
    });

    
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Simpan");



const handleChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData, 
            [name]: files ? files[0] : e.target.value
        });
    }

    
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
    if (val !== null && val !== "") {
      dataForm.append(key, val);
    }
    });

    
if (userId) {
      dataForm.append("idbookingprivate", bookingByID[0].idbookingprivate);
    }

    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset

      
        const toastLoading = toast.loading("Prosess...");
    try {
    
    await axiosClient.post("/api/kegiatanbelajar", dataForm);
   
                   
     toast.dismiss(toastLoading);
          toast.success("🎉 Berhasil Ditambahkan", {
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
        
         const data = err.response?.data || {};

        toast.error(`Maaf, Tidak Berhasil DiTambahkan , ${data?.messageerors}`, {  
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
       
            setErrors( data?.errors || { general: [ data?.message || "Ubah Data gagal."] });
          toast.dismiss(toastLoading);
    } finally {
      setDisabled(false);
      setTextButton("Simpan");
     
    }
  };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Kegiatan Belajar Hari Ini</h2>
                <p className="text-gray-600">Catat aktivitas pembelajaran yang telah dilakukan</p>
            </div>

             {/* Body */}
         <form className="p-2 md:p-6" onSubmit={handleSubmit}>
              <div className="px-4 py-5 sm:p-0  md:overflow-y-hidden">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-8">
            
               <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Siswa</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    placeholder="Masukkan nama lengkap"
                    value={bookingByID[0].namamurid}
                //    onChange={handleChange}
                   readOnly
                  />
                </div>

                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Wali Murid</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    placeholder="Masukkan nama lengkap"
                    value={bookingByID[0].namawalimurid}
                //    onChange={handleChange}
                   readOnly
                  />
                </div>

                 

                
                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Kegiatan</label>
                  <input 
                    type="text" 
                    name="namakegiatan"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                   placeholder="Masukkan Nama Kegiatan"
                   value={formData.namakegiatan}
                   required
                   onChange={handleChange}
                  />

                    {errors?.namakegiatan?.[0] && <small style={{color: 'red'}}>{errors.namakegiatan[0]}</small>}
                </div>

                  
                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Kegiatan</label>
                  <input 
                    type="text" 
                    name="deskripsikegiatan"
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                   placeholder="Masukkan Deskripsi Kegiatan"
                   value={formData.deskripsikegiatan}
                   required
                   onChange={handleChange}
                  />
                    {errors?.deskripsikegiatan?.[0] && <small style={{color: 'red'}}>{errors.deskripsikegiatan[0]}</small>}
                </div>

                <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kegiatan</label>
                   <input 
                    type="date" 
                    readOnly
                    name="tglkegiatan"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                     value={formData.tglkegiatan}
                     required
                   onChange={handleChange}
                  />
                </div>

                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Materi</label>
                  <input 
                    type="text" 
                    name="linkmateri"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    placeholder="Masukkan Link Materi Bisa Dari Google Drive / Dropbox / dll"
                     value={formData.linkmateri}
                     required
                   onChange={handleChange}
                  />

                    {errors?.linkmateri?.[0] && <small style={{color: 'red'}}>{errors.linkmateri[0]}</small>}
                </div>

                
                 <div className="col-span-2 md:col-span-1  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Kegiatan</label>
                    <input 
                        type="text" 
                        name="videokegiatan"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        placeholder="Masukkan Link Video Kegiatan dari Youtobe Anda"
                        value={formData.videokegiatan}
                       onChange={handleChange}
                    />
                  <span className="text-xs text-gray-400">Durasi Video minimal 5 Menit </span>

                    {errors?.videokegiatan?.[0] && <small style={{color: 'red'}}>{errors.videokegiatan[0]}</small>}
                </div>

                    <div className="col-span-2 md:col-span-1  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto <strong>wajib</strong></label>
                    
                    {/* Input file tersembunyi untuk kamera */}
                    <input 
                        ref={cameraInputRef}
                        required
                        type="file" 
                        name="fotokegiatan"
                        accept="image/*" 
                        capture="environment"
                        className="hidden"
                        
                        onChange={handleChange}
                    />
                    
                    {/* Tombol pilihan */}
                    <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform shadow-lg hover:shadow-xl flex items-center justify-center gap-3 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Ambil Foto
                    </button>
                    
                    {/* Preview foto jika ada */}
                    {formData.fotokegiatan && (
                        <div className="mt-2 p-2 border border-gray-200 rounded-lg bg-gray-50">
                            <p className="text-sm text-gray-600">File terpilih: {formData.fotokegiatan.name}</p>
                        </div>
                    )}
                    
                    <span className="text-xs text-gray-400">Format: JPG, Max size: 1MB </span>

                     {errors?.fotokegiatan?.[0] && <small style={{color: 'red'}}>{errors.fotokegiatan[0]}</small>}
                </div>

                </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-between md:justify-end items-center gap-4">
 
                <button
               
                type="submit"

                disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide text-sm font-semibold bg-green-700 text-white w-[50%] py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
                     
                     {textButton}
                </button>
</div>
            </div>
</form>
        </div>
    );
};

export default FormKegiatanBelajarHariIni;