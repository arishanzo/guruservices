import { useState } from "react";
import { UseBookingKelas } from "../../../../hook/useGetBookingKelas";
import ModalTugas from "../showmodal/ModalTugas";
import { useAuth } from "../../../../context/AuthContext";
import { UseTugasBelajar } from "../../../../hook/useGetTugasBelajar";
import { Edit, Pencil, Trash, Plus, BookOpen, Calendar, User, Link, Award, AlertTriangle, Clock } from "lucide-react";
import ModalNilai from "../showmodal/ModalNilai";
import { UseNilaiTugas } from "../../../../hook/useGetNilaiTugas";
import ModalEditTugas from "../showmodal/ModalEditTugas";
import axiosClient from "../../../../lib/axios";
import { toast } from "react-hot-toast";

const TugasNilai = ({ profil }) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  const { booking } = UseBookingKelas(profil?.idprofilguru);
  const { user } = useAuth();
  const { nilaiTugas } = UseNilaiTugas(user?.idguru);
  const { tugasBelajar } = UseTugasBelajar(user?.idguru);

  const [selectedTugasBelajar, setSelectedTugasBelajar] = useState(null);
  const [selectedHapus, setSelectedHapus] = useState(null);
  const [status, setStatus] = useState("");
  const [showModalTugas, setShowModalTugas] = useState(null);
  const [showModalNilai, setShowModalNilai] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalHapus, setShowModalHapus] = useState(false);

  const tambahTugas = () => {
    if (booking.length === 0) {
      toast.error("Maaf, Kelas Belum Ada Anda Tidak Dapat Menambahkan Tugas.", {
        style: {
          border: '1px solid #f63b3bff',
          padding: '16px',
          color: '#f1474dff',
          background: '#ffffffff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#e6132fff',
          secondary: '#ffffffff',
        },
      });
    } else {
      setShowModalTugas(true);
    }
  };

  const tambahEdit = (idtugasbelajar) => {
    const selected = tugasBelajar.find((b) => b?.idtugasbelajar === idtugasbelajar);
    if (selected) {
      setSelectedTugasBelajar(selected);
      setShowModalEdit(true);
    }
  };

  const hapusTugas = (idtugasbelajar) => {
    const selected = tugasBelajar.find((b) => b?.idtugasbelajar === idtugasbelajar);
    if (selected) {
      setSelectedHapus(selected);
      setShowModalHapus(true);
    }
  };

  const tambahNilai = (idtugasbelajar) => {
    const selected = tugasBelajar.find((b) => b?.idtugasbelajar === idtugasbelajar);
    const ceknilai = nilaiTugas.find((n) => n?.idtugasbelajar === idtugasbelajar);

    if (ceknilai) {
      toast.error("Maaf, Anda Sudah Menginputkan Nilai Tugas.", {
        style: {
          border: '1px solid #f63b3bff',
          padding: '16px',
          color: '#f1474dff',
          background: '#ffffffff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#e6132fff',
          secondary: '#ffffffff',
        },
      });
      return;
    }

    if (selected.statustugas === 'belum selesai') {
      toast.error("Maaf, Tugas Belum Dikerjakan Siswa.", {
        style: {
          border: '1px solid #f63b3bff',
          padding: '16px',
          color: '#f1474dff',
          background: '#ffffffff',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#e6132fff',
          secondary: '#ffffffff',
        },
      });
      return;
    }

    if (selected) {
      setSelectedTugasBelajar(selected);
      setShowModalNilai(true);
    }
  };

  const [textButtonHapus, setTextButtonHapus] = useState("Hapus");
  const handleHapus = async (selectedHapus) => {
    try {
      setTextButtonHapus('Prosess...');
      const toastLoading = toast.loading("Memproses data...");
      await axiosClient.delete(`/api/tugasbelajar/${selectedHapus.idtugasbelajar}`);
      toast.dismiss(toastLoading);
      setShowModalHapus(false);
      toast.success("🎉 Data Tugas Berhasil Dihapus", {
        style: {
          border: '1px solid #16A34A',
          background: '#ECFDF5',
          color: '#065F46',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#16A34A',
          secondary: '#ECFDF5',
        },
      });
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      setStatus("Gagal menghapus data:", err.response?.data || err.message);
    } finally {
      setTextButtonHapus('Hapus');
    }
  };

  return (
    <>
      {/* Status Alert */}
      {status && (
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-3xl p-6 mb-6 shadow-lg">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <strong className="text-red-800">{status}</strong>
          </div>
        </div>
      )}

      {/* Header dengan Gradient */}
      <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-600 rounded-3xl p-8 text-white shadow-2xl mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">Tugas & Nilai</h1>
            <p className="text-white/90 text-lg">Kelola tugas siswa dan berikan penilaian</p>
          </div>
        </div>
      </div>

      {/* Warning Card */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-2 border-amber-200 rounded-3xl p-6 shadow-lg mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 p-3 rounded-2xl shadow-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900 mb-3">Peringatan Penting</h3>
            <p className="text-amber-700">
              Data Tugas & Nilai akan <span className="font-bold">hilang otomatis</span> apabila melampaui tanggal deadline tugas
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Button */}
      <div className="mb-8">
        <button
          onClick={() => tambahTugas()}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="bg-white/20 p-3 rounded-2xl group-hover:scale-110 transition-transform">
              <Plus className="w-8 h-8" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold mb-1">Tambah Tugas Baru</h3>
              <p className="text-white/80">Buat tugas untuk siswa Anda</p>
            </div>
          </div>
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Daftar Tugas Siswa</h2>

        {!tugasBelajar ? (
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-3xl p-8 animate-pulse shadow-lg">
            <div className="space-y-4">
              <div className="h-8 w-64 bg-gray-300 rounded-2xl"></div>
              <div className="h-4 w-full bg-gray-200 rounded-xl"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        ) : tugasBelajar.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-3xl p-16 shadow-lg">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">Belum Ada Tugas</h3>
              <p className="text-gray-500 text-lg">Tugas yang Anda buat akan muncul di sini</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6">
            {tugasBelajar.map((t, i) => {
              const isOverdue = t.tgldeadlinetugas < new Date().toISOString();
              const nilai = nilaiTugas?.find((n) => n?.idtugasbelajar === t.idtugasbelajar)?.nilaitugas;
              const siswa = booking?.find((b) => b?.bookingprivate === t.bookingprivate)?.namamurid;

              return (
                <div key={i} className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.01]">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    {/* Task Info */}
                    <div className="flex-1 space-y-6">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{t.namatugas}</h3>
                        <p className="text-gray-600 text-lg leading-relaxed">{t.deskripsitugas}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        {/* Student Info */}
                        <div className="bg-blue-50 rounded-2xl p-4">
                          <div className="flex items-center gap-3">
                            <User className="w-5 h-5 text-blue-600" />
                            <div>
                              <p className="text-sm text-blue-600 font-medium">Siswa</p>
                              <p className="font-bold text-blue-900">{siswa || "-"}</p>
                            </div>
                          </div>
                        </div>

                        {/* Deadline */}
                        <div className={`rounded-2xl p-4 ${isOverdue ? 'bg-red-50' : 'bg-green-50'}`}>
                          <div className="flex items-center gap-3">
                            <Calendar className={`w-5 h-5 ${isOverdue ? 'text-red-600' : 'text-green-600'}`} />
                            <div>
                              <p className={`text-sm font-medium ${isOverdue ? 'text-red-600' : 'text-green-600'}`}>
                                {isOverdue ? 'Terlambat' : 'Deadline'}
                              </p>
                              <p className={`font-bold ${isOverdue ? 'text-red-900' : 'text-green-900'}`}>
                                {new Date(t.tgldeadlinetugas).toLocaleDateString("id-ID", options)}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Task Link */}
                        <div className="bg-purple-50 rounded-2xl p-4">
                          <div className="flex items-center gap-3">
                            <Link className="w-5 h-5 text-purple-600" />
                            <div>
                              <p className="text-sm text-purple-600 font-medium">File Tugas</p>
                              <button
                                onClick={() => window.open(`${t?.filetugas}`, '_blank', 'noopener,noreferrer')}
                                className="font-bold text-purple-900 hover:underline"
                              >
                                Lihat Tugas
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Grade */}
                        <div className="bg-yellow-50 rounded-2xl p-4">
                          <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-yellow-600" />
                            <div>
                              <p className="text-sm text-yellow-600 font-medium">Nilai</p>
                              <p className="font-bold text-yellow-900">
                                {nilai ? `${nilai}/100` : "Belum dinilai"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2">
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                          isOverdue 
                            ? 'bg-red-100 text-red-800' 
                            : t.statustugas === 'selesai'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {isOverdue ? "Terlambat" : t.statustugas}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex lg:flex-col gap-3">
                      {/* Grade Button */}
                      <div className="relative group">
                        <button
                          onClick={() => tambahNilai(t.idtugasbelajar)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                        >
                          <Pencil className="w-6 h-6" />
                        </button>
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                          Beri Nilai
                        </span>
                      </div>

                      {/* Edit Button */}
                      <div className="relative group">
                        <button
                          onClick={() => tambahEdit(t.idtugasbelajar)}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                        >
                          <Edit className="w-6 h-6" />
                        </button>
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                          Edit Tugas
                        </span>
                      </div>

                      {/* Delete Button */}
                      <div className="relative group">
                        <button
                          onClick={() => hapusTugas(t.idtugasbelajar)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-4 rounded-2xl hover:scale-110 hover:shadow-xl transition-all duration-300 shadow-lg"
                        >
                          <Trash className="w-6 h-6" />
                        </button>
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-transform bg-gray-900 text-white text-sm rounded-xl px-3 py-2 whitespace-nowrap shadow-lg">
                          Hapus Tugas
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <ModalTugas
        isOpen={showModalTugas}
        onClose={() => setShowModalTugas(false)}
        booking={booking}
      />

      <ModalNilai
        isOpen={showModalNilai}
        onClose={() => setShowModalNilai(false)}
        selectedTugasBelajar={selectedTugasBelajar}
        booking={booking}
      />

      <ModalEditTugas
        isOpen={showModalEdit}
        onClose={() => setShowModalEdit(false)}
        editTugas={selectedTugasBelajar}
        booking={booking}
      />

      {/* Delete Confirmation Modal */}
      {showModalHapus && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="bg-red-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Konfirmasi Hapus</h3>
              <p className="text-gray-600 mb-8">Apakah Anda yakin ingin menghapus tugas ini? Tindakan ini tidak dapat dibatalkan.</p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => handleHapus(selectedHapus)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {textButtonHapus}
                </button>
                <button
                  onClick={() => setShowModalHapus(false)}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TugasNilai;