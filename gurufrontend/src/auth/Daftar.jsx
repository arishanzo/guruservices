
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
        <div className="h-full bg-gray-100">
            <div className="mx-auto">
                <div className="flex justify-center px-6 py-12">
                    <div className="w-full xl:w-3/4 lg:w-11/12 flex">
                        <div className="w-full h-auto bg-blue-100 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg">
                           <DotLottieReact
                            src="https://lottie.host/ea3e0d94-5700-42d3-bdc5-73c15c67ea4e/kRlHYG28kQ.lottie"
                            loop
                            autoplay
                            />
                        </div>
                        <div className="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
                            <h3 className="py-4 text-2xl text-center text-gray-800 font-semibold">Daftar Sebagai Guru</h3>
                            <p className="text-center  text-gray-600 mb-6">      
                             Pastikan semua informasi yang diberikan akurat dan lengkap.
                            </p>

                                 {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }


                            <form className="px-2 pt-6 pb-8 mb-4 bg-white rounded" onSubmit={handleSubmit}>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="namalengkap">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="namalengkap"
                                        value={formData.nama_user}
                                         onChange={handleChange}
                                        type="text"
                                        name="nama_user"
                                        required
                                        placeholder="Masukan Nama Anda"
                                    />
                                    {errors?.nama_user?.[0] && <small style={{ color: 'red' }}>{errors.nama_user[0]}</small>}

                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                                        id="email"
                                        name='email_user'
                                        value={formData.email_user}
                                         onChange={handleChange}
                                        type="email"
                                        required
                                        placeholder="Masukan Email Anda"
                                    />

                                    {errors?.email_user?.[0] && <small style={{color: 'red'}}>{errors.email_user[0]}</small>}

                                            </div>


                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline pr-10"
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.password_user}
                                            name='password_user'
                                            required
                                            onChange={(e) => {
                                                handleChange(e);
                                                setPassword(e.target.value)
                                            } }
                                            placeholder="Masukan Password Anda"
                                        />
                                        
                                        {password && (
                                            <button
                                                type="button"
                                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                                                    </svg>
                                                )}
                                            </button>
                                        )}
                                    </div>

                                      {errors?.password_user?.[0] && <small style={{color: 'red'}}>{errors.password_user[0]}</small>}
                                </div>

                                <div className="mb-4">
                                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="k_password">
                                        Konfirmasi Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline pr-10"
                                            id="k_password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            value={formData.confirm_password_user}
                                            required
                                            name='confirm_password_user'
                                            onChange={(e) => {
                                            setConfirmPassword(e.target.value);
                                            handleChange(e);
                                        }}
                                            placeholder="Konfirmasi Password Anda"
                                        />
                                        {confirmPassword && (
                                            <button
                                                type="button"
                                                className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                {showConfirmPassword ? (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                                                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                                                    </svg>
                                                ) : (
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd"/>
                                                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"/>
                                                    </svg>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>

                              
                                <div className="mb-6 text-center">
                                    <button
                                        disabled={disabled}
                                        className={`${
                                            disabled ? 'cursor-not-allowed opacity-50' : ''
                                           } w-full px-4 py-2 font-bold text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline`}
                                        type="submit"
                                    >
                                        {textButton}
                                    </button>
                                </div>
                                <hr className="mb-6 border-t" />
                                <div className="text-center">
                                    <a className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800"
                                        href="/">
                                        Sudah punya akun? Masuk!
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    }   
export default Daftar;