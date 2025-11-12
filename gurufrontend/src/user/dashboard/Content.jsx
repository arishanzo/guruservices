import { useEffect, useMemo, useState } from 'react';
import ProgresProfil from '../progresprofil/ProgresProfil';
import { getMenuDashboard } from '../../lib/MenuItems/getMenuDashboard';
import { UseGetAbsensiGuru } from '../../hook/useGetAbsensiGuru';
import { UseAutoAbsensi } from '../../hook/useAutoAbsensi';

const Content = ({ dataBooking, absensiGuru }) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [status, setStatus] = useState('');


  const allBookingDates = useMemo(() => {
         return dataBooking && dataBooking.length > 0 
           ? dataBooking.flatMap(item => item.tgl__booking__kelas || []) 
           : [];
       }, [dataBooking]);
  

  const { loadingAutoAbsensi } = UseAutoAbsensi(absensiGuru, allBookingDates);


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

    if (!loadingAutoAbsensi && !absensiGuru && !allBookingDates) return;

    if(dataBooking){
           const alreadyShown = localStorage.getItem("bookingKelasShow");

          if (!alreadyShown) {
            setStatus('Selamat, Anda Mempunyai Kelas Baru Silahkan Komfirmasi Sekarang');
            localStorage.setItem("bookingKelasShow", "true");
          }
    }

       }, [dataBooking, loadingAutoAbsensi, absensiGuru, allBookingDates]);


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

  {/* Saldo Card */}
  <div className='md:col-span-2'>
    <h2 className="text-sm md:text-xl font-bold text-green-800 mb-2">Informasi</h2>
    <div className="bg-white shadow-md rounded-2xl p-3 border border-red-100">
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 text-center mb-2">
          <div className="text-xl md:text-3xl mb-4">👥</div>
          <h4 className="font-semibold text-xs text-green-800">Siswa Aktif</h4>
          <p className="text-xs opacity-90 text-gray-800">12 siswa</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center mb-2">
          <div className="text-xl md:text-3xl mb-4">📚</div>
          <h4 className="font-semibold text-xs text-green-800">Kelas Hari Ini</h4>
          <p className="text-xs opacity-90 text-gray-800">3 kelas</p>
        </div>
        <div className="bg-white rounded-xl p-3 text-center mb-2">
          <div className="text-xl md:text-3xl mb-4">📈</div>
          <h4 className="font-semibold text-xs text-green-800">Pendapatan</h4>
          <p className="text-xs opacity-90 text-gray-800">+350k</p>
        </div>
      </div>
    </div>
  
  </div>

  {/* Withdraw Money Card */}
  <div className="bg-green-600 rounded-2xl p-4 text-white">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-sm">Saldo Tersedia</h3>
        <p className="text-xl font-bold">Rp 2.450.000</p>
        <p className="text-xs opacity-90 mt-3">Siap untuk ditarik</p>
      </div>
      <div className="text-3xl">💰</div>
    </div>
    <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium mt-3 w-full transition-colors">
      💸 Tarik Saldo Sekarang
    </button>
  </div>

</div>


      {/* Header */}
      <div className="mb-6">
        <h2 className="md:text-xl text-xs  font-bold text-green-800 mb-2">Menu Utama</h2>
        <p className="text-sm text-gray-500">Pilih menu untuk mengakses fitur</p>
      </div>

    

      {/* Menu Grid */}
      <div className="grid md:grid-cols-6  grid-cols-3 gap-4 mb-8">
        {data.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer"
            onClick={() => handleMenuClick(item)}
          >
            <div className={`${item.color} border-2 rounded-2xl p-4 hover:shadow-lg active:scale-95 transition-all duration-200`}>
              <div className="text-center">
                <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="text-gray-700 font-medium text-xs leading-tight">
                  {item.judul}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jadwal Hari Ini */}
      <div className="bg-white shadow-lg rounded-2xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-green-800">📅 Jadwal Hari Ini</h3>
          <span className="text-xs text-gray-500">3 kelas</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-blue-50 rounded-xl">
            <div className="w-2 h-8 bg-blue-500 rounded-full mr-3"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-green-800">Matematika - Kelas 10</h4>
              <p className="text-xs text-gray-600">08:00 - 09:30 • Andi Pratama</p>
            </div>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Aktif</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <div className="w-2 h-8 bg-gray-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-green-800">Fisika - Kelas 11</h4>
              <p className="text-xs text-gray-600">10:00 - 11:30 • Sari Dewi</p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Menunggu</span>
          </div>
          <div className="flex items-center p-3 bg-gray-50 rounded-xl">
            <div className="w-2 h-8 bg-gray-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <h4 className="font-medium text-sm text-green-800">Kimia - Kelas 12</h4>
              <p className="text-xs text-gray-600">14:00 - 15:30 • Budi Santoso</p>
            </div>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">Menunggu</span>
          </div>
        </div>
      </div>

      {/* More Menu Popup */}
      {showMoreMenu && (
        <div className="fixed  inset-0 bg-black/50 z-50" onClick={() => setShowMoreMenu(false)}>
          <div 
            className="fixed bottom-0 left-0 right-0 bg-white  justify-center item-center rounded-t-3xl p-6 transform transition-transform duration-300 ease-out"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
            <h3 className="text-lg font-semibold text-green-800 mb-4">Menu Lainnya</h3>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              {moreMenus.map((menu) => (
                <div key={menu.id} className="text-center cursor-pointer p-3 hover:bg-gray-50 rounded-xl">
                  <div className="text-2xl mb-2">{menu.icon}</div>
                  <p className="text-xs text-gray-700 font-medium">{menu.judul}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

   
    </div>

    </>
  );
};

export default Content;