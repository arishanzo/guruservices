import { useEffect, useState } from "react";

import { motion  as Motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, LockOpen, ArrowLeft} from "lucide-react";

import { useNavigate } from "react-router-dom";


import { toast } from "react-hot-toast";
import axiosClient from "../lib/axios";

const EmailVertif = () => {


 const navigate = useNavigate();

  const [sent, setSent] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [timer, setTimer] = useState(3);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  
    const [disabled, setDisabled] = useState(false);

  

//  handle Email
  const [formEmail, setFormEmail] = useState({
     email: '',
 });

   const handleChangeEmail = (e) => {
        setFormEmail({
            ...formEmail, [e.target.name]: e.target.value
        });
    };

  const handleSubmitEmail = async (e) => {

    e.preventDefault();

  setDisabled(true);


    const toastLoading = toast.loading("Prosess...");

    try {

       await axiosClient.post('/api/password/send-code', formEmail);
       toast.dismiss(toastLoading);

       
          toast.success("Kode Berhasil Di Kirim Ke Email", {
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
            
            setSent(true)

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
    
       

  };

  
  
  
  
  
  useEffect(() => {
    if (sent && !showOTP && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (sent && timer === 0) {
      setShowOTP(true);
    }
  }, [sent, timer, showOTP]);


  const handleKirimUlang = () => {
    setShowOTP(false)
    setSent(false);
    setTimer(3);
  }

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


   const [formOtp, setFormOtp] = useState({
     token: '',
     email: '',
 });

   // Update formOtp when otp or email changes
   useEffect(() => {
     setFormOtp({
       token: otp.join(''),
       email: formEmail.email,
     });
   }, [otp, formEmail.email]);
   
  
  // ===== HANDLE OTP VERIFICATION =====
  const handleVerifyOtp = async (e) => {

    e.preventDefault();
      setDisabled(true);

    const toastLoading = toast.loading("Prosess Mengirim...");

       try {

       await axiosClient.post('/api/password/verify-code', formOtp);
       toast.dismiss(toastLoading);

       
          toast.success("Suksess Kode Valid...", {
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
            
            
     setShowPasswordChange(true);

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
      setDisabled(false)
    }
    

  
  };



 

 const [formPassword, setFormPassword] = useState({
     oldPassword: '',
     newPassword: '',
     comfrimPasssword: '',
     token: '',
     email: '',
 });

   // Update formPassword when otp or email changes
   useEffect(() => {
     setFormPassword(prev => ({
       ...prev,
       token: otp.join(''),
       email: formEmail.email,
     }));
   }, [otp, formEmail.email]);

   const handleChangePassword = (e) => {
        setFormPassword({
            ...formPassword, [e.target.name]: e.target.value
        });
    };


  // ===== HANDLE PASSWORD CHANGE =====
  const handleSubmitPassword = async (e) => {
    e.preventDefault();

  setDisabled(true);

    if (formPassword.newPassword !== formPassword.comfrimPasssword) {

       return toast.error(`Maaf, Password Tidak Sama.`, {  
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


           
        const toastLoading = toast.loading("Prosess...");

         try {

       await axiosClient.post('/api/password/reset', formPassword);
       toast.dismiss(toastLoading);

       
          toast.success("Suksess Berhasil Update Password", {
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
            
            
      // reset flow
    setShowPasswordChange(false);
    setShowOTP(false);
    setSent(false);
    setFormEmail("");
    setOtp(["", "", "", "", "", ""]);

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
       
        
    
   

  };

  const handleBack = () => {
    if (showPasswordChange) {
      setShowPasswordChange(false);
      setShowOTP(true);
    } else if (showOTP) {
      setShowOTP(false);
      setSent(false);
    } else if (sent) {
      setSent(false);
    } else if (!sent) {
        navigate('/login');
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-4">
     <Motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
         className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 relative"
      >

        
          {/* === PANAH KEMBALI === */}
        {( !sent ||sent || showOTP || showPasswordChange) && (
          <Motion.button
            onClick={handleBack}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-4 left-6 text-indigo-800 hover:text-indigo-600 transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </Motion.button>
        )}


       {/* ICON LOCK → ARROW → MAIL */}
        <div className="flex justify-center  relative py-8">
          <div className="flex items-center space-x-4">
            <Motion.div
              key={showPasswordChange ? 'password' : 'emailpassword'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-indigo-100 p-4 rounded-full shadow-sm"
            >
            {showPasswordChange ? (
            <LockOpen className="w-7 h-7 text-indigo-600" />
                ): (
            <Lock className="w-7 h-7 text-indigo-600" />
            )}
             
            </Motion.div>

            <Motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5, repeat: Infinity, repeatType: "mirror" }}
            >
              <ArrowRight className="w-6 h-6 text-indigo-500" />
            </Motion.div>

            <Motion.div
              key={showOTP ? 'otp' : 'email'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="bg-indigo-100 p-4 rounded-full shadow-sm"
            >
                {showOTP ? (
                <ShieldCheck className="w-7 h-7 text-indigo-600" />
              ) : (
                <Mail className="w-7 h-7 text-indigo-600" />
              )}
            </Motion.div>
          </div>
        </div>

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-indigo-800 mb-2">
             {showPasswordChange
                ? "Ubah Password"
                : showOTP
                ? "Masukkan Kode Verifikasi"
                : "Lupa Password?"}
        </h1>
        <p className="text-gray-400  text-xs text-center mb-6">
         Silahkan Masukkan email Anda dan kami akan mengirimkan kode verifikasi untuk ubah password baru anda.
        </p>

         {/* STEP 1 - EMAIL FORM */}
        {!sent && !showOTP && !showPasswordChange  && (
             <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
          <form onSubmit={handleSubmitEmail} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm  font-medium text-gray-400 mb-4"
              >
                Alamat Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formEmail.email}
                  onChange={handleChangeEmail}
                  required
                  placeholder="contoh@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
               disabled={disabled}
                className={`${disabled ? 'cursor-not-allowed opacity-50' : ''
                } w-full py-3 bg-gradient-to-br from-indigo-400  to-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all`} >
              Kirim Kode
            </button>
          </form>

                
          </Motion.div>
        )}

    {/* STEP 2 - TIMER SCREEN */}
        {sent && !showOTP && !showPasswordChange && (
          <Motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 mb-4">
              <p className="text-indigo-700 font-medium">
                ✅ Kode verifikasi telah dikirim ke:
              </p>
              <p className="text-indigo-800 mt-1">{formEmail.email}</p>
            </div>
            <p className="text-gray-500">
              Mengalihkan ke halaman verifikasi dalam{" "}
              <span className="font-semibold text-indigo-600">{timer}</span> detik...
            </p>
          </Motion.div>
        )}


  {/* STEP 3 - OTP INPUT */}
        {showOTP && !showPasswordChange && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-500 mb-6">
              Masukkan 6 digit kode yang dikirim ke <br />
              <span className="font-medium text-indigo-600">{formEmail.email}</span>
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
                  className="w-10 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              ))}
            </div>

            

            <button 
             type="submit"
            
            disabled={disabled}
                className={`${disabled ? 'cursor-not-allowed opacity-50' : ''
                } w-full py-3 bg-gradient-to-br from-indigo-400  to-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all`} >
                    Verifikasi
            </button>

</form>
             <button
              onClick={() => handleKirimUlang()}
              className="text-indigo-600 py-3 hover:underline text-sm font-semibold"
            >
              Kirim ulang kode
            </button>

          </Motion.div>
        )}


        
        {/* ===== STEP 4 - CHANGE PASSWORD ===== */}
        {showPasswordChange && (
          <Motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5"
          >
    <form onSubmit={handleSubmitPassword} className="space-y-5">
            <div>
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password Lama
              </label>
              <input
                type="password"
                id="oldPassword"
                name="oldPassword"
                required
                value={formPassword.oldPassword}
                onChange={handleChangePassword}
                placeholder="Masukkan password lama"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password Baru
              </label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                required
                value={formPassword.newPassword}
                onChange={handleChangePassword}
                placeholder="Masukkan password baru"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>


              <div>
              <label
                htmlFor="comfrimPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password Baru
              </label>
              <input
                type="password"
                id="comfrimPasssword"
                name="comfrimPasssword"
                required
                value={formPassword.comfrimPasssword}
                onChange={handleChangePassword}
                placeholder="Masukkan Komfirmasi Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
               disabled={disabled}
                className={`${disabled ? 'cursor-not-allowed opacity-50' : ''
                } w-full py-3 bg-gradient-to-br from-indigo-400  to-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all`} >
             
              Simpan Password Baru
            </button>

                </form>
          </Motion.div>
        )}


      </Motion.div>
    </div>
  ); 
}

export default EmailVertif;