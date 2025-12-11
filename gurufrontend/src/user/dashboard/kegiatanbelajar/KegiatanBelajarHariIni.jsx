
import { Calendar, Clock, FileText, Image, Video, ExternalLink, Plus } from 'lucide-react';

const KegiatanBelajarHarini = ( { kegiatan }) => {

 

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Kegiatan Belajar Hari Ini</h1>
                    <p className="text-gray-600">Anda Berhasil Menambahkan Kegiatan Hari Ini,  Anda Tidak Bisa Edit Disini. Edit Di Halaman Kegiatan Belajar</p>
                </div>

            

                {/* Kegiatan Card */}
                {kegiatan && (
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                            {/* Header dengan Foto */}
                            <div className="relative h-64 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
                                {kegiatan.fotokegiatan ? (
                                    <img 
                                        src={`${import.meta.env.VITE_API_URL}/api/fotokegiatan/${encodeURIComponent(kegiatan.fotokegiatan)}`}
                                        alt={kegiatan.namakegiatan}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="text-center">
                                            <Image className="h-20 w-20 text-white/70 mx-auto mb-4" />
                                            <p className="text-white/80 text-lg font-medium">Foto Kegiatan</p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Overlay dengan info tanggal */}
                                <div className="absolute inset-0 bg-black/20">
                                    <div className="absolute top-6 right-6">
                                        <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-2">
                                            <Calendar className="h-4 w-4 text-gray-600" />
                                            <span className="text-sm font-semibold text-gray-700">
                                                {kegiatan.tglkegiatan ? 
                                                    new Date(kegiatan.tglkegiatan).toLocaleDateString('id-ID', {
                                                        weekday: 'long',
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    }) : 'Tanggal belum ditentukan'
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Judul Kegiatan */}
                                <div className="mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                        {kegiatan.namakegiatan || 'Nama Kegiatan Belum Diisi'}
                                    </h2>
                                    <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                </div>

                                {/* Deskripsi */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                                        <FileText className="h-5 w-5 mr-2 text-blue-500" />
                                        Deskripsi Kegiatan
                                    </h3>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-600 leading-relaxed">
                                            {kegiatan.deskripsikegiatan || 'Deskripsi kegiatan belum diisi. Silakan tambahkan deskripsi untuk memberikan informasi lebih detail tentang kegiatan pembelajaran ini.'}
                                        </p>
                                    </div>
                                </div>

                                {/* Media dan Materi */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {/* Video Section */}
                                    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-6 border border-red-100">
                                        <div className="flex items-center mb-4">
                                            <Video className="h-6 w-6 text-red-500 mr-3" />
                                            <h4 className="text-lg font-semibold text-gray-800">Video Pembelajaran</h4>
                                        </div>
                                        {kegiatan.videokegiatan ? (
                                            <a 
                                                href={kegiatan.videokegiatan}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                            >
                                                <Video className="h-5 w-5 mr-2" />
                                                Tonton Video
                                            </a>
                                        ) : (
                                            <div className="text-gray-500 italic">
                                                Video belum tersedia
                                            </div>
                                        )}
                                    </div>

                                    {/* Materi Section */}
                                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                                        <div className="flex items-center mb-4">
                                            <ExternalLink className="h-6 w-6 text-blue-500 mr-3" />
                                            <h4 className="text-lg font-semibold text-gray-800">Materi Pembelajaran</h4>
                                        </div>
                                        {kegiatan.linkmateri ? (
                                            <a 
                                                href={kegiatan.linkmateri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-200 transform hover:scale-105 shadow-lg"
                                            >
                                                <ExternalLink className="h-5 w-5 mr-2" />
                                                Buka Materi
                                            </a>
                                        ) : (
                                            <div className="text-gray-500 italic">
                                                Materi belum tersedia
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Status Badge */}
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center space-x-3">
                                        <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                            ✓ Kegiatan Aktif
                                        </span>
                                        <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                                            <Clock className="h-4 w-4 inline mr-1" />
                                            Hari Ini
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default KegiatanBelajarHarini;