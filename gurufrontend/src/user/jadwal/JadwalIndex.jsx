
import { useAuth } from "../../context/AuthContext";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";
import { UseGetProfil } from "../../hook/useGetProfil";
import UsePageLoading from "../../hook/usePageLoading";
import SideNav from "../components/SideNav";
import JadwalKelas from "./JadwalKelas";

const JadwalIndex = () => {
  
    const { pageLoading} = UsePageLoading();
    const { user } = useAuth();
    const { profil } = UseGetProfil(user?.idguru);
    const { booking } = UseBookingKelas(profil?.idprofilguru);


  if (!booking || pageLoading) {
    return (
   <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-greem-50 to-green-100">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                    Go-Pintar
                </h2>
                <p className="text-gray-600 mt-2 animate-pulse">Memuat...</p>
            </div>
        </div>
    );
  }

  return (

    <>
  <div className="flex bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
     
              <div className="w-full h-full py-24 p-4 sm:pt-24 ">
          <JadwalKelas booking={booking}/>
        </div>

    

      </div>
 
 

  </div>


</>
  );
}   
export default JadwalIndex;