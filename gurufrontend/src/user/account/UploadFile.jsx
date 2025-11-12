import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../lib/axios";
import { UseGetFileGuru } from "../../hook/useGetFileGuru";

const UploadFile = () => {

    
      const { user } = useAuth();

    const [disabled, setDisabled] = useState(false);
    const [textButton, setTextButton] = useState("Upload");
    const [status, setStatus] = useState(null);
    const [errors, setErrors] = useState({});

    
      // ambil data profil per id
      const { fileguru, error } = UseGetFileGuru(user?.idguru);


    const [formData, setFormData] = useState({
      file_cv: "",
      file_ijazah: "",
      file_sertifikat: "",
      file_portofolio: "",
    });

    useEffect(() => {
      if (fileguru) {
        setFormData((prev) => ({
          ...prev,
          file_cv: fileguru.file_cv || "",
            file_ijazah: fileguru.file_ijazah || "",
            file_sertifikat: fileguru.file_sertifikat || "",
            file_portofolio: fileguru.file_portofolio || "",
        }));
      }
    }, [fileguru]);

    
    const handleChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData, 
            [name]: files ? files[0] : e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true);
        setTextButton("Uploading...");
        setStatus(null);
         setDisabled(true);

        setErrors({});
        try {

            const formPayload = new FormData();  
            Object.entries(formData).forEach(([key, val]) => {
                formPayload.append(key, val);
            });

            const response = await axiosClient.post("/api/fileguru", formPayload);

            console.log("Form response:", response.data);
            setStatus("Upload berhasil.");
            setFormData({
                file_cv: "",
                file_ijazah: "",
                file_sertifikat: "",
                file_portofolio: ""
            });
            setTimeout(() => setStatus(""), 3000);
            
      setTimeout(() => window.location.reload(), 3000);

        } catch (error) {
            console.error("Upload error:", error);
            setErrors(error.response?.data?.errors || { general: [error.response?.data?.message || "Upload gagal."] });
            setStatus("Upload gagal. Silakan coba lagi.");
            setTimeout(() => setStatus(""), 3000);
            
      setTimeout(() => window.location.reload(), 3000);
        } finally {
            setDisabled(false);
            setTextButton("Upload");
            
      setTimeout(() => window.location.reload(), 3000);
        }   
    }

 if (error) return (
  <p style={{ color: "red" }}>
    {typeof error === "string" ? error : error.message || "Error"}
  </p>
);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold mb-4">Upload File Dokumen Pendukung</h2>
      
        <form className="space-y-4" onSubmit={handleSubmit}>
             {status && <div className={`mb-4 p-3 rounded ${status.includes("berhasil") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                {status}
            </div>}
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="file">Upload File CV:</label>
                <input type="file" 
                 name="file_cv"
                 accept="application/pdf"
                onChange={handleChange}
                id="file_cv" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                
                {fileguru?.file_cv && (
                    <div className="mt-2">
                      <iframe
                    src={`/api/filesguru/${encodeURIComponent(fileguru.file_cv)}`}
                    width="100%"
                    height="600px"
                    title="CV PDF"
                    className="border rounded"
                    />

                    </div>
                )}

                  <span className="text-xs text-gray-400">Format: PDF, Max size: 2MB Jadikan Satu File</span>

                 {errors?.file_cv?.[0] && <small style={{color: 'red'}}>{errors.file_cv[0]}</small>}
  
            </div>

                <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="file">Upload File Ijazah dan Transkip Nilai:</label>
                <input type="file" 
                 name="file_ijazah"
                 accept="application/pdf"
                onChange={handleChange}
                id="file_ijazah" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                
                {fileguru?.file_ijazah && (
                    <div className="mt-2">
                        <a href={`/api/filesguru/${encodeURIComponent(fileguru.file_ijazah)}`} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-500 underline text-sm">📄 Lihat Ijazah</a>
                    </div>
                )}
                 <span className="text-xs text-gray-400">Format: PDF, Max size: 2MB Jadikan Satu File</span>

                
                 {errors?.file_ijazah?.[0] && <small style={{color: 'red'}}>{errors.file_ijazah[0]}</small>}
            </div>

               <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="file">Upload File Sertifikat Seminar / Keahlian dll:</label>
                <input type="file" 
                 name="file_sertifikat"
                 accept="application/pdf"
                onChange={handleChange}
                id="file_sertifikat" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                
                {fileguru?.file_sertifikat && (
                    <div className="mt-2">
                        <a href={`/api/filesguru/${encodeURIComponent(fileguru.file_sertifikat)}`} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-500  underline text-sm">📄 Lihat Sertifikat</a>
                    </div>
                )}

                <span className="text-xs text-gray-400">Format: PDF, Max size: 2MB Jadikan Satu File</span>

                
                 {errors?.file_sertifikat?.[0] && <small style={{color: 'red'}}>{errors.file_sertifikat[0]}</small>}
            </div>


               <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="file">Upload File Portofolio Ngajar</label>
                <input type="file" 
                 name="file_portofolio"
                 accept="application/pdf"
                onChange={handleChange}
                id="file_portofolio" 
                className="w-full px-3 py-2 border border-gray-300 rounded-lg" />
                
                {fileguru?.file_portofolio && (
                    <div className="mt-2">
                        <a href={`/api/filesguru/${encodeURIComponent(fileguru.file_portofolio)}`} 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="text-blue-500 underline text-sm">📄 Lihat Portofolio</a>
                    </div>
                )}

                 <span className="text-xs text-gray-400">Format: PDF, Max size: 2MB Jadikan Satu File</span>

                
                 {errors?.file_portofolio?.[0] && <small style={{color: 'red'}}>{errors.file_portofolio[0]}</small>}
            </div>

            <button type="submit" 
             disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide text-sm font-semibold bg-red-700 text-white w-full py-4 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
                     
                {textButton}</button>   
        </form>
    </div>
  );
}
export default UploadFile;