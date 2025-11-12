import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ModalDetailKelas = ({ isOpen, onClose,  bookingByID }) => {

const tglbooking = bookingByID?.tgl__booking__kelas || [];
    const { start, end } = tglbooking.reduce(
        (acc, item) => {
            const date = new Date(item.tglbooking);
            if (!acc.start || date < acc.start) acc.start = date;
            if (!acc.end || date > acc.end) acc.end = date;
            return acc;
        },
        { start: null, end: null }
        );
    
        const options = { day: "numeric", month: "long", year: "numeric" };

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Konten Modal */}
  <Motion.div
  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl w-full max-h-[90vh] md:relative md:rounded-2xl md:max-w-4xl md:mx-auto overflow-hidden"
  initial={{ y: "100%", opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: "100%", opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Header */}
  <div className="flex items-center justify-between px-6 py-4 border-b">
    <h2 className="text-xl font-semibold text-green-700">Detail Kelas</h2>
    <button
      onClick={onClose}
      className="text-gray-500 hover:text-gray-700 transition-colors"
    >
      <X size={24} />
    </button>
  </div>

  {/* Body */}
  <div className="px-4 py-5 sm:p-0 max-h-[70vh] overflow-y-auto md:overflow-y-hidden">
    <dl className="sm:divide-y sm:divide-gray-200">
           <div className=" px-2 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Nama Siswa
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {bookingByID?.namamurid}
                </dd>
            </div>
            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Nama Wali Murid
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {bookingByID?.namawalimurid}
                </dd>
            </div>
            <div class="py-3  px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    No Telepon / WA
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {bookingByID?.noteleponortu}
                </dd>
            </div>
            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Alamat Lengkap
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingByID?.catatanalamat}
                </dd>
            </div>

            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Kelas
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingByID?.kelas}
                </dd>
            </div>

            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Tingkat Sekolah
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingByID?.tingkatSekolah}
                </dd>
            </div>

            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Mata Pelajaran
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingByID?.mapeldipilih}
                </dd>
            </div>

            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Fokus Di Bidang
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingByID?.tujuanpembelajaran}
                </dd>
            </div>

            <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Catatan
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {bookingByID?.catatanbooking}
                </dd>
            </div>

             <div class="py-3 px-2  sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                    Jadwal Kelas
                </dt>
                <dd class="mt-1 text-sm text-gray-900 font-bold sm:mt-0 sm:col-span-2">
                  
                  {start.toLocaleDateString("id-ID", options) } - {end.toLocaleDateString("id-ID", options)}
                </dd>
            </div>
        </dl>
    </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t flex justify-between md:justify-end items-center gap-4">
              <p className="text-gray-500 text-xs md:hidden">
                *Scroll Ke Bawah Untuk Lihat <strong> Detail</strong>
              </p>
             
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalDetailKelas;
