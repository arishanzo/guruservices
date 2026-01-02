
import React, { useState, useMemo, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { UseGetProfil } from "../../hook/useGetProfil";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";

const JadwalKelas = () => {
  const { user } = useAuth();
  const { profil } = UseGetProfil(user?.idguru);
  const { booking } = UseBookingKelas(profil?.idprofilguru);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedSessions, setSelectedSessions] = useState({});


  // Function to parse date from various formats
  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    
    // If it's already a Date object
    if (dateStr instanceof Date) {
      return dateStr;
    }
    
    // Convert to string if it's not
    const str = String(dateStr).trim();
    
    // Try different parsing methods
    let date;
    
    // Method 1: Direct parsing
    date = new Date(str);
    if (!isNaN(date.getTime())) {
   return date;
    }
    
    // Method 2: Handle DD/MM/YYYY format
    if (str.includes('/')) {
      const parts = str.split('/');
      if (parts.length === 3) {
        // Try DD/MM/YYYY
        date = new Date(parts[2], parts[1] - 1, parts[0]);
        if (!isNaN(date.getTime())) {
               return date;
        }
        // Try MM/DD/YYYY
        date = new Date(parts[2], parts[0] - 1, parts[1]);
        if (!isNaN(date.getTime())) {
               return date;
        }
      }
    }
    
    // Method 3: Handle DD-MM-YYYY format
    if (str.includes('-')) {
      const parts = str.split('-');
      if (parts.length === 3) {
        // Try DD-MM-YYYY
        if (parts[0].length <= 2) {
          date = new Date(parts[2], parts[1] - 1, parts[0]);
          if (!isNaN(date.getTime())) {
            return date;
          }
        }
      }
    }
    
 
    return null;
  };

  useEffect(() => {
     if (booking && booking.length > 0) {
      // Flatten all tgl__booking__kelas arrays from all booking items
      const allBookingDates = booking.flatMap(item => item.tgl__booking__kelas || []);
    
      
      const dates = allBookingDates.map((dateItem) => {
     
        const dateStr = dateItem.tglbooking;
      
        if (dateStr) {
          const date = parseDate(dateStr);
       
          return date;
        }
        return null;
      }).filter(date => date !== null);
      
      const sessions = allBookingDates.reduce((acc, dateItem) => {
        const dateStr = dateItem.tglbooking;
        const sesi = dateItem.sesi;
        
        if (dateStr) {
          acc[dateStr] = sesi;
        }
        return acc;
      }, {});
           
      setSelectedDates(dates);
      setSelectedSessions(sessions);
    }
  }, [booking]);

 

const MAX_MEETINGS = 15;




const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);
const addMonths = (date, n) => new Date(date.getFullYear(), date.getMonth() + n, 1);

const monthDays = useMemo(() => {
  const start = startOfMonth(currentMonth);
  const end = endOfMonth(currentMonth);
  const startWeekDay = start.getDay();
  const totalDays = end.getDate();
  const days = [];

  for (let i = 0; i < startWeekDay; i++) days.push(null);
  for (let d = 1; d <= totalDays; d++) {
    days.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d));
  }

  return days;
}, [currentMonth]);

function isSameDay(a, b) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

function getLocalDateKey(date) {
  return date.toLocaleDateString("en-CA"); // format YYYY-MM-DD dalam lokal time
}



function handleSelectSession(date, session) {
  const key = getLocalDateKey(date);
  setSelectedSessions((prev) => ({ ...prev, [key]: session }));
}


    
function monthTitle(date) {
  return date.toLocaleDateString("id-ID", { month: "long", year: "numeric" });
}

