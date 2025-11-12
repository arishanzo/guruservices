import { useState } from 'react';
import axiosClient from '../../lib/axios';


const Keamanan = () => {
    

    const [showcurrent_password, setShowcurrent_password] = useState(false);
    const [showpassword, setShowpassword] = useState(false);
    const [showpassword_confirmation, setShowpassword_confirmation] = useState(false);

    
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [textButton, setTextButton] = useState("Ubah Password");


    const [formData, setFormData] = useState({
        current_password: '',
        password: '',
        password_confirmation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit =  async (e) => {


        e.preventDefault();
        
         setDisabled(true);
         setTextButton("Prosess");
        setErrors({}); // reset



            try {
                console.log("=== DEBUG INFO ===");
                console.log("Sending data:", formData);
                
                const response = await axiosClient.put("/api/profile/ubahpassword", formData);
                console.log("Form response:", response.data);
                setStatus(response.data.message);
                setFormData({ current_password: '', password: '', password_confirmation: '' });

            } catch (err) {
                
                const data = err.response?.data || {};
                setErrors(data.errors || {});
                setStatus(data.message || "Ubah Password gagal.");

            } finally {
                setDisabled(false);
                setTextButton("Ubah Password");
                setTimeout(() => setStatus(""), 3000);
            }
       
    };

    return (
       

        <div className="w-full mx-auto p-6">
            
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Keamanan Akun</h2>

            
                   {status && 
                 <div 
                  role="alert"
                 className={`text-center mb-4 ${status?.includes('berhasil') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3 ' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                    {status}
                 </div>              
                   }

            
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Ubah Password</h3>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Saat Ini
                        </label>
                        <div className="relative">
                            <input
                                type={showcurrent_password ? "text" : "password"}
                                name="current_password"
                                value={formData.current_password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                                placeholder="Masukkan password saat ini"
                            />

                            
                            {formData.current_password && (
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowcurrent_password(!showcurrent_password)}
                                >
                                    {showcurrent_password ? (
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
                        
                    {errors?.current_password?.[0] && <small style={{color: 'red'}}>{errors.current_password[0]}</small>}

                    </div>


                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password Baru
                        </label>
                        <div className="relative">
                            <input
                                type={showpassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                                placeholder="Masukkan password baru"
                            />
                            {formData.password && (
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowpassword(!showpassword)}
                                >
                                    {showpassword ? (
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
                        
                     {errors?.password?.[0] && <small style={{color: 'red'}}>{errors.password[0]}</small>}

                    </div>


                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Konfirmasi Password Baru
                        </label>
                        <div className="relative">
                            <input
                                type={showpassword_confirmation ? "text" : "password"}
                                name="password_confirmation"
                                value={formData.password_confirmation}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 pr-10"
                                placeholder="Konfirmasi password baru"
                            />
                            {formData.password_confirmation && (
                                <button
                                    type="button"
                                    className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowpassword_confirmation(!showpassword_confirmation)}
                                >
                                    {showpassword_confirmation ? (
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
                         {errors?.password_confirmation?.[0] && <small style={{color: 'red'}}>{errors.password_confirmation[0]}</small>}

                    </div>

                    

                    <button
                        type="submit"
                      disabled={disabled}
                    className={`${
                        disabled ? 'cursor-not-allowed opacity-50' : ''
                        } mt-5 tracking-wide text-sm font-semibold bg-green-700 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}>                 
                        
                     {textButton}
                </button>
                </form>
            </div>
        </div>
    );
}

export default Keamanan;