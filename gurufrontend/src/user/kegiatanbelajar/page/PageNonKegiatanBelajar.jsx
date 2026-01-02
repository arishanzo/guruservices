const PageNonKegiatanBelajar = ( { handleRedirectToKelas}) => {

    return (
    <>
     

<div className="min-h-screen flex items-center justify-center px-4">
  <div className="text-center max-w-md">

    <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6 text-2xl">
      📘
    </div>

    <h1 className="text-2xl font-semibold text-gray-800">
      Belum Ada Kegiatan
    </h1>

    <p className="text-gray-500 mt-2">
      Kamu belum memiliki kegiatan kelas.
      Silakan tambahkan kegiatan di halaman kelas.
    </p>

    <button
      onClick={handleRedirectToKelas}
      className="mt-6 inline-flex items-center px-6 py-3 rounded-xl
        bg-gradient-to-r from-green-600 to-green-600
        text-white font-medium shadow hover:opacity-90 transition"
    >
      Kembali ke Kelas
    </button>

  </div>
</div>

    </>
    )
}

export default PageNonKegiatanBelajar;