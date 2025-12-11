const DashboardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* GRID SALDO + INFORMASI */}
      <div className="grid grid-cols-1 md:grid-cols-3 py-4 mb-4 gap-8">

        {/* Saldo Skeleton */}
        <div className="bg-gray-200 rounded-2xl p-6 shadow-lg h-40">
          <div className="flex items-center justify-between">
            <div className="flex-col">
              <div className="h-3 w-32 bg-gray-300 rounded mb-3"></div>
              <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>
              <div className="h-3 w-24 bg-gray-300 rounded"></div>
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-xl"></div>
          </div>
          <div className="h-9 w-full bg-gray-300 rounded-lg mt-4"></div>
        </div>

        {/* Info Skeleton */}
        <div className="md:col-span-2">
          <div className="h-4 w-32 bg-gray-300 rounded mb-3"></div>
          <div className="bg-gray-200 shadow-xl rounded-2xl p-4 h-32">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-300 rounded-xl p-4 h-24"></div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Header Skeleton */}
      <div className="mb-6">
        <div className="h-4 w-40 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-28 bg-gray-300 rounded"></div>
      </div>

      {/* Menu Grid Skeleton */}
      <div className="grid md:grid-cols-6 grid-cols-3 gap-3 mb-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-gray-200 h-20 rounded-2xl"></div>
        ))}
      </div>

      {/* Grid Jadwal & Absensi */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pt-6">
        
        {/* Absensi Skeleton */}
        <div className="bg-gray-200 rounded-3xl p-6 h-32"></div>

        {/* Jadwal Skeleton */}
        <div className="bg-gray-200 rounded-3xl p-6 space-y-4">
          <div className="h-6 bg-gray-300 rounded w-40"></div>

          <div className="h-20 bg-gray-300 rounded-2xl"></div>
          <div className="h-20 bg-gray-300 rounded-2xl"></div>
          <div className="h-20 bg-gray-300 rounded-2xl"></div>
        </div>

      </div>
    </div>
  );
};

export default DashboardSkeleton;