import { motion as Motion, AnimatePresence } from "framer-motion";
import { X, Wallet, CreditCard } from "lucide-react";
import { useState } from "react";

const ModalPenarikan = ({ isOpen, onClose }) => {
  const [jumlah, setJumlah] = useState("");
  const saldoTersedia = 2500000; // Contoh saldo, bisa dari props atau state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (saldoTersedia === 0) {
      alert("Saldo tidak mencukupi untuk melakukan penarikan");
      return;
    }
    if (parseInt(jumlah) > saldoTersedia) {
      alert("Jumlah penarikan melebihi saldo tersedia");
      return;
    }
 
    onClose();
  };

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

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
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-6 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Wallet size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Penarikan Saldo</h2>
                  <p className="text-white/80 text-sm">Cairkan saldo Anda dengan mudah</p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Saldo Tersedia */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 text-center">
                <p className="text-sm text-gray-600 mb-2">Saldo Tersedia</p>
                <p className="text-3xl font-bold text-gray-900">{formatRupiah(saldoTersedia)}</p>
                {saldoTersedia === 0 && (
                  <p className="text-red-500 text-sm mt-2">⚠️ Saldo tidak mencukupi untuk penarikan</p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Input Jumlah */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Jumlah Penarikan
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={jumlah}
                      onChange={(e) => setJumlah(e.target.value)}
                      placeholder="0"
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-lg font-medium"
                      disabled={saldoTersedia === 0}
                      required
                    />
                  </div>
                </div>

             
              </form>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 text-gray-600 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saldoTersedia === 0 || !jumlah}
                  className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Tarik Saldo
                </button>
              </div>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
  
    

};
export default ModalPenarikan;