const sesiOptions = ["Sesi Pagi", "Sesi Siang", "Sesi Malam"];



  return (
    <div className="w-full mx-auto mb-4 px-4">
      
  

      <header className="mb-6 ">
        <h1 className="text-2xl text-green-800 font-bold">Jadwal Kelas</h1>
        <p className="text-sm text-gray-600">Atur Jadwal Kelas Sesuai Ketersediaan Anda.</p>
      </header>


      {/* Kotak Peringatan */}
        <div className="mb-6">
          <div className="flex items-start gap-3 p-4
          bg-yellow-50 border-l-4 border-yellow-400 rounded-md shadow-sm w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-yellow-600 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01M5.93 5.93a10 10 0 0112.14 0
                  10 10 0 010 12.14 10 10 0 01-12.14 0
                  10 10 0 010-12.14z"
              />
            </svg>
            <div className="text-sm text-yellow-800 space-y-1">
              <p>
                <strong>Penting:</strong> Anda Bisa Ubah Sesi Jadwal Sesuai Kebutuhan Anda Saat Ini{' '}
                <span className="font-semibold">
                  , Setelah Ubah Sesi Anda Wajib Komfirmasi Ke Wali Murid / Siswa Lewat Chat WA.
                </span>{' '}
              </p>
           
            
            </div>
          </div>
          </div>

      {/* Konten Utama */}
      
      {!booking ? (
    <div className="col-span-full py-16">
  <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4 text-2xl">
      📅
    </div>
    <h3 className="font-semibold text-gray-800">
      Belum Ada Jadwal
    </h3>
    <p className="text-sm text-gray-500 mt-2">
      Jadwal les Anda akan tampil di sini setelah pemesanan berhasil
    </p>
  </div>
</div>

      ) : (
        <div className="w-full mx-auto mb-4">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-1">
              <div className="w-full bg-green-900">
                <div className="flex items-center bg-green-900 text-white justify-between px-4">
                  <button
                    type="button"
                    onClick={() => setCurrentMonth((m) => addMonths(m, -1))}
                    className="px-2 py-1 rounded"
                  >
                    ‹
                  </button>
                  <h2 className="text-lg font-medium text-white">{monthTitle(currentMonth)}</h2>
                  <button
                    type="button"
                    onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
                    className="px-2 py-1 rounded"
                  >
                    ›
                  </button>
                </div>
              </div>


              <section className="bg-white border rounded-lg p-4 mt-3 shadow shadow-md shadow-green-100">
                <div className="grid grid-cols-7 text-xs text-center text-slate-500 mb-2">
                  {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((d) => (
                    <div key={d} className="py-1">{d}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-6">
                  {monthDays.map((day, idx) => {
                    const isDisabled = !day || (day < new Date(today.getFullYear(), today.getMonth(), today.getDate())) ;
                    const isSelected = selectedDates.some((d) => isSameDay(d, day));
                    const isTodayFlag = isSameDay(day, today);

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isDisabled}
                        className={`h-12 flex items-center justify-center rounded-md text-sm leading-none
                          ${isDisabled ? 'text-slate-300 cursor-not-allowed' : 'hover:bg-green-100 hover:text-green-600'}
                          ${isSelected ? 'bg-green-600 text-white' : ''}
                          ${isTodayFlag && !isSelected ? 'ring-1 ring-green-200' : ''}`}
                        aria-pressed={isSelected}
                      >
                        {day ? day.getDate() : ''}
                      </button>
                    );
                  })
                  }
                </div>
              </section>
            </div>
            <div className="flex flex-col  h-full gap-1">
              <div className="w-full h-10 bg-green-900 flex p-4 md:mb-4 items-center justify-between px-4">
                <h1 className="text-md text-white font-bold">Pilih Jam Sesi</h1>
                <p className="text-white text-sm">Max: {selectedDates.length} / {MAX_MEETINGS}</p>
              </div>

              <section className="bg-white border rounded-lg p-4 shadow shadow-md shadow-green-100 ">
                {selectedDates.length > 0 ? (
                  <div className="mt-4 space-y-3">
                    {selectedDates.map((d, i) => {
                      const key = d.toLocaleDateString("en-CA");

                      return (
                        <div key={i} className="border rounded p-2">
                          <p className="text-sm font-medium">{key}</p>
                          <div className="flex gap-2 mt-2">
                            {sesiOptions.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => handleSelectSession(d, s)}
                                className={`px-3 py-1 rounded border text-sm
                                  ${selectedSessions[key] === s ? 'bg-green-600 text-white' : 'hover:bg-green-100'}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Pilih tanggal terlebih dahulu</p>
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JadwalKelas;