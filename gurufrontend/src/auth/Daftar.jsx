
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import UsePageLoadig from "../hook/usePageLoading";


const Daftar = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   
    const navigate = useNavigate();

    const { pageLoading} = UsePageLoadig();

    
    const [status, setStatus] = useState(null);

    const [textButton, setTextButton] = useState('Daftar Akun');

      const [errors, setErrors] = useState({});

    const [disabled, setDisabled] = useState(false);

    // form

    const [formData, setFormData] = useState({
        nama_user: '', 
        email_user: '',
        password_user: '',
    });



    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setDisabled(true);
        setTextButton('Sedang mendaftar...');
        if (formData.password_user !== formData.confirm_password_user) {
            setStatus('Password tidak cocok / Berbeda');
            setDisabled(false);
            setTextButton('Daftar Akun');
            return;
        }else{
           try {
            await axiosClient.post('/api/daftar', formData);
            setStatus('Pendaftaran berhasil! Silakan masuk.');
            

            setFormData({ nama_user: '', email_user: '', password_user: '' });
            setTextButton('Kirim');
             setDisabled(false);
          setStatus('Pendaftaran berhasil! Mengalihkan ke login...');
            setTimeout(() => {
                navigate("/");
            }, 3000)

        } catch (err) {
               if (err.response) {
        console.error(err.response.data.message);

        setErrors(err.response.data.errors || {});

      
        
        setStatus("Pendaftaran gagal. Silakan coba lagi.");
          setDisabled(false);
            setTimeout(() => setStatus(''), 3000);
              setTextButton('Daftar Akun');
      } else {
        setStatus("Terjadi kesalahan server.");
        console.error(err);
           setDisabled(false);
            setTextButton('Daftar Akun');
      }
    }
}
    };

    if (pageLoading) {
    return <div className="min-h-screen flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                </div>
    }

    return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
  <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">

    {/* LEFT - ANIMATION */}
    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br w-full h-full border-0 from-green-500 to-emerald-600 p-6">
                <DotLottieReact
                            src="https://lottie.host/ea3e0d94-5700-42d3-bdc5-73c15c67ea4e/kRlHYG28kQ.lottie"
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                            />
    </div>

    {/* RIGHT - FORM */}
    <div className="p-8 md:p-12">

        
      {/* LOGO */}
      <img
        src="./img/logo/logogopintar.png"
        alt="Logo Go-Pintar"
        className="mx-auto h-36 "
      />


      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Daftar Go-Pintar Untuk Guru
      </h2>
      <p className="text-gray-500 text-center mt-2 mb-8">
        Lengkapi data untuk membuat akun baru
      </p>

      {status && (
        <div
          className={`mb-6 text-center text-sm font-medium ${
            status.includes("berhasil")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {status}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NAMA */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama_user"
            value={formData.nama_user}
            onChange={handleChange}
            required
            placeholder="Masukkan nama lengkap"
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
          {errors?.nama_user?.[0] && (
            <p className="text-xs text-red-500 mt-1">
              {errors.nama_user[0]}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email_user"
            value={formData.email_user}
            onChange={handleChange}
            required
            placeholder="email@example.com"
            className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
          />
          {errors?.email_user?.[0] && (
            <p className="text-xs text-red-500 mt-1">
              {errors.email_user[0]}
            </p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password_user"
              value={formData.password_user}
              onChange={(e) => {
                handleChange(e)
                setPassword(e.target.value)
              }}
              required
              placeholder="Minimal 8 karakter"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm
                focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                👁
              </button>
            )}
          </div>
          {errors?.password_user?.[0] && (
            <p className="text-xs text-red-500 mt-1">
              {errors.password_user[0]}
            </p>
          )}
        </div>

        {/* KONFIRMASI PASSWORD */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Konfirmasi Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password_user"
              value={formData.confirm_password_user}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                handleChange(e)
              }}
              required
              placeholder="Ulangi password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 pr-10 text-sm
                focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {confirmPassword && (
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              >
                👁
              </button>
            )}
          </div>
        </div>

        {/* BUTTON */}
        <button
          disabled={disabled}
          type="submit"
          className={`w-full py-3 rounded-xl font-semibold text-white transition
            ${
              disabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90"
            }`}
        >
          {textButton}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Sudah punya akun?
          <a
            href="/"
            className="text-green-600 font-medium hover:underline ml-1"
          >
            Masuk
          </a>
        </p>
      </form>
    </div>
  </div>
</div>
    );
    }   
export default Daftar;