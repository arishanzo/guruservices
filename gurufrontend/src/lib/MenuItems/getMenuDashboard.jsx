const getMenuDashboard = () => ([
    { 
      id: 1, 
      judul: 'Profil', 
      icon: '👤',
      color: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600'
    },
    { 
      id: 2, 
      judul: 'Jadwal', 
      icon: '📅',
      color: 'bg-green-50 border-green-200',
      iconColor: 'text-green-600'
    },
    { 
      id: 3, 
      judul: 'Siswa', 
      icon: '👥',
      color: 'bg-orange-50 border-orange-200',
      iconColor: 'text-orange-600'
    },
    { 
      id: 4, 
      judul: 'Kelas', 
      icon: '🏫',
      color: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600'
    },
    { 
      id: 5, 
      judul: 'Absensi', 
      icon: '📝',
      color: 'bg-red-50 border-red-200',
      iconColor: 'text-red-600'
    },
    { 
      id: 6, 
      judul: 'Lainnya', 
      icon: '⋯',
      color: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-600'
    },
  ]);
  
  export { getMenuDashboard };