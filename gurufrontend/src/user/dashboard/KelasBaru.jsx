import { Calendar, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const KelasBaru = ( {booking} ) => {

const options = { day: "numeric", month: "long", year: "numeric" };


    const Navigate = useNavigate();

    const lihatKelas = () => {
        Navigate('/kelas');
    }

    const statusBooking = booking?.filter(
      status => status.statusbooking === 'Belum Mulai'
    );
    
    return (
        <> 
            {statusBooking?.length > 0 && (
                
    <div className=" bg-gradient-to-br from-slate-50 to-green-50 p-2 py-12 ">
      <div className="max-w-full mx-auto">
        <div className="mb-8">
          <h1 className="md:text-xl text-xl font-bold bg-gradient-to-r from-green-900 to-blue-600 bg-clip-text text-transparent mb-2">
            Selamat, Anda Mendapatkan Kelas Baru 🎉
          </h1>
        </div>

        <div className="grid gap-4 p-2">
          {statusBooking?.map((item) => (
            <div
              key={item.idbookingprivate}
              className={`group relative overflow-hidden backdrop-blur-sm border transition-all duration-300 hover:scale-[1.02]  bg-white/80 border-green-200 hover:shadow-xl hover:shadow-green-100/50
              rounded-3xl p-6 shadow-lg`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-3 h-3 rounded-full  bg-green-500`} />
                    <h2 className="text-xl font-bold text-green-800">
                      {item.mapeldipilih}
                    </h2>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 text-sm">
                      <div className="flex items-center gap-2 text-green-900">
                      <User size={16} className="text-green-500" />
                      <span>Siswa: {item.namamurid} </span>
                    </div>
                    <div className="flex items-center gap-2 text-green-900">
                      <Calendar size={16} className="text-green-500" />
                      <span>{new Date(item.created_at).toLocaleDateString("id-ID", options)}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
              
                    <button
                      onClick={() => lihatKelas()}
                      
                      className={`bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-2xl font-semibold hover:from-green-700 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}
                    >
                      Lihat Kelas
                    </button>
                </div>
              </div>
            
            </div>

            
          ))}
        </div>
      </div>
    </div>
            )}
        </>
    )
}

export default KelasBaru;