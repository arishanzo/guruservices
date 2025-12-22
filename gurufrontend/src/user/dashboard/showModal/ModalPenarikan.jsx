import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Wallet, CreditCard } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosClient from "../../../lib/axios";

const ModalPenarikan = ({ isOpen, onClose, emailGuru }) => {
 
  const [showOTP, setShowOTP] = useState(false);
  const [showInformation, setShowInformation] = useState(false);


  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [disabled, setDisabled] = useState(false);

  const [jumlah, setJumlah] = useState("");
  const saldoTersedia = 2500000; // Contoh saldo, bisa dari props atau state

   const [formOtp, setFormOtp] = useState({
     token: '',
     email: '',
 });



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (saldoTersedia === 0) {
      alert("Saldo tidak mencukupi untuk melakukan penarikan");
      return;
    } else if (parseInt(jumlah) > saldoTersedia) {
      alert("Jumlah penarikan melebihi saldo tersedia");
      return;
    } else {
    
     // Ganti dengan emailGuru dari props
     setDisabled(true);
     const toastLoading = toast.loading("Prosess...");

      try {
       await axiosClient.post('/api/vertifpenarikan/send-code', { email: emailGuru });
       toast.dismiss(toastLoading);

       
          toast.success("Kode veritifikasi Berhasil Di Kirim Ke Email", {
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
            
      setShowOTP(true);
      return;

    } catch (err) {
       if (err.response) {
          const data = err.response?.data || {};
        
      toast.error(`${data.errors}`, {
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
          }
    } finally {
      toast.dismiss(toastLoading);
      setDisabled(false);
    }
    }

   
    // onClose();
  };


  // Update formOtp when otp or email changes
     useEffect(() => {
       setFormOtp({
         token: otp.join(''),
         email: emailGuru,
       });
     }, [otp, emailGuru]);
     


 const handleKirimUlang = () => {
    setShowOTP(false)
  }
    
  // ===== HANDLE OTP VERIFICATION =====
  const handleVerifyOtp = async (e) => {

    e.preventDefault();
    
    setDisabled(true);

    const toastLoading = toast.loading("Prosess Mengirim...");

       try {

      //  await axiosClient.post('/api/vertifpenarikan/verify-code', formOtp);
       await axiosClient.post('/api/permintaanpenarikan', {
        tglpermintaanpenarikan: new Date().toISOString().split('T')[0],
        jumlahpenarikan: jumlah,
         statuspermintaan: 'pending',
       });

       toast.dismiss(toastLoading);

       toast.success("Suksess Kode Valid... Permintaan Berhasil Di Tambahkan", {
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
            
            
     setShowInformation(true);
     setShowOTP(false);

    } catch (err) {
       if (err.response) {
       
      toast.error(`maaf, Kode Tidak Valid`, {
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
          }
 
    } finally {
      toast.dismiss(toastLoading);
      setDisabled(false)
    }
  
  };


   // Handle OTP input
  const handleOtpChange = (value, index) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/, ""); // only digits
    setOtp(newOtp);

    // auto focus next
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };


  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (

        
      <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Wallet size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Penarikan Saldo</h2>
                  <p className="text-white/80 text-sm">Cairkan saldo Anda dengan mudah</p>
                </div>
              </div>
            </div>


            {/* Body */}
            <div className="p-6 space-y-6">

              {!showInformation && (
            <>
              <div className="bg-gradient-to-r from-green-50 to-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Saldo Tersedia</p>
                <p className="text-3xl font-bold text-gray-900">{formatRupiah(saldoTersedia)}</p>
                {saldoTersedia === 0 && (
                  <p className="text-red-500 text-sm mt-2">⚠️ Saldo tidak mencukupi untuk penarikan</p>
                )}
              </div>
              </>
          )}
          

      {!showOTP && !showInformation && (
         <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
          <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Jumlah */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Jumlah Penarikan
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={jumlah}
                      onChange={(e) => setJumlah(e.target.value)}
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-lg font-medium"
                      disabled={saldoTersedia === 0}
                      required
                    />
                  </div>
                </div>

             
              </form>
              </Motion.div>
      )}
           
      {showInformation && (
          <Motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 text-center"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        ✅ Permintaan Penarikan Berhasil
      </h2>
      <p className="text-gray-600 leading-relaxed mb-4">
        Permintaan penarikan Anda telah berhasil dikirim. <br />
        Silakan tunggu proses verifikasi dari tim kami dalam 1x24 jam. <br />
        Jika disetujui, dana akan segera ditransfer ke rekening Anda.
      </p>
      <div className="text-sm text-gray-500">
        Hubungi admin via WhatsApp:{" "}
        <span className="font-medium text-green-600">0888 0531 7354</span>
      </div>
    </Motion.div>

          )}

        {showOTP  && (
                <Motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <p className="text-gray-500 mb-6">
                    Masukkan 6 digit kode yang dikirim ke Email Anda <br/>
                  </p>
      
      <form onSubmit={handleVerifyOtp}>
                  <div className="flex justify-center space-x-3 mb-6">
                    {otp.map((value, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={value}
                        required
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                      />
                    ))}
                  </div>
      
                  
      
                  <button 
                   type="submit"
                  
                  disabled={disabled}
                      className={`${disabled ? 'cursor-not-allowed opacity-50' : ''
                      } w-full py-3 bg-gradient-to-br from-green-400  to-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all`} >
                          Verifikasi
                  </button>
      
      </form>
                   <button
                    onClick={() => handleKirimUlang()}
                    className="text-green-600 py-3 hover:underline text-sm font-semibold"
                  >
                    Kirim ulang kode
                  </button>
      
                </Motion.div>
              )}
      
            
            </div>


         { !showOTP && !showInformation && (
          <>
            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 text-gray-600 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saldoTersedia === 0 || !jumlah}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tarik Saldo
                </button>
              </div>
            </div>
            </>
        )}
           
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
  
    

};
export default ModalPenarikan;