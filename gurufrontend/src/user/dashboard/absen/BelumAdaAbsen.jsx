const BelumAdaAbsen = () => {
  return (
    <>
      <div className="space-y-4">
        <div className="p-5 bg-white rounded-2xl border-2 border-gray-200 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl text-white font-bold">⏳</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-base text-gray-800 mb-1">Belum Ada Absen</h4>
              <p className="text-sm text-gray-600 font-semibold">Hari ini belum ada absen</p>
            </div>
           </div>
          <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
            <span>📍</span>
            <span className="font-medium text-red-700">Anda Belum Ada Kelas Aktif</span>
          </div>
        </div>
      </div>

    </>
  );
};

export default BelumAdaAbsen;
