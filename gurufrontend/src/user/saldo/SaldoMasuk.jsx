import { useState, useMemo, useEffect } from "react";
import { ArrowDownCircle, Search, Calendar } from "lucide-react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Pagination from "../components/Pagination";
import { UseBookingKelas } from "../../hook/useGetBookingKelas";

const SaldoMasuk = ({saldoMasuk, totalMasuk, booking}) => {

    const [searchMasuk, setSearchMasuk] = useState("");
    const [pageMasuk, setPageMasuk] = useState(1);
    
    const [showCalendarMasuk, setShowCalendarMasuk] = useState(false);

    const [paginatedMasuk, setPaginatedMasuk] = useState([]);
    const [lastSelectedMasuk, setLastSelectedMasuk] = useState(null);

    const [rangeMasuk, setRangeMasuk] = useState([ 
        { startDate: new Date, endDate: new Date, key: "selection" },
    ]);

    console.log(booking)

  const handleDateChangeMasuk = (item) => {
    const { startDate, endDate } = item.selection;

    if (
     lastSelectedMasuk &&
      startDate?.toDateString() === lastSelectedMasuk.startDate?.toDateString() &&
      endDate?.toDateString() === lastSelectedMasuk.endDate?.toDateString()
    ) {
      setRangeMasuk([
        {
          startDate: new Date,
          endDate: new Date,
          key: "selection",
        },
      ]);
      setLastSelectedMasuk(null);
      return;
    }

    setRangeMasuk([item.selection]);
    setLastSelectedMasuk(item.selection);
  };

 
  const filteredMasuk = useMemo(() => {
    return saldoMasuk.filter((item) => {
      const date = new Date(item.tanggalsaldomasuk);
      return date >= rangeMasuk[0].startDate && date <= rangeMasuk[0].endDate;
    });
  }, [saldoMasuk, rangeMasuk]);


  const rowsPerPage = 5;


  const  cariFilterMasuk = useMemo(
    () =>
      saldoMasuk.filter((item) =>
        (item.keterangansaldomasuk ?? '').toLowerCase().includes(searchMasuk.toLowerCase())
      ),
    [searchMasuk, saldoMasuk]
  );




useEffect(() => {
  const startIndex = (pageMasuk - 1) * rowsPerPage;
  const endIndex = pageMasuk * rowsPerPage;
   const newPageData =
        filteredMasuk.length > 0
        ? filteredMasuk.slice(startIndex, endIndex)
        : cariFilterMasuk.slice(startIndex, endIndex);

  setPaginatedMasuk(newPageData);
}, [filteredMasuk, cariFilterMasuk, pageMasuk, rowsPerPage, showCalendarMasuk]);


    return(

        <>
        
        
         <div className="flex md:justify-end pt-8">
        <button
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition"
            onClick={() => setShowCalendarMasuk(!showCalendarMasuk)}
        >
            <Calendar className="w-4 h-4 text-gray-600" /> Filter Tanggal
        </button>
        </div>
         {showCalendarMasuk && (
          <div className="absolute  z-10 bg-white shadow-lg rounded-lg">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeMasuk}
              moveRangeOnFirstSelection={false}
              ranges={rangeMasuk}
             rangeColors={ ["#16a34a"]  }
            />
          </div>
        )}

      {/* SALDO MASUK */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <ArrowDownCircle className="text-green-600" /> Saldo Masuk
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari sumber..."
              value={searchMasuk}
              onChange={(e) => {
                setSearchMasuk(e.target.value);
                setPageMasuk(1);
              }}
              className="border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2 text-left">Nama Kelas</th>
              <th className="py-2 text-left">Nama Murid</th>
              <th className="py-2 text-left">Tanggal</th>
              <th className="py-2 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {paginatedMasuk.map((item) => (
              <tr key={item?.idsaldomasuk} className="border-b hover:bg-gray-50">
                <td className="py-2">{ booking[0]?.mapeldipilih}</td>
                 <td className="py-2">{ booking[0]?.namamurid}</td>
                <td className="py-2 text-gray-600">{ new Date(item?.tglsaldomasuk).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}</td>
                <td className="py-2 text-right text-green-600 font-medium">
                  +Rp {(item?.jumlahsaldomasuk ?? '').toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
            {paginatedMasuk.length === 0 && (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total di bawah tabel */}
        <div className="flex justify-end mt-4 border-t pt-3">
          <p className="text-sm font-semibold text-gray-700">
            Total Saldo Masuk:{" "}
            <span className="text-green-600">
            Rp { filteredMasuk.length > 0 ? filteredMasuk.reduce((a, b) => a + b.jumlah, 0).toLocaleString("id-ID") : totalMasuk.toLocaleString("id-ID")}
       
            </span>
          </p>
        </div>

        <Pagination
          currentPage={pageMasuk}
          totalData={filteredMasuk.length}
          onPageChange={setPageMasuk}
        />
      </div>

        </>
    )
}

export default SaldoMasuk;