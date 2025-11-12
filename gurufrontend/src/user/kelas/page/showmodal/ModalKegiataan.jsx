import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {  useState } from "react";
import axiosClient from "../../../../lib/axios";

const ModalKegiatan = ({ isOpen, onClose,  bookingByID }) => {

    const tglbooking = bookingByID?.tgl__booking__kelas || [];
    
   const userId = bookingByID?.iduser || null;

    
  const options = { day: "numeric", month: "long", year: "numeric" };

    const [formData, setFormData] = useState({
      fotokegiatan: "",
      videokegiatan: "",
      linkmateri: "",
      namakegiatan: "",
      deskripsikegiatan: "",
      tglkegiatan: "",
    });

    
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
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
      dataForm.append("idbookingprivate", bookingByID.idbookingprivate);
    }

    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset

    try {
      
    
    await axiosClient.post("/api/kegiatanbelajar", dataForm);
   
      setStatus('Data Kegiatan Berhasil Disimpan');
      
    } catch (err) {
        
    //   console.error("Ubah Data error:", err);
    //   console.log("Status:", err.response.status);
    // console.log("Data:", err.response.data); 
    //   console.log("Errors:", err.response.data.errors);
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Ubah Data gagal."] });
      setStatus( err.response.data.messageerors);
      setFormData("");
       setTextButton("Simpan");
    } finally {
      setDisabled(false);
      setTextButton("Simpan");
      setFormData("");
      setTimeout(() => setStatus(""), 3000);
    }
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Konten Modal */}
        <Motion.div
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl w-full max-h-[90vh] md:relative md:rounded-2xl md:max-w-4xl md:mx-auto overflow-hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-green-700">Tambah Kegiatan</h2>
            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            >
            <X size={24} />
            </button>
        </div>


            {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('Berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }

            {/* Body */}
         <form className="p-2 md:p-6" onSubmit={handleSubmit}>
              <div className="px-4 py-5 sm:p-0 max-h-[80vh] overflow-y-auto md:overflow-y-hidden">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-8">
            
               <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Siswa</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    placeholder="Masukkan nama lengkap"
                    value={bookingByID.namamurid}
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
                    value={bookingByID.namawalimurid}
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
                   onChange={handleChange}
                  />
                    {errors?.deskripsikegiatan?.[0] && <small style={{color: 'red'}}>{errors.deskripsikegiatan[0]}</small>}
                </div>

                <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Kegiatan</label>
                  <select 
                   name="tglkegiatan"
                   value={formData.tglkegiatan || ''}
                    onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                     <option value="">Pilih Tanggal Jadwal Kelas</option>
                    {tglbooking?.map((tgl) => (
                        <option key={tgl.idtglbooking} value={tgl.tglbooking}>
                      {new Date(tgl.tglbooking).toLocaleDateString("id-ID", options)}
                        </option>
                    ))}
                  </select>
                </div>

                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Materi</label>
                  <input 
                    type="text" 
                    name="linkmateri"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                    placeholder="Masukkan Link Materi Bisa Dari Google Drive / Dropbox / dll"
                     value={formData.linkmateri}
                   onChange={handleChange}
                  />

                    {errors?.linkmateri?.[0] && <small style={{color: 'red'}}>{errors.linkmateri[0]}</small>}
                </div>

                
                 <div className="col-span-2 md:col-span-1  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video Kegiatan</label>
                    <input 
                        type="text" 
                        name="videokegiatan"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                        placeholder="Masukkan Link Video Kegiatan dari Youtobe Anda"
                        value={formData.videokegiatan}
                       onChange={handleChange}
                    />
                  <span className="text-xs text-gray-400">Durasi Video minimal 5 Menit </span>

                    {errors?.videokegiatan?.[0] && <small style={{color: 'red'}}>{errors.videokegiatan[0]}</small>}
                </div>

                    <div className="col-span-2 md:col-span-1  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Upload Foto <strong>(Opsional)</strong></label>
                    <input 
                        type="file" 
                        name="fotokegiatan"
                        accept="image/*" 
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" 
                       
                       onChange={handleChange}
                    />
                  <span className="text-xs text-gray-400">Format: JPG, Max size: 1MB </span>

                     {errors?.fotokegiatan?.[0] && <small style={{color: 'red'}}>{errors.fotokegiatan[0]}</small>}
                </div>

                </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-between md:justify-end items-center gap-4">
              <p className="text-gray-500 text-xs md:hidden">
                *Scroll Ke Bawah
              </p>

 
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

          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalKegiatan;
