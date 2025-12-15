
import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Clock, CheckCircle, XCircle, History } from "lucide-react";

const ModalStatusPenarikan = ({ isOpen, onClose }) => {
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={20} />;
      case 'berhasil': return <CheckCircle size={20} />;
      case 'ditolak': return <XCircle size={20} />;
      default: return <Clock size={20} />;
    }
  };

  const statusData = [
    { id: '001', jumlah: 500000, tanggal: '15 Jan 2024', status: 'pending', deskripsi: 'Penarikan untuk kebutuhan pribadi' },
    { id: '002', jumlah: 750000, tanggal: '10 Jan 2024', status: 'berhasil', deskripsi: 'Penarikan gaji bulanan' },
    { id: '003', jumlah: 300000, tanggal: '5 Jan 2024', status: 'ditolak', deskripsi: 'Penarikan darurat' }
  ];

  return (

      <AnimatePresence>
      {isOpen && (
        <Motion.div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-auto overflow-hidden max-h-[90vh]"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-indigo-600 px-6 py-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <History size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Riwayat Penarikan</h2>
                  <p className="text-white/80 text-sm">Lihat status semua penarikan Anda</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-4">
                {statusData.map((item) => {
                  const statusConfig = {
                    pending: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-800', text: 'Pending' },
                    berhasil: { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-800', text: 'Berhasil' },
                    ditolak: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-800', text: 'Ditolak' }
                  };
                  
                  const config = statusConfig[item.status];
                  
                  return (
                    <div key={item.id} className={`${config.bg} ${config.border} border-2 rounded-2xl p-5 transition-all hover:shadow-md`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`${config.badge} p-2 rounded-full`}>
                            {getStatusIcon(item.status)}
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">Penarikan #{item.id}</h3>
                            <p className="text-sm text-gray-600">{item.deskripsi}</p>
                          </div>
                        </div>
                        <span className={`${config.badge} text-sm px-3 py-1 rounded-full font-medium`}>
                          {config.text}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-gray-900">{formatRupiah(item.jumlah)}</p>
                        <p className="text-sm text-gray-500">{item.tanggal}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 flex justify-center">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-indigo-600 text-white rounded-2xl hover:from-green-600 hover:to-indigo-700 transition-all font-semibold"
              >
                Tutup
              </button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
  
}

export default ModalStatusPenarikan;


