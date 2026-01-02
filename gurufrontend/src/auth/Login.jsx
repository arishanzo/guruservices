
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
  <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
    <div className="max-w-6xl w-full bg-white rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-2">

      {/* LEFT - FORM */}
      <div className="p-8 md:p-12 flex flex-col justify-center">

        {/* LOGO */}
        <img
          src="./img/logo/logogopintar.png"
          className="mx-auto h-40 mb-4"
          alt="Logo Go-Pintar"
        />

        <h1 className="text-2xl font-bold text-center text-gray-800">
          Login Go-Pintar
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Les Privat Terbaik & No.1 di Indonesia
        </p>

        {status && (
          <div
            role="alert"
            className={`mb-6 text-sm text-center px-4 py-3 rounded-xl font-medium
              ${
                status.includes("berhasil")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
          >
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm mx-auto w-full">

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
            <input
              type="password"
              name="password_user"
              value={formData.password_user}
              onChange={handleChange}
              placeholder="Masukkan password"
              className="mt-1 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm
              focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            {errors?.password_user?.[0] && (
              <p className="text-xs text-red-500 mt-1">
                {errors.password_user[0]}
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

        {/* LINKS */}
        <div className="mt-6 text-center space-y-2 text-sm">
          <a
            href="/lupapassword"
            className="text-green-600 hover:underline font-medium"
          >
            Lupa Password?
          </a>
          <p className="text-gray-500">
            Belum punya akun?
            <a
              href="/daftar"
              className="ml-1 text-green-600 font-medium hover:underline"
            >
              Daftar sekarang
            </a>
          </p>
        </div>

        {/* FOOTER */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          Dengan login, Anda menyetujui
          <a href="#" className="underline mx-1">
            Terms of Service
          </a>
          &
          <a href="#" className="underline ml-1">
            Privacy Policy
          </a>
        </p>
      </div>

      {/* RIGHT - ANIMATION */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600 p-6">
         <DotLottieReact
                            src="https://lottie.host/ea3e0d94-5700-42d3-bdc5-73c15c67ea4e/kRlHYG28kQ.lottie"
                            loop
                            autoplay
                            style={{ width: '100%', height: '100%' }}
                            />
    </div>
    </div>
  </div>
 </>
    );
};

export default Login;