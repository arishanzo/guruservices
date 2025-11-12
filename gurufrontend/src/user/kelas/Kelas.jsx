
import SideNav from '../components/SideNav';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import PageKelas from './page/PageKelas';
import { UseGetProfil } from '../../hook/useGetProfil';

const Kelas = () => {
   
   
    const Navigate = useNavigate();
     const { user } = useAuth();
   
 const { profil, loading} = UseGetProfil(user?.idguru);
   
    return (
        <>
        
 <div className="flex bg-green-10">

    {/* Sidebar & Nabvar */}
     <SideNav />
   
    <div className="flex-1  py-24 top-0 min-h-screen w-[80%]">
            {loading ? (
                <>
                 <div className="p-8">
                 <div className="flex items-center justify-between mb-4 pt-4 animate-pulse">
  <div className="h-6 w-32 bg-gray-300 rounded"></div>
</div>

<div className="h-12 w-full bg-gray-200 rounded-lg mb-4 animate-pulse"></div>


  <div
    
    className="flex items-center justify-between bg-gray-50 border border-gray-200 p-6 rounded-2xl shadow-md shadow-gray-200 animate-pulse mb-4"
  >
    <div className="flex-1">
      <div className="h-3 w-24 bg-gray-300 rounded mb-2"></div>
      <div className="h-6 w-48 bg-gray-300 rounded mb-4"></div>
      <div className="h-3 w-32 bg-gray-200 rounded mb-2"></div>

      <div className="mt-4 space-y-2">
        <div className="h-3 w-40 bg-gray-200 rounded"></div>
        <div className="h-3 w-32 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div className="flex gap-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
        <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  </div>
  </div>
  </>
            ) : (
                     
                
                    <section className=" px-2 md:px-6 w-full">

                   {profil && (
                <PageKelas profil={profil} loading={loading}/>
                  ) }

                        </section>

        
            )}

            </div>
            </div>
        </>
    )
}

export default Kelas;