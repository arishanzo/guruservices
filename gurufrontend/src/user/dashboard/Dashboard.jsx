
import SideNav from "../components/SideNav";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";
import { useAuth } from "../../context/AuthContext";
import { UseGetProfil } from "../../hook/useGetProfil";
import Content from "./Content";
import { UseGetAbsensiGuru } from "../../hook/useGetAbsensiGuru";
import { UseGetKegiatanBelajar } from "../../hook/useGetKegiatanBelajar";
import { UseGetSaldoMasuk } from "../../hook/useGetSaldoMasuk";

const Dashboard = () => {
  const { user } = useAuth();
  const { profil } = UseGetProfil(user?.idguru);
  const { booking } = UseBookingKelas(profil?.idprofilguru);
  
  const { absensiGuru } = UseGetAbsensiGuru(profil?.idprofilguru);
  const { kegiatanBelajar} = UseGetKegiatanBelajar(user?.idguru);

  const { saldoMasuk }= UseGetSaldoMasuk() || [];


       
  return (

    <>
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1   top-0 min-h-screen w-[80%]">
          
  

           <div className="w-full h-full py-16 p-4 sm:pt-20 ">
          <Content dataBooking={booking}  absensiGuru={absensiGuru} kegiatanBelajar={kegiatanBelajar} saldoMasuk={saldoMasuk}/>
        </div>

      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Dashboard;