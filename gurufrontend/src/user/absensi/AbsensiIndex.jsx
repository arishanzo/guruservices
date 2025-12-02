import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { UseGetProfil } from "../../hook/useGetProfil";
import UsePageLoadig from "../../hook/usePageLoading";
import SideNav from "../components/SideNav";
import AbsensiForm from "./AbsensiForm";

const AbsensiIndex = () => {
  
    
      const { user } = useAuth();
      const { profil } = UseGetProfil(user?.idguru);


    useEffect(() => {

      if (!profil) return;
      document.title = "Absensi | GoPintar Guru";

    }, [profil]);

    UsePageLoadig();
  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     
              <div className="w-full h-full py-24 p-4 sm:pt-24 ">
          <AbsensiForm profil={profil} />
        </div>

    

      </div>
 
 

  </div>


</>
  );
}   
export default AbsensiIndex;