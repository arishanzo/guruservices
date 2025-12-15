import { Users, Check, Info, Upload, MessageCircle, BookOpen, Clock, CheckCircle2, AlertTriangle} from "lucide-react";
import { serviceClient } from "../../../../lib/axios";
import { useState } from "react";
import { UseBookingKelas } from "../../../../hook/useGetBookingKelas";
import ModalDetailKelas from "../showmodal/ModalDetailkelas";
import ModalKegiatan from "../showmodal/ModalKegiataan";

const KelasAktif = ({profil}) => {
  const [status, setStatus] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalKegiatan, setShowModalKegiatan] = useState(false);
  
  const { booking} = UseBookingKelas(profil?.idprofilguru);
  const [bookingByID, setBookingByID] = useState(null);

  const handleKomfirmasi = async (idBookingPrivate) => {
    setDisabled(true);
    try {
      await serviceClient.putBookingKelasUser(idBookingPrivate, { status: "Sudah Mulai" });
      setStatus("Komfirmasi Kelas Berhasil.");
      setTimeout(() => window.location.reload(), 3000);
    } catch (err) {
      err.response?.data || {};
      setStatus("Ubah Data gagal. Silakan coba lagi.");
    } finally {
      setDisabled(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  const detail = (idBookingPrivate) => {
    if (!booking) return; 
    const selectedBooking = booking.find((b) => b.idbookingprivate === idBookingPrivate);
    if (selectedBooking) {
      setBookingByID(selectedBooking); 
      setShowModal(true);
    }
  };

  const kegiatan = (idBookingPrivate) => {
    if (!booking) return; 
    const selectedBooking = booking.find((b) => b.idbookingprivate === idBookingPrivate);
    if (selectedBooking) {
      setBookingByID(selectedBooking); 
      setShowModalKegiatan(true);
    }
  };

  return (
    <>
      {/* Loading state */}
      {!booking ? (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 animate-pulse">
            <div className="h-10 w-64 bg-gray-300 rounded-2xl mb-6"></div>
            <div className="h-5 w-full bg-gray-200 rounded-xl mb-8"></div>
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center space-y-4">
                <div className="h-6 w-32 bg-gray-300 rounded-full mx-auto"></div>
                <div className="h-8 w-56 bg-gray-300 rounded-xl mx-auto"></div>
                <div className="space-y-3">
                  <div className="h-4 w-48 bg-gray-200 rounded mx-auto"></div>
                  <div className="h-4 w-40 bg-gray-200 rounded mx-auto"></div>
                </div>
                <div className="flex justify-center gap-3 pt-4">
                  <div className="w-14 h-14 bg-gray-300 rounded-2xl"></div>
                  <div className="w-14 h-14 bg-gray-300 rounded-2xl"></div>
                  <div className="w-14 h-14 bg-gray-300 rounded-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : booking.length === 0 ? (
        <div className="text-center py-20">
          <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-16 shadow-lg">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">Belum Ada Kelas</h3>
            <p className="text-gray-500 text-lg">Kelas Anda akan muncul di sini setelah ada booking</p>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Header dengan Gradient */}
          <div className="bg-gradient-to-br from-emerald-500 via-green-500 to-teal-600 rounded-3xl p-8 text-white shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">Kelas Aktif</h1>
                <p className="text-white/90 text-lg">Kelola dan pantau semua kelas Anda dengan mudah</p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          {booking?.some(b => b.statusbooking === 'Belum Mulai') && (
            <div className="bg-gradient-to-r from-blue-50 via-cyan-50 to-blue-50 border-2 border-blue-200 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-2xl shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-3">Kelas Menunggu Konfirmasi</h3>
                  <p className="text-blue-700">Klik tombol centang hijau untuk memulai kelas Anda</p>
                </div>
              </div>
            </div>
          )}

          {booking?.some(b => b.statusbooking === 'Sudah Mulai') && (
            <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-3xl p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-2xl shadow-lg">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-3">Wajib Upload Kegiatan</h3>
                  <p className="text-amber-700 mb-4">Upload kegiatan, materi, dan tugas untuk laporan dan penarikan dana</p>
                  <div className="space-y-2 text-amber-800">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="font-medium">Tombol Info:</span> Lihat detail kelas
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                      <span className="font-medium">Tombol Upload:</span> Upload kegiatan pembelajaran
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Alert */}
          {status && (
            <div className={`rounded-3xl p-6 text-center font-semibold text-lg shadow-lg ${
              status?.includes('Berhasil') 
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800' 
                : 'bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 text-red-800'
            }`}>
              {status}
            </div>
          )}

          {/* Kelas Cards */}
          <div className="grid gap-6">
            {booking.map((b, i) => {
              const getStatusConfig = (status) => {
                switch (status) {
                  case 'Belum Mulai':
                    return {
                      bg: 'from-blue-50 via-cyan-50 to-blue-50',
                      border: 'border-blue-300',
                      badge: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
                      icon: <Clock className="w-5 h-5" />
                    };
                  case 'Sudah Mulai':
                    return {
                      bg: 'from-green-50 via-emerald-50 to-green-50',
                      border: 'border-green-300',
                      badge: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
                      icon: <CheckCircle2 className="w-5 h-5" />
                    };
                  default:
                    return {
                      bg: 'from-gray-50 via-slate-50 to-gray-50',
                      border: 'border-gray-300',
                      badge: 'bg-gradient-to-r from-gray-500 to-slate-500 text-white',
                      icon: <Clock className="w-5 h-5" />
                    };
                }
              };

              const statusConfig = getStatusConfig(b?.statusbooking);

              return (
                <div key={i} className={`bg-gradient-to-br ${statusConfig.bg} border-2 ${statusConfig.border} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="text-center space-y-6">
                    {/* Status Badge */}
                    <div className="flex justify-center">
                      <span className={`${statusConfig.badge} px-6 py-3 rounded-full text-sm font-bold flex items-center gap-3 shadow-lg`}>
                        {statusConfig.icon}
                        {b?.statusbooking}
                      </span>
                    </div>
                    
                    {/* Class Title */}
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">{b?.mapeldipilih}</h3>
                    
                    {/* Class Info */}
                    <div className="space-y-4 text-gray-700">
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                        <p className="flex items-center md:items-start justify-center gap-3 text-lg">
                          <Users className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">Max 1-3 Siswa</span>
                        </p>
                      </div>
                      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4">
                        <p className="text-lg">
                          <span className="font-bold text-gray-800">Siswa:</span> 
                          <span className="ml-2 font-semibold text-blue-600">{b?.namamurid || 'Belum ada'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center  gap-4 pt-4">
                      {/* Konfirmasi Button */}
                      {b?.statusbooking === 'Belum Mulai' && (
                        <div className="relative group">
                          <button 
                            onClick={() => handleKomfirmasi(b?.idbookingprivate)}
                            disabled={disabled}
                            className={`${disabled ? 'cursor-not-allowed opacity-50' : 'hover:scale-110 hover:shadow-xl'} bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl transition-all duration-300 shadow-lg`}
                          >
                            <Check className="w-6 h-6" />
                          </button>
                          <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                            Mulai Kelas
                          </span>
                        </div>
                      )}

                      {/* Detail Button */}
                      <div className="relative group">
                        <button 
                          onClick={() => detail(b?.idbookingprivate)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                        >
                          <Info className="w-6 h-6" />
                        </button>
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                          Detail Kelas
                        </span>
                      </div>

                      {/* Upload Button */}
                      {b?.statusbooking === 'Sudah Mulai' && (
                        <div className="relative group">
                          
                          <button 
                            onClick={() => kegiatan(b?.idbookingprivate)}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white p-4 rounded-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                          >
                            <Upload className="w-6 h-6" />
                          </button>
                          <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                            Upload Kegiatan
                          </span>
                        </div>
                      )}

                      {/* WhatsApp Button */}
                      {b?.statusbooking === 'Sudah Mulai' && (
                        <div className="relative group">
                          <button
                            onClick={() => window.open(`https://wa.me/${b?.noteleponortu}`, '_blank', 'noopener,noreferrer')}
                            className="bg-gradient-to-r from-green-400 to-green-600 text-white p-4 rounded-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                          >
                            <MessageCircle className="w-6 h-6" />
                          </button>
                          <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                            Hubungi Siswa
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <ModalDetailKelas
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        bookingByID={bookingByID}
      />

      <ModalKegiatan
        isOpen={showModalKegiatan}
        onClose={() => setShowModalKegiatan(false)}
        bookingByID={bookingByID}
      />
    </>
  )
}

export default KelasAktif;