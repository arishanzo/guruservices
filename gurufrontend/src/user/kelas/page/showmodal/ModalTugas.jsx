import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axiosClient from "../../../../lib/axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
const ModalTugas = ({ isOpen, onClose, booking }) => {

   
    const [formData, setFormData] = useState({
        idbookingprivate: "",
        namatugas: "",
        deskripsitugas:  "",
        tanggaltugas: "",
        filetugas:  "",
        statustugas:  "belum selesai",
        catatantugas:  "",
        tgldeadlinetugas:  "",
    });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Tambah Tugas");



  const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
    if (val !== null && val !== "") {
      dataForm.append(key, val);
    }
    });
    
     
    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset

    try {
    

    const loadingtoast = toast.loading('Memproses Data Tugas...');
    
    await axiosClient.post(`/api/tugasbelajar`, dataForm);
    toast.dismiss(loadingtoast);
    
      toast.success("🎉 Data Tugas Berhasil DiTambahkan", {
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
    
   
      
       setTimeout(() => window.location.reload(), 5000);
    } catch (err) {
        
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Tambah Data gagal."] });
      setStatus( err.response.data.messageerors);
       setTextButton("Tambah Tugas");
    } finally {
      setDisabled(false);
      setTextButton("Tambah Tugas");
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
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl w-full max-h-full md:relative md:rounded-2xl md:max-w-4xl md:mx-auto overflow-hidden"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ duration: 0.3 }}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-green-700">Tambah Tugas Siswa</h2>
           
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
              <div className="px-4 py-5 sm:p-0 max-h-[80vh] md:max-h-full overflow-y-auto md:overflow-y-hidden">
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-2 md:gap-8">
            
                  <div className="col-span-2 md:col-span-1 p-1 mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Pilih Nama Siswa</label>
                  <select 
                   name="idbookingprivate"
                   value={formData.idbookingprivate || ''}
                    onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                     <option value="">Pilih Nama Siswa</option>
                    {booking?.map((b, i) => (
                        <option key={i} value={b?.idbookingprivate}>
                            {b.namamurid} - Kelas {b.kelas} {b.tingkatSekolah}
                        </option>
                    ))}
                  </select>
                </div>

                 
                
                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Tugas</label>
                  <input 
                    type="text" 
                    name="namatugas"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                   placeholder="Masukkan Nama Kegiatan"
                   value={formData.namatugas}
                   onChange={handleChange}
                  />

                    {errors?.namatugas?.[0] && <small style={{color: 'red'}}>{errors.namatugas[0]}</small>}
                </div>

                  
                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Tugas</label>
                  <input 
                    type="text" 
                    name="deskripsitugas"
                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                   placeholder="Masukkan Deskripsi Kegiatan"
                   value={formData.deskripsitugas}
                   onChange={handleChange}
                  />
                    {errors?.deskripsitugas?.[0] && <small style={{color: 'red'}}>{errors.deskripsitugas[0]}</small>}
                </div>

              

                 <div className="col-span-2 md:col-span-1  mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Link Tugas / File Tugas</label>
                  <input 
                    type="text" 
                    name="filetugas"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                    placeholder="Masukkan Link Tugas / File Tugas dari Google Form "
                     value={ formData.filetugas}
                   onChange={handleChange}
                  />

                    {errors?.filetugas?.[0] && <small style={{color: 'red'}}>{errors.filetugas[0]}</small>}
                </div>

                
                 <div className="col-span-2 md:col-span-2  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Catatan Tugas</label>
                    <textarea
                        type="text" 
                        name="catatantugas"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                        placeholder=""
                        value={formData.catatantugas}
                       onChange={handleChange}
                    />

                    {errors?.catatantugas?.[0] && <small style={{color: 'red'}}>{errors.catatantugas[0]}</small>}
                </div>


        <div className="col-span-2 md:col-span-1  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal  Tugas</label>
                    <input 
                        type="date" 
                        name="tanggaltugas"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                 
                        value={formData.tanggaltugas}
                       onChange={handleChange}
                    />

                    {errors?.tanggaltugas?.[0] && <small style={{color: 'red'}}>{errors.tanggaltugas[0]}</small>}
                </div>


             <div className="col-span-2 md:col-span-1  mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Deadline Tugas</label>
                    <input 
                        type="date" 
                        name="tgldeadlinetugas"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent" 
                        placeholder="Masukkan Link Video Kegiatan dari Youtobe Anda"
                        value={formData.tgldeadlinetugas}
                       onChange={handleChange}
                    />

                    {errors?.tgldeadlinetugas?.[0] && <small style={{color: 'red'}}>{errors.tgldeadlinetugas[0]}</small>}
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

          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalTugas;
