import {  useState } from 'react';
import { Video, Image, FileText, Edit, Calendar, ExternalLink } from "lucide-react";
import { UseBookingKelas } from "../../../hook/useGetBookingKelas";
import { UseGetProfil } from "../../../hook/useGetProfil";
import ModalVideo from '../showmodal/ModalVideo';
import ModalImage from '../showmodal/ModalImage';
import ModalEditKegiatan from '../showmodal/ModalEditKegiatan';

const PageKegiatanBelajar = ( {kegiatanBelajar}) => {
    
    
    const { profil } = UseGetProfil(kegiatanBelajar[0]?.idguru);
    const { booking } = UseBookingKelas(profil?.idprofilguru);

    const [showModalVideo, setShowModalVideo] = useState(false);
    const [videoKegiatan, setVideoKegiatan] = useState(null);



    const [kegiatanByID, setKegiatanByID] = useState(null);
    const [showModalEditKegiatan, setShowModalEditKegiatan] = useState(false);


      const video = (videokegiatan) => {
           if (!videokegiatan) return;

              setVideoKegiatan(videokegiatan);
              setShowModalVideo(true);
            
          };

  

    const link = (linkmateri) => {
              window.open(linkmateri, "_blank");

          }

      const editkegiatan = (idkegiatanBelajar) => {
    
            const selected = kegiatanBelajar.find(
              (b) => b?.idkegiatanbelajar === idkegiatanBelajar
            );
            if (selected) {
              setKegiatanByID(selected); 
              setShowModalEditKegiatan(true);
            }
            
          };

  return (
    <div className="min-h-screen  p-6">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Kegiatan Belajar</h1>
          <p className="text-gray-600">Kelola dan pantau kegiatan pembelajaran</p>
        </div>



         {!booking ? (
              <div className="flex flex-col py-4 animate-pulse">
              <div className="flex items-center gap-2 text-gray-300 mb-4">
                <div className="w-4 h-4 bg-gray-300 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>

              <div className="bg-white shadow-lg shadow-green-100 rounded-2xl h-full min-h-[250px]">
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="h-5 w-2/3 bg-gray-300 rounded" />
                  <div className="h-6 w-16 bg-gray-200 rounded" />
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <div className="h-3 w-full bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-2/3 bg-gray-200 rounded mb-6" />
                  <div className="h-3 w-1/3 bg-gray-200 rounded mb-1" />
                  <div className="h-3 w-1/2 bg-gray-200 rounded mb-10" />

                  <div className="flex items-center gap-4 text-gray-400 mt-auto">
                    <div className="w-5 h-5 bg-gray-300 rounded" />
                    <div className="w-5 h-5 bg-gray-300 rounded" />
                    <div className="w-5 h-5 bg-gray-300 rounded" />
                  </div>
                </div>
              </div>
            </div>
        ) : booking.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Kamu Belum Punya Kelas.. Belum ada Kelas dan Kegiatan</p>
          </div>
        ) : (
<>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {kegiatanBelajar.map((b, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              {/* Image Header */}
              <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
                {b?.fotokegiatan ? (
                  <img 
                    src={`${import.meta.env.VITE_API_URL}/api/fotokegiatan/${encodeURIComponent(b?.fotokegiatan)}`}
                                   
                    alt={b?.namakegiatan}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Image className="h-16 w-16 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                    {new Date(b?.tglkegiatan).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <button 
                    onClick={() => editkegiatan(b?.idkegiatanbelajar)}
                    className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-700 hover:bg-white transition-colors duration-200 flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{b?.namakegiatan}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{b?.deskripsikegiatan}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Nama Siswa: {booking[0]?.namamurid}</p>
                  <p className="text-sm text-gray-500">kelas {booking[0]?.kelas} {booking[0]?.tingkatSekolah}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {b?.videokegiatan && (
                    <button 
                      onClick={() => video(b?.videokegiatan)}
                      className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Video
                    </button>
                  )}
                 
                  {b?.linkmateri && (
                    <button 
                      onClick={() => link(b?.linkmateri)}
                      className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Materi
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
   
                <ModalVideo
                  isOpen={showModalVideo}
                  onClose={() => setShowModalVideo(false)}
                  linkvideo={videoKegiatan}
                />

            

                  <ModalEditKegiatan 
                  isOpen={showModalEditKegiatan}
                  onClose={() => setShowModalEditKegiatan(false)}
                  kegiatanBelajar={kegiatanByID}
                  booking={booking}
                />
</>

        )}
      </div>
    </div>

    
  );
};

export default PageKegiatanBelajar;