import { useState, useMemo, useEffect } from "react";
import { ArrowUpCircle, Search, Calendar } from "lucide-react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import Pagination from "../components/Pagination";

const SaldoKeluar = ({saldoKeluar, totalKeluar}) => {

  const [pageKeluar, setPageKeluar] = useState(1);
  const [showCalendarKeluar, setShowCalendarKeluar] = useState(false);
  const [paginatedKeluar, setPaginatedKeluar] = useState([]);
  const [lastSelectedKeluar, setLastSelectedKeluar] = useState(null);
  const [searchKeluar, setSearchKeluar] = useState("");

  const [rangeKeluar, setRangeKeluar] = useState([
  { startDate: new Date, endDate: new Date, key: "selection" },
  ]);

  

   const handleDateChangeKeluar = (item) => {
    const { startDate, endDate } = item.selection;
    if (
     lastSelectedKeluar &&
      startDate?.toDateString() === lastSelectedKeluar.startDate?.toDateString() &&
      endDate?.toDateString() === lastSelectedKeluar.endDate?.toDateString()
    ) {
      setRangeKeluar([
        {
          startDate: new Date,
          endDate: new Date,
          key: "selection",
        },
      ]);
      setLastSelectedKeluar(null);
      return;
    }

    // Simpan range baru
    setRangeKeluar([item.selection]);
    setLastSelectedKeluar(item.selection);
  };

  
  const filteredKeluar = useMemo(() => {
    return saldoKeluar.filter((item) => {
      const date = new Date(item.tanggalsaldokeluar);
      return date >= rangeKeluar[0].startDate && date <= rangeKeluar[0].endDate;
    });
  }, [saldoKeluar, rangeKeluar]);

  const rowsPerPage = 5;

 const  cariFilterKeluar = useMemo(
    () =>
      saldoKeluar.filter((item) =>
        (item.keterangansaldokeluar ?? '').toLowerCase().includes(searchKeluar.toLowerCase())
      ),
    [searchKeluar, saldoKeluar]
  );
  

  
  useEffect(() => {
  const startIndex = (pageKeluar - 1) * rowsPerPage;
  const endIndex = pageKeluar * rowsPerPage;
   
  const newPageData = filteredKeluar.length > 0
        ? filteredKeluar.slice(startIndex, endIndex)
        : cariFilterKeluar.slice(startIndex, endIndex);


    setPaginatedKeluar(newPageData);
    }, [filteredKeluar, cariFilterKeluar, pageKeluar, rowsPerPage, showCalendarKeluar]);

  
    return (
     <>
     
         <div className="flex md:justify-end pt-8">
        <button
            className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition"
            onClick={() => setShowCalendarKeluar(!showCalendarKeluar)}
        >
            <Calendar className="w-4 h-4 text-gray-600" /> Filter Tanggal 
        </button>
        </div>


    {showCalendarKeluar && (
          <div className="absolute z-10  bg-white shadow-lg rounded-lg">
            <DateRange
              editableDateInputs={true}
              onChange={handleDateChangeKeluar}
              moveRangeOnFirstSelection={false}
              ranges={rangeKeluar}
              rangeColors={["#16a34a"]}
            />
          </div>
        )}

      {/* SALDO KELUAR */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <ArrowUpCircle className="text-red-600" /> Saldo Keluar
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari tujuan..."
              value={searchKeluar}
              onChange={(e) => {
                setSearchKeluar(e.target.value);
                setPageKeluar(1);
              }}
              className="border border-gray-200 rounded-lg pl-8 pr-3 py-1.5 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-2 text-left">Nama Guru</th>
              <th className="py-2 text-left">Keterangan</th>
              <th className="py-2 text-left">Tanggal</th>
              <th className="py-2 text-right">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {paginatedKeluar.map((item) => (
              <tr key={item?.idsaldokeluar} className="border-b hover:bg-gray-50">
                
                <td className="py-2">{item?.idguru}</td>
                <td className="py-2">{item?.keterangansaldokeluar}</td>
                <td className="py-2 text-gray-600">{ new Date(item?.tglsaldokeluar).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}</td>
                <td className="py-2 text-right text-red-600 font-medium">
                  -Rp {(item.jumlahsaldokeluar ?? '').toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
            {paginatedKeluar.length === 0 && (
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
            Total Saldo Keluar:{" "}
            <span className="text-red-600">
              Rp { filteredKeluar.length > 0 ? filteredKeluar.reduce((a, b) => a + b.jumlah, 0).toLocaleString("id-ID") : totalKeluar.toLocaleString("id-ID")}
            </span>
          </p>
        </div>

        <Pagination
          currentPage={pageKeluar}
          totalData={filteredKeluar.length}
          onPageChange={setPageKeluar}
        />
      </div>
     </>
    )
}

export default SaldoKeluar;