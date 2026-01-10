
import SideNav from "../components/SideNav";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";
import { useAuth } from "../../context/AuthContext";
import { UseGetProfil } from "../../hook/useGetProfil";
import Content from "./Content";
import { UseGetAbsensiGuru } from "../../hook/useGetAbsensiGuru";
import { UseGetKegiatanBelajar } from "../../hook/useGetKegiatanBelajar";
import { UseGetSaldoMasuk } from "../../hook/useGetSaldoMasuk";
import KelasBaru from "./KelasBaru";
import { UseGetPermintaanPenarikan } from "../../hook/useGetPermintaanPenarikan";

const Dashboard = () => {
  const { user } = useAuth();
  const { profil, loading: profilLoading } = UseGetProfil(user?.idguru ?? null);

  // Only fetch dependent data when profil is available
const { booking } = UseBookingKelas(profil?.idprofilguru) || {};
  const { absensiGuru } = UseGetAbsensiGuru(profil?.idprofilguru ?? null);


    const { penarikan } = UseGetPermintaanPenarikan(profil?.idprofilguru);

  // These can load independently
  const { kegiatanBelajar} = UseGetKegiatanBelajar(user?.idguru ?? null);
  const { saldoMasuk }= UseGetSaldoMasuk() || [];

  // Show loading state while profil is loading
  if (profilLoading) {
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
  <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
    {/* Main content area */}
    <div className="flex-1 bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50  top-0 min-h-screen w-[80%]">
          
  

           <div className="w-full h-full bg-gr py-16 p-4 sm:pt-20 ">
            <KelasBaru booking={booking} />
          <Content dataBooking={booking} absensiGuru={absensiGuru} kegiatanBelajar={kegiatanBelajar} saldoMasuk={saldoMasuk} getProfil={profil?.idprofilguru} getEmail={user?.email} penarikan={penarikan} user={user}/>
        </div>

      </div>
 
 

  </div>


</>




     
    

  
  );
}   

export default Dashboard;