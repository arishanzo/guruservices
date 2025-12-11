import { useEffect, useMemo, useState } from 'react';
import ProgresProfil from '../progresprofil/ProgresProfil';
import { getMenuDashboard } from '../../lib/MenuItems/getMenuDashboard';
import { Wallet } from 'lucide-react';
import DashboardSkeleton from './DashboardSkeleton ';
import AbsenHariIni from './absen/AbsenHarIni';
import BelumAdaAbsen from './absen/BelumAdaAbsen';

const Content = ({ dataBooking }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [status, setStatus] = useState('');


  const allBookingDates = useMemo(() => {
         return dataBooking && dataBooking.length > 0 
           ? dataBooking.flatMap(item => item.tgl__booking__kelas || []) 
           : [];
       }, [dataBooking]);

const filterDate = allBookingDates?.find(
  date => date.tglbooking === new Date().toISOString().split('T')[0]
);

  

  const data = getMenuDashboard();

  const moreMenus = [
    { id: 7, judul: 'Rekening', icon: '📋' },
    { id: 8,  judul: 'Riwayat', icon: '📋' },
    { id: 9, judul: 'Bantuan', icon: '❓' },
  ];

  const handleMenuClick = (item) => {
    if (item.judul === 'Lainnya') {
      setShowMoreMenu(true);
    }
  };



   useEffect(() => {
    if(dataBooking){
           const alreadyShown = localStorage.getItem("bookingKelasShow");

          if (!alreadyShown) {
            setStatus('Selamat, Anda Mempunyai Kelas Baru Silahkan Komfirmasi Sekarang');
            localStorage.setItem("bookingKelasShow", "true");
          }
      }


       }, [dataBooking]);

 const totalSaldoSaatIni = 500000;

  if (!dataBooking) {
      return <DashboardSkeleton />;
    }

  return (
    <>

    <div className="p-2 pt-8">
 
  {status && 
   <div className='py-4'>
                 <div 
                  role="alert"
                 className={`text-start mb-4 ${status?.includes('Kelas Baru')  ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                    {status}
                 </div>              
                    <a href='/kelas' className='text-gray-500 px-2 font-semibold text-xs mb-4'>
        Lihat Kelas!
        </a>
        </div>
                  }


           <ProgresProfil/>

      <div className="grid grid-cols-1 md:grid-cols-3 py-4 mb-4 gap-8">
              
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-6  text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex-col justify-center">
            <h3 className="font-semibold text-sm">Saldo Sistem Tersedia</h3>
            <p className="text-3xl font-bold mt-1">
              Rp {totalSaldoSaatIni.toLocaleString("id-ID")}
            </p>
        
            <p className="text-xs opacity-90 mt-3">Siap untuk ditarik</p>
            </div>
          <Wallet className="w-10 h-10 opacity-80" />
          </div>
          <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium mt-3 w-full transition-colors">
            💸 Tarik Saldo Sekarang
          </button>
      </div>



        <div className='md:col-span-2'>
          <h2 className="text-xl md:text-xl font-bold text-green-800 mb-2">Informasi</h2>
          <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-4 border border-gray-100">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="text-3xl md:text-4xl mb-3">👥</div>
                <h4 className="font-bold text-sm text-blue-700 mb-1">Siswa Aktif</h4>
                <p className="md:text-3xl text-xl  font-bold  text-blue-900">12</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="text-3xl md:text-4xl mb-3">📚</div>
                <h4 className="font-bold text-sm text-purple-700 mb-1">Kelas Selesai</h4>
                <p className="md:text-3xl text-xl  font-bold  text-purple-900">3</p>
              
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="text-3xl md:text-4xl mb-3">📈</div>
                <h4 className="font-bold text-sm text-green-700 mb-1">Pendapatan</h4>
                <p className="md:text-3xl text-xl font-bold text-green-900">350K</p>
              </div>
            </div>
          </div>
        
        </div>


      </div>


            {/* Header */}
            <div className="mb-6">
              <h2 className="md:text-xl text-xl font-bold text-green-800">Menu Utama</h2>
              <p className="text-sm text-gray-500">Akses cepat ke semua fitur</p>
            </div>

            {/* Menu Grid */}
            <div className="grid md:grid-cols-6 grid-cols-3 gap-3 mb-8">
              {data.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => handleMenuClick(item)}
                >
                  <div className={`${item.color} bg-gradient-to-br shadow-md hover:shadow-xl rounded-2xl p-4 hover:-translate-y-1 active:scale-95 transition-all duration-300 border border-white/50`}>
                    <div className="text-center">
                      <div className="text-3xl mb-2 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-gray-800 font-semibold text-xs leading-tight">
                        {item.judul}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Grid Jadwal & Absensi */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-6">

                {/* Absensi Hari Ini */}
              <div className="bg-gradient-to-br from-green-50 via-white to-green-50 shadow-xl rounded-3xl p-6 border border-green-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">✅</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Absensi Hari Ini</h3>
                      <p className="text-xs text-gray-500">Status kehadiran Anda</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-green-500 text-white px-3 py-1.5 rounded-full shadow-md">2</span>
                </div>

                {filterDate?.tglbooking === new Date().toISOString().split('T')[0] ? (
                 <BelumAdaAbsen/>
                ) : (
                    <AbsenHariIni/>
                )}
                  
              </div>
              
              {/* Jadwal Hari Ini */}
              <div className="bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-xl rounded-3xl p-6 border border-blue-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center text-2xl shadow-lg">📅</div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">Jadwal Hari Ini</h3>
                      <p className="text-xs text-gray-500">Kelas aktif & mendatang</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-blue-500 text-white px-3 py-1.5 rounded-full shadow-md">3</span>
                </div>
                <div className="space-y-3">
                  <div className="group p-4 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-blue-200 hover:border-blue-400">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-14 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-800 mb-1">Matematika - Kelas 10</h4>
                        <p className="text-xs text-gray-600">⏰ 08:00 - 09:30 • 👤 Andi Pratama</p>
                      </div>
                      <span className="text-xs bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1.5 rounded-full font-bold shadow-sm">Aktif</span>
                    </div>
                  </div>
                  <div className="group p-4 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-14 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-800 mb-1">Fisika - Kelas 11</h4>
                        <p className="text-xs text-gray-600">⏰ 10:00 - 11:30 • 👤 Sari Dewi</p>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-bold">Menunggu</span>
                    </div>
                  </div>
                  <div className="group p-4 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-gray-300">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-14 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full"></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm text-gray-800 mb-1">Kimia - Kelas 12</h4>
                        <p className="text-xs text-gray-600">⏰ 14:00 - 15:30 • 👤 Budi Santoso</p>
                      </div>
                      <span className="text-xs bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full font-bold">Menunggu</span>
                    </div>
                  </div>
                </div>
              </div>

          

            </div>

      {/* More Menu Popup */}
      {showMoreMenu && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn" onClick={() => setShowMoreMenu(false)}>
          <div 
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-gray-50 rounded-t-3xl p-6 shadow-2xl transform transition-transform duration-300 ease-out"
            style={{ animation: 'slideUp 0.3s ease-out' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h3 className="text-xl font-bold text-green-800 mb-6 text-center">Menu Lainnya</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {moreMenus.map((menu) => (
                <div key={menu.id} className="text-center cursor-pointer p-4 hover:bg-white hover:shadow-lg rounded-2xl transition-all duration-300 active:scale-95 border border-gray-100">
                  <div className="text-3xl mb-3">{menu.icon}</div>
                  <p className="text-xs text-gray-800 font-semibold">{menu.judul}</p>
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShowMoreMenu(false)}
              className="w-full mt-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-xl transition-colors duration-200"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

   
    </div>

    </>
  );
};

export default Content;