import { useState } from 'react';
import axiosClient from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';
import { UseGetRekening } from '../../hook/useGetRekening';

const RekeningBank = () => {
    

        const { user } = useAuth();
          // ambil data profil per id
    const { filerekening, error } = UseGetRekening(user?.idguru);
    
    

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


    <div className='md:p-4 p-2 py-4'>
       <div className="mb-6">
        <h2 className="text-xl mb-2 font-semibold text-gray-800">Rekening Bank</h2>
        <p className="text-gray-600 text-md ">Kelola informasi rekening bank Anda untuk menerima pembayaran.</p>
      </div>

 {!filerekening ? (
<div className="mx-auto bg-white p-6 max-w-7xl rounded-lg shadow-md animate-pulse">
  <div className="grid grid-cols-1 lg:grid-cols-2">
    {/* Card Loading - Left Side */}
    <div className="flex items-start">
      <div className="relative w-full mb-8" style={{height: '230px', maxWidth: '380px'}}>
        <div className="absolute w-full h-full bg-gray-300 rounded-2xl"></div>
      </div>
    </div>
    
    {/* Form Loading - Right Side */}
    <div className="space-y-6">
      <div className="h-12 bg-gray-300 rounded-lg"></div>
      <div className="h-12 bg-gray-300 rounded-lg"></div>
      <div className="h-12 bg-gray-300 rounded-lg"></div>
      <div className="h-12 bg-gray-300 rounded-lg"></div>
    </div>
  </div>
</div>
 ): (


    <div className="mx-auto bg-white p-6 max-w-7xl  rounded-lg shadow-md">
   

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Card Preview - Left Side */}
        <div className="flex items-start">
          <div className="card-flip relative w-full mb-8" style={{height: '230px', maxWidth: '380px'}}>
            <div className={`card-inner absolute w-full h-full shadow-lg rounded-2xl transition-transform duration-700 `}>
          
              <div className="card-front absolute w-full h-full bg-red-600 rounded-2xl p-6">
                <div className="flex justify-between items-start">
                  <div className="text-white font-light text-lg tracking-wider">Rekening Bank</div>
                  <div className="text-white text-md font-bold italic">{filerekening?.nama_bank  || 'Nama Bank' }</div>
                </div>
                
                <div className="mt-6">
                  <div className="w-12 h-9 bg-yellow-400 rounded-md mb-3"></div>
                </div>
                
                <div className="text-white text-xl tracking-widest mb-4 font-light">
                  {filerekening?.norekening ? formatCardNumber(filerekening.norekening) : '•••• •••• •••• ••••'}
                </div>
                
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="text-white opacity-70 text-xs mb-1">Atas Nama</div>
                    <div className="text-white tracking-wide">{filerekening?.pemilikrekening || 'Nama Kamu'}</div>
                  </div>
                  <div>
                    
                  </div>
                </div>
              </div>
              
             
            </div>
          </div>

        </div>



        
 <form  onSubmit={handleSubmit}>
        
        {/* Form Input - Right Side */}
        <div className="space-y-6">
                   {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }
          <div className="relative">
            <input
              type="text"
              required
              value={cardData.norekening}
              name='norekening'
             onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="No Rekening"
              maxLength="19"
            />
                  {errors?.norekening?.[0] && <small style={{color: 'red'}}>{errors.norekening[0]}</small>}
            <div className="absolute right-3 top-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
          </div>

           
          <div className="relative">
            <input
              type="text"
              required
              name='nama_bank'
              value={cardData.nama_bank}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="Nama Rekening"
            />

                  {errors?.nama_bank?.[0] && <small style={{color: 'red'}}>{errors.nama_bank[0]}</small>}
          </div>
          
          <div className="relative">
            <input
              type="text"
              required
              name='pemilikrekening'
              value={cardData.pemilikrekening}
             onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              placeholder="Atas Nama"
            />

                  {errors?.pemilikrekening?.[0] && <small style={{color: 'red'}}>{errors.pemilikrekening[0]}</small>}
          </div>
          
        
          
        
          
          <button
            type="submit"
                disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300`}
           
          >
            {textButton}
          </button>
          
        </div>
        </form>
      </div>
    </div>
      )} 
      
    </div>
 
  );
 
};

export default RekeningBank;