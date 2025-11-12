import {  useState } from 'react';
import { Video, Image, FileText, Edit, Calendar } from "lucide-react";
import { UseBookingKelas } from "../../../hook/useGetBookingKelas";
import { UseGetProfil } from "../../../hook/useGetProfil";
import ModalVideo from '../showmodal/ModalVideo';
import ModalImage from '../showmodal/ModalImage';
import ModalEditKegiatan from '../showmodal/ModalEditKegiatan';

const PageKegiatanBelajar = ( {kegiatanBelajar}) => {
    
  const options = { day: "numeric", month: "long", year: "numeric" };
    
    const { profil } = UseGetProfil(kegiatanBelajar[0]?.idguru);
    const { booking } = UseBookingKelas(profil?.idprofilguru);

    const [showModalVideo, setShowModalVideo] = useState(false);
    const [videoKegiatan, setVideoKegiatan] = useState(null);


    const [showModalImage, setShowModalImage] = useState(false);
    const [linkFotoKegiatan, setLinkFotoKegiatan] = useState(null);

    const [kegiatanByID, setKegiatanByID] = useState(null);
    const [showModalEditKegiatan, setShowModalEditKegiatan] = useState(false);


      const video = (videokegiatan) => {
           if (!videokegiatan) return;

              setVideoKegiatan(videokegiatan);
              setShowModalVideo(true);
            
          };

    const foto = (fotokegiatan) => {
              setLinkFotoKegiatan(fotokegiatan);
              setShowModalImage(true);

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
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col ">
      <h1 className="md:text-2xl text-xl font-bold mb-2 text-green-800">
        Kegiatan Belajar
      </h1>
 

      <hr className="mb-4 border-gray-200"></hr>



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

<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl mb-4 md:mb-8">

  {kegiatanBelajar.map((b, i) => (
  
    <div key={i} className="flex flex-col py-4">
       <div  className="flex items-center gap-2 text-gray-500 mb-4">
      <Calendar className="w-4 h-4" />
      <span className="text-sm">{new Date(b?.tglkegiatan).toLocaleDateString("id-ID", options)}</span>
      </div>

      <div className="bg-white shadow-lg hover:shadow-xl shadow-green-100  transition rounded-2xl h-full min-h-[250px]">
   
          <div className=" flex items-center justify-between p-4 border-b">
            <h2 className="md:text-lg text-lg font-bold text-green-800 font-semibold">{b?.namakegiatan}</h2>
            <button 
             onClick={() => editkegiatan(b?.idkegiatanbelajar)}
            className="border rounded-lg px-3 py-1 text-sm flex items-center gap-1 hover:bg-gray-100">
              <Edit className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <p className="text-gray-600 mb-2">
              {b?.deskripsikegiatan}
            </p>
            <p className="text-sm text-gray-500 mb-1">Guru: Ibu Sari</p>
            <p className="text-sm text-gray-500 mb-12">Siswa: 28 orang</p>
            <div className="flex items-center gap-4 text-gray-500 mt-auto">
              <button
                onClick={() => video(b?.videokegiatan)}
               className="flex items-center gap-1 hover:text-blue-600">
                <Video className="w-5 h-5" /> 
              </button>
              <button 
              onClick={() => foto(b?.fotokegiatan)}
              className="flex items-center gap-1 hover:text-blue-600">
                <Image className="w-5 h-5" /> 
              </button>
              <button 
               onClick={() => link(b?.linkmateri)}
              className="flex items-center gap-1 hover:text-blue-600">
                <FileText className="w-5 h-5" /> 
              </button>
            </div>
          
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

                <ModalImage 
                  isOpen={showModalImage}
                  onClose={() => setShowModalImage(false)}
                  linkImage={linkFotoKegiatan}
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

    
  );
};

export default PageKegiatanBelajar;