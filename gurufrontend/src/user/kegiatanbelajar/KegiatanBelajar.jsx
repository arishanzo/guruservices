import { useNavigate } from "react-router-dom";
import { UseGetProfil } from "../../hook/useGetProfil";
import { useAuth } from "../../context/AuthContext";
import PageKegiatanBelajar from "./page/PageKegiatanBelajar";
import PageNonKegiatanBelajar from "./page/PageNonKegiatanBelajar";
import SideNav from "../components/SideNav";
import { UseGetKegiatanBelajar } from "../../hook/useGetKegiatanBelajar";

const KegiatanBelajar = () => {
    
    const Navigate = useNavigate();
     const { user } = useAuth();
   
     const handleRedirectToKelas = () => {
        Navigate('/kelas');
    };

 const { kegiatanBelajar} = UseGetKegiatanBelajar(user?.idguru);

    return (
       <>
 <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1  py-24 top-0 min-h-screen w-[80%]">
            {!kegiatanBelajar ? (
                
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col ">
                <div className="flex flex-col py-4 animate-pulse">
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>

              <div className="bg-white shadow-lg shadow-green-100 rounded-2xl h-full min-h-[250px]">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="h-5 w-2/3 bg-gray-300 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded mb-6" />
                  <div className="h-3 w-1/3 bg-gray-200 rounded mb-1" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded mb-10" />

                  <div className="flex items-center gap-4 text-gray-400 mt-auto">
                    <div className="w-5 h-5 bg-gray-300 rounded" />
                    <div className="w-5 h-5 bg-gray-300 rounded" />
                    <div className="w-5 h-5 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
            </div>
            ) : (
                     
                
                    <section className=" px-2 md:px-6 w-full">

                   {kegiatanBelajar.length === 0 ? (
                       <PageNonKegiatanBelajar handleRedirectToKelas={handleRedirectToKelas} />
                  ) : (
                      <PageKegiatanBelajar kegiatanBelajar={kegiatanBelajar}/>
                      )}

                        </section>

        
            )}

            </div>
            </div>
        </>
    
    )
}

export default KegiatanBelajar;