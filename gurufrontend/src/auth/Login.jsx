
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../lib/axios";
import { useAuth } from "../context/AuthContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { isNetworkError } from "../utils/connectionCheck";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email_user: "",
    password_user: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [textButton, setTextButton] = useState("Sign In");

  const handleChange = (e) =>
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setTextButton("Sedang Masuk…");
    setErrors({}); // reset

    try {
      // 1) ambil CSRF cookie
      await axiosClient.get("/sanctum/csrf-cookie");
      await axiosClient.post("/api/login", formData);
    
      const userResponse = await axiosClient.get("/api/user");
      await login(userResponse.data);
      
      setStatus("Login berhasil. Mengalihkan ke dashboard...");
      
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
   
      
    } catch (err) {
      // console.error("Login error:", err);
      
      if (isNetworkError(err)) {
        setStatus("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
      } else {
        const data = err.response?.data || {};
        setErrors(data.errors || { general: [data.message || "Login gagal."] });
        setStatus(data.message || "Login gagal. Silakan coba lagi.");
      }
    } finally {
      setDisabled(false);
      setTextButton("Sign In");
      setTimeout(() => setStatus(""), 3000);
    }
  };


    return (
        <>
 <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 ">
          <div className="flex items-center mb-4">
            <a
              href="/"
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
       
              <span className="text-2xl w-10 h-10 mr-2">
              ⭠
              </span>
            </a>
          </div>
          <div>
            <img
              src="./img/logo/logogopintar.png"
              className="mx-auto h-80"
              alt="Logo"
            />

            
          </div>
        

        


          <div className=" flex flex-col items-center">
            <div className="w-full flex-1 ">
                <h1 className="text-2xl font-bold text-center mb-2">
                    Login Aplikasi Sebagai Guru
                    </h1>
   <p className="text-center text-gray-600 mb-6"> 
                    Les Privat Terbaik di Indonesia & No. 1
                </p>
                               {status && 
                                <div 
                                role="alert"
                                className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                                    {status}
                                </div>              
                           }


              <div className="mx-auto max-w-xs">


            <form  onSubmit={handleSubmit}>

                 <div className="mb-4">
                   <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="namalengkap">
                     Email
                  </label>

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="email"
                  value={formData.email_user}
                   onChange={handleChange}
                  placeholder="Masukan Email Anda"
                  name="email_user"
                />
            {errors?.email_user?.[0] && <small style={{color: 'red'}}>{errors.email_user[0]}</small>}

                </div>

                
                <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700" htmlFor="namalengkap">
              Password
              </label>    
             <input
                                                     value={formData.password_user}
                                         onChange={handleChange}

                              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2"
                              type="password"
                                name='password_user'
                              placeholder="Masukan Password Anda"
                            />

              {errors?.password_user?.[0] && <small style={{color: 'red'}}>{errors.password_user[0]}</small>}
            </div>
                <button 
                type="submit"
                  disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } mt-5 tracking-wide font-semibold bg-blue-400 text-white w-full py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>
                  <svg
                    className="w-6 h-6 -ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <path d="M20 8v6M23 11h-6" />
                  </svg>
                  <span className="ml-4">{textButton}</span>
                </button>

</form>

                <div className="flex mt-4 flex-col items-center">



              </div>


               <hr className="mb-6 border-t" />
                   <div className="text-center">
                                    <a className="inline-block font-semibold text-sm text-blue-600 align-baseline hover:text-blue-800"
                                        href="/lupapassword">
                                       Lupa Password, Klik Disini?
                                    </a>
                                </div>
                                
                                <div className="text-center">
                                    <a className="inline-block text-sm text-blue-600 align-baseline hover:text-blue-800"
                                        href="/daftar">
                                        Belum Punya Akun? Daftar Sekarang
                                    </a>
                                </div>

                <p className="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Cartesian Kinetics{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-blue-50 text-center hidden lg:flex">
                
            <DotLottieReact
                            src="https://lottie.host/ea3e0d94-5700-42d3-bdc5-73c15c67ea4e/kRlHYG28kQ.lottie"
                            loop
                            autoplay
                            />
       
        </div>
      </div>
    </div>
 </>
    );
};

export default Login;