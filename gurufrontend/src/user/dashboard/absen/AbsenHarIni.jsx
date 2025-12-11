const AbsenHariIni  = () => {
  return (
    <>
       <div className="space-y-4">
            <div className="p-5 bg-white rounded-2xl border-2 border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl text-white font-bold">✓</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base text-gray-800 mb-1">Masuk</h4>
                  <p className="text-sm text-gray-600 font-semibold">08:00 WIB</p>
                </div>
                <span className="text-xs bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-full font-bold shadow-sm">Tepat Waktu</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 bg-green-50 px-3 py-2 rounded-lg">
                <span>📍</span>
                <span className="font-medium">Lokasi: Kantor Pusat</span>
              </div>
            </div>
          
          </div>

           <div className="grid grid-cols-2 gap-3 mt-5">
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
              Absen Sekarang
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:scale-95">
              Izin Sekarang
            </button>
          </div>
          
          </>

  )
}

export default AbsenHariIni