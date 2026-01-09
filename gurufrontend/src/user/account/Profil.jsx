import NavbarUser from "../components/NavbarUser";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import FormProfil from "./FormProfil";
import Keamanan from "./Keamanan";
import UploadFile from "./UploadFile";
import { ArrowLeft } from "lucide-react";

const Profil = () => {

  const [activeTab, setActiveTab] = useState('profil');
  
  return (
    <>
      {/* Navbar di atas */}
      <NavbarUser />

      <div className="flex bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
        {/* Sidebar di kiri */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1  md:p-[50px] md:p-28 md:pt-20 pt-16 pb-16 p-4 mt-8   min-h-screen w-[80%]">
                                  <button
  onClick={() => window.history.back()}
  className="flex  items-center space-x-2 px-4  py-4 mb-3  bg-green-100 hover:bg-green-200 text-green-700 rounded-md"
>
  <ArrowLeft className="w-4 h-4" />
</button>

      
          {/* Tab Navigation */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
            
            
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 py-6 pl-2">
           

                <button 
                onClick={() => setActiveTab('profil')}
               
               className={` px-1 border-b-2 font-medium text-sm  ${activeTab === "profil" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Profil
                </button>

                  <button 
                onClick={() => setActiveTab('uploadfile')}
               
               className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "uploadfile" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                  Upload File
                </button>
              
              
                <button 
                 onClick={() => setActiveTab('keamanan')}
                className={`py-4 px-1 border-b-2 font-medium text-sm  ${activeTab === "keamanan" ? "border-green-500 text-green-600" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
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