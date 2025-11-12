const AbsenTambahan = ({formattedNextDay, booking, absensiGuru, handleHadir, ijin, disabled }) => {

    return (
        <>
         {/* Jadwal Kelas */}
          {Array.isArray(formattedNextDay) && formattedNextDay.sort((a, b) => new Date(a.tglbooking) - new Date(b.tglbooking)).map((date, index) => (
            
          <div key={index}>
          <div className={`flex items-center p-3 shadow shadow-xs  rounded-xl ${new Date(date.tglbooking).toDateString() === new Date().toDateString() ? `bg-green-100` : new Date(date.tglbooking) < new Date() ? 'bg-gray-100'  : `bg-gray-50`} `}>
                <div className="flex-1 px-4">
              <h4 className="font-medium text-sm text-green-800 mb-2">
                  {new Date(date.tglbooking).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  }) + ' • ' + booking.find(b => b.idbookingprivate === date.idbookingprivate)?.mapeldipilih }
              </h4>

              <p className="text-xs text-gray-600">{ date.sesi} • Siswa: {booking.find(b => b.idbookingprivate === date.idbookingprivate)?.namamurid}</p>
            </div>
            { new Date(date.tglbooking).toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10)  && absensiGuru.find(a => a.idtglbooking === date.idtglbooking)?.statusabsen === 'Ijin' ? (
                  
                     <span className="text-xs bg-yellow-600 text-yellow-100 px-4 py-1 font-semibold text-center rounded-full">
                    Izin 
                  </span>
            ) : absensiGuru.find(a => a.idtglbooking === date.idtglbooking)?.statusabsen === 'Hadir' ? (
            <span className="text-xs bg-green-700 text-green-100 px-4 py-1 font-semibold text-center rounded-full">
                    Hadir
                  </span>
            
             ) :   new Date(date.tglbooking).toISOString().slice(0, 10) < new Date().toISOString().slice(0, 10)  && !absensiGuru.find(a => a.idtglbooking === date.idtglbooking)  ? (
            <span className="text-xs bg-red-800 text-red-100 px-4 py-1 font-semibold text-center rounded-full">
                   Tidak Hadir
                  </span>
            
             ): (
       <div className="flex flex-col items-center justify-center gap-4 text-gray-500 mt-auto">
         {new Date(date.tglbooking).toDateString() === new Date().toDateString()  && (
           <button onClick={() => handleHadir(date?.idtglbooking)} 
           disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } text-xs bg-green-700 text-green-100 p-4 font-semibold py-1 text-center rounded-full`}>Hadir</button>
       
         )}
               <button  onClick={() => ijin(date?.idtglbooking)} 
                  disabled={disabled}
                  className={`${
                      disabled ? 'cursor-not-allowed opacity-50' : ''
                     } text-xs bg-red-100 text-red-700 p-4 font-semibold py-1 text-center rounded-full`}>Izin</button>
              </div>
            )}
       
          </div>
          </div>
          ))}
          </>
    )
}   

export default AbsenTambahan;