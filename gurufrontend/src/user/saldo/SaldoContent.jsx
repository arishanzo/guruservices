import { useEffect } from "react";
import {Wallet, TrendingUp, TrendingDown} from "lucide-react";

import SaldoMasuk from "./SaldoMasuk";
import SaldoKeluar from "./SaldoKeluar";
import { UseGetSaldoMasuk } from "../../hook/useGetSaldoMasuk";
import { UseGetSaldoKeluar } from "../../hook/useGetSaldoKeluar";

const SaldoContent = ( { booking }) => {

const { saldoMasuk }= UseGetSaldoMasuk() || [];
const { saldoKeluar, loading } = UseGetSaldoKeluar() || [];

const totalMasuk = saldoMasuk?.reduce((a, b) => a + (b.jumlahsaldomasuk || 0), 0);
const totalKeluar = saldoKeluar?.reduce((a, b) => a + (b.jumlahsaldokeluar || 0), 0);

const saldoTersedia = totalMasuk - totalKeluar;

 useEffect(() => {
   if (!saldoMasuk || !saldoKeluar) {
      return;
   } 

  }, [saldoMasuk, saldoKeluar]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-8">

         {!booking && loading ? (
                <>
                 <div className="mt-8 animate-pulse">
        <div className="h-8 w-56 bg-gray-200 rounded-md mb-3" />
        <div className="h-4 w-80 bg-gray-200 rounded-md mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-200 h-28 rounded-2xl shadow-sm" />
          <div className="bg-gray-200 h-28 rounded-2xl shadow-sm" />
          <div className="bg-gray-200 h-28 rounded-2xl shadow-sm" />
        </div>
      </div>

      <div className="animate-pulse mt-8">
        {/* Tombol Filter */}
        <div className="flex md:justify-end pt-8 mb-6">
          <div className="h-9 w-36 bg-gray-200 rounded-lg" />
        </div>

        {/* Tabel Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded-md" />
            <div className="h-8 w-48 bg-gray-200 rounded-md" />
          </div>

          {/* Header Tabel */}
          <div className="flex justify-between border-b pb-2 mb-3">
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
          </div>

          {/* Isi Baris Skeleton */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b">
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
              <div className="h-4 w-28 bg-gray-200 rounded-md" />
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
            </div>
          ))}

          {/* Total Skeleton */}
          <div className="flex justify-end mt-6 border-t pt-4">
            <div className="h-5 w-52 bg-gray-200 rounded-md" />
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>



      <div className="animate-pulse mt-8">
        {/* Tombol Filter */}
        <div className="flex md:justify-end pt-8 mb-6">
          <div className="h-9 w-36 bg-gray-200 rounded-lg" />
        </div>

        {/* Tabel Skeleton */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded-md" />
            <div className="h-8 w-48 bg-gray-200 rounded-md" />
          </div>

          {/* Header Tabel */}
          <div className="flex justify-between border-b pb-2 mb-3">
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
            <div className="h-4 w-24 bg-gray-200 rounded-md" />
          </div>

          {/* Isi Baris Skeleton */}
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center py-2 border-b">
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
              <div className="h-4 w-28 bg-gray-200 rounded-md" />
              <div className="h-4 w-20 bg-gray-200 rounded-md" />
              <div className="h-4 w-24 bg-gray-200 rounded-md" />
            </div>
          ))}

          {/* Total Skeleton */}
          <div className="flex justify-end mt-6 border-t pt-4">
            <div className="h-5 w-52 bg-gray-200 rounded-md" />
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center mt-4 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 w-8 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
  </>
            ) : (
              
  <>
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Manajemen Saldo</h1>
        <p className="text-gray-600">Pantau dan kelola saldo masuk serta keluar dengan mudah.</p>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-6 rounded-2xl shadow-md flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Saldo Tersedia</p>
            <h2 className="text-3xl font-bold mt-1">Rp {saldoTersedia?.toLocaleString("id-ID")}</h2>
          </div>
          <Wallet className="w-10 h-10 opacity-80" />
        </div>

        <div className="bg-white p-6 rounded-2xl hover:bg-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Masuk</p>
            <h2 className="text-2xl font-bold text-green-600 mt-1">Rp {totalMasuk?.toLocaleString("id-ID")}</h2>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-2xl hover:bg-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Keluar</p>
            <h2 className="text-2xl font-bold text-red-600 mt-1">Rp {totalKeluar?.toLocaleString("id-ID")}</h2>
          </div>
          <TrendingDown className="w-8 h-8 text-red-500" />
        </div>
      </div>

      <SaldoMasuk saldoMasuk={saldoMasuk} booking={booking} totalMasuk={totalMasuk} />
      <SaldoKeluar saldoKeluar={saldoKeluar} booking={booking} totalKeluar={totalKeluar} />
    </>
             )};
    </div>
   
  );
};

export default SaldoContent;
