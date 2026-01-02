import { useState } from 'react';
import axiosClient from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';
import { UseGetRekening } from '../../hook/useGetRekening';

const RekeningBank = () => {
    

        const { user } = useAuth();
          // ambil data profil per id
    const { filerekening, error, loading } = UseGetRekening(user?.idguru);
    
    

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Simpan Rekening");


  const [cardData, setCardData] = useState({
    norekening: '',
    nama_bank: '',
    pemilikrekening: '',
  });


      const handleChange = (e) => {
     
        setCardData({
            ...cardData, [e.target.name]: e.target.value
        });
    };

  const formatCardNumber = (norekening) => {
    return norekening.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataForm = new FormData();
    Object.entries(cardData).forEach(([key, val]) => {
      dataForm.append(key, val);
    });
    
   
  
    setDisabled(true);
    setTextButton("Prosess");
    setErrors({}); // reset

    try {
      
    
    const response = await axiosClient.post("/api/tambahrekening", dataForm);
   

      console.log("Form response:", response.data);
      setStatus("Ubah Data Rekening berhasil.");
      
      setTimeout(() => window.location.reload(), 3000);
      
    } catch (err) {
      console.error("Ubah Data Rekening error:", err);
      const data = err.response?.data || {};
      setErrors(data.errors || { general: [data.message || "Ubah Data Rekening gagal."] });
      setStatus("Ubah Data Rekening gagal. Silakan coba lagi.");
      setCardData("");
       setTextButton("Simpan Rekening");
    } finally {
      setDisabled(false);
      setTextButton("Simpan Rekening");
      setTimeout(() => setStatus(""), 3000);
    }
  };


      
 if (error) return (
  <p style={{ color: "red" }}>
    {typeof error === "string" ? error : error.message || "Error"}
  </p>
);

  return (

<div className="p-4 md:p-6 shadow-xl bg-gray-50 rounded-2xl space-y-8">
<div className="mb-10 p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white">
  <h2 className="text-2xl font-bold">
    Rekening Bank
  </h2>
  <p className="text-sm opacity-90 mt-1">
    Atur rekening bank untuk pencairan dana
  </p>
</div>


  {loading ? (
    /* SKELETON LOADING */
    <div className="bg-white p-6 rounded-2xl shadow-sm animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-56 bg-gray-200 rounded-2xl" />
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
          <div className="h-12 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white p-6 rounded-2xl ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* CARD PREVIEW */}
        <div className="flex justify-center lg:justify-center items-center">
          <div className="w-full max-w-sm h-56 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-6 text-white shadow-xl relative">
            <div className="flex justify-between">
              <span className="text-sm opacity-80">Rekening Bank</span>
              <span className="font-semibold">
                {filerekening?.nama_bank || "Nama Bank"}
              </span>
            </div>

            <div className="mt-8 text-xl tracking-widest font-light">
              {filerekening?.norekening
                ? formatCardNumber(filerekening.norekening)
                : "•••• •••• •••• ••••"}
            </div>

            <div className="absolute bottom-6 left-6">
              <p className="text-xs opacity-70">Atas Nama</p>
              <p className="font-medium tracking-wide">
                {filerekening?.pemilikrekening || "Nama Anda"}
              </p>
            </div>

            <div className="absolute bottom-6 right-6 w-10 h-7 bg-yellow-300 rounded-md" />
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {status && (
            <div
              role="alert"
              className={`text-sm text-center px-4 py-3 rounded-xl font-medium
                ${
                  status.includes("berhasil")
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
            >
              {status}
            </div>
          )}

          {/* NO REKENING */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nomor Rekening
            </label>
            <input
              type="text"
              name="norekening"
              value={cardData.norekening}
              onChange={handleChange}
              maxLength={19}
              required
              placeholder="1234 5678 9012"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {errors?.norekening?.[0] && (
              <p className="text-xs text-red-500 mt-1">
                {errors.norekening[0]}
              </p>
            )}
          </div>

          {/* NAMA BANK */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Nama Bank
            </label>
            <input
              type="text"
              name="nama_bank"
              value={cardData.nama_bank}
              onChange={handleChange}
              required
              placeholder="BCA, BRI, Mandiri"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {errors?.nama_bank?.[0] && (
              <p className="text-xs text-red-500 mt-1">
                {errors.nama_bank[0]}
              </p>
            )}
          </div>

          {/* ATAS NAMA */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Atas Nama
            </label>
            <input
              type="text"
              name="pemilikrekening"
              value={cardData.pemilikrekening}
              onChange={handleChange}
              required
              placeholder="Nama pemilik rekening"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {errors?.pemilikrekening?.[0] && (
              <p className="text-xs text-red-500 mt-1">
                {errors.pemilikrekening[0]}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={disabled}
            className={`w-full py-3 rounded-xl font-semibold text-white transition
              ${
                disabled
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
              }`}
          >
            {textButton}
          </button>
        </form>
      </div>
    </div>
  )}
</div>

 
  );
 
};

export default RekeningBank;