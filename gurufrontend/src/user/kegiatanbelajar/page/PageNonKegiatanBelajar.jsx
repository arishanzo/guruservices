const PageNonKegiatanBelajar = ( { handleRedirectToKelas}) => {

    return (
    <>
     

 

         <div className="flex flex-col items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold text-gray-800">Kamu Belum Memiliki Kegiatan</h1>
    <p className="text-gray-600">Silahkan Tambah Kegiatan Kelas Di Halaman Kelas</p>
    <button
      onClick={handleRedirectToKelas}
      className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
    >
      Kembali Ke Kelas Anda
    </button>
  </div>
    </>
    )
}

export default PageNonKegiatanBelajar;