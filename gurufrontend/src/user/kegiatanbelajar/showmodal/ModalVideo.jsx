import { motion as Motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { convertYouTubeUrl } from "../../../utils/convertYouTubeUrl";

const ModalVideo = ({ isOpen, onClose,   linkvideo }) => {

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
            <h2 className="text-xl font-semibold text-green-700">Video Kegiatan Anak</h2>
            <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            >
            <X size={24} />
            </button>
        </div>

         {/* Body */}
  <div className="px-4 py-5 sm:p-0 max-h-[70vh] overflow-y-auto md:overflow-y-hidden">
     <div className="w-full aspect-video">
            {linkvideo? (
        <iframe
            className="w-full h-full rounded-xl md:p-8 p-4"
            src={convertYouTubeUrl(linkvideo)}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
        ></iframe>
        ) : (
        <p className="text-center text-gray-500">Video tidak tersedia</p>
        )}

    </div>
  </div>

  </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  )
      }
      
      export default ModalVideo;