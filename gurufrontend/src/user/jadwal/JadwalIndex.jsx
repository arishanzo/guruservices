
import { useAuth } from "../../context/AuthContext";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";
import { UseGetProfil } from "../../hook/useGetProfil";
import UsePageLoading from "../../hook/usePageLoading";
import SideNav from "../components/SideNav";
import JadwalKelas from "./JadwalKelas";

const JadwalIndex = () => {
  
    const { user } = useAuth();
    const { profil } = UseGetProfil(user?.idguru);
    const { booking } = UseBookingKelas(profil?.idprofilguru);



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