import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import FormProfil from "./FormProfil";
import Keamanan from "./Keamanan";
import UploadFile from "./UploadFile";

const Profil = () => {

  const [activeTab, setActiveTab] = useState('profil');
  
  return (
    <>
      {/* Navbar di atas */}
      <NavbarUser />

      <div className="flex bg-red-10">
        {/* Sidebar di kiri */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1  md:p-[50px] md:p-28 md:pt-32 pt-16 pb-16 p-4  min-h-screen w-[80%]">
          
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button 
                onClick={() => setActiveTab('profil')}
               
               className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "profil" ? "border-red-500 text-red-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Ubah Profil
                </button>

                  <button 
                onClick={() => setActiveTab('uploadfile')}
               
               className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "uploadfile" ? "border-red-500 text-red-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Upload File
                </button>
              
              
                <button 
                 onClick={() => setActiveTab('keamanan')}
                className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "keamanan" ? "border-red-500 text-red-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Keamanan
                </button>
              </nav>
            </div>

            {/* Profile Content */}
            <div className="">
             

              {/* Form Fields */}
               
               {activeTab === 'profil' && <FormProfil />}
                {activeTab === 'uploadfile' && <UploadFile />}
               {activeTab === 'keamanan' && <Keamanan />}
                
               
                </div>
             </div>   
        </div>
      </div>
    </>
  );
};

export default Profil;