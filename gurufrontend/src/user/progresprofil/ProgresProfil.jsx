import { useEffect, useState } from 'react';
import axiosClient from '../../lib/axios';

const ProgresProfil = () => {

      const [percent, setPercent] = useState(0);
  const [missing, setMissing] = useState([]);
  const [showpercent, setShowPercent] = useState(false);
  const [status, setStatus] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get('api/profiles/completion');
        const data = response.data;

        setPercent(data.percent ?? 0);
        setMissing(data.missing ?? []);

        if (data.percent < 100) {
          setShowPercent(true);
        } else {
          setShowPercent(false);

          // cek apakah status sudah pernah ditampilkan
          const alreadyShown = localStorage.getItem("profileStatusShown");

          if (!alreadyShown) {
            setStatus('Profil Anda sudah lengkap 100%! Status berhasil diperbarui, Anda bisa mulai mengajar.');
            
            // tandai sudah pernah ditampilkan
            localStorage.setItem("profileStatusShown", "true");

            // hilangkan pesan setelah 5 detik
            setTimeout(() => {
              setStatus('');
            }, 5000);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

    return (

        <>
        {status && 
                 <div 
                  role="alert"
                 className={`text-start mb-4 ${status?.includes('berhasil') || status?.includes('lengkap') ? 'bg-green-100 rounded-lg py-5 px-6 mb-4 text-base text-green-700 mb-3' : 'bg-red-100 rounded-lg py-5 px-6 mb-4 text-base text-red-700 mb-3 w-50'}`}>
                    {status}
                 </div>              
                  
                  }


        {showpercent && (
            <div className="p-4 border rounded-lg shadow bg-white mb-4">
            <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold">Progress Profil Guru</span>
                <span className="text-sm font-bold">{percent}%</span>
            </div>
            <div className="w-full bg-gray-200 h-3 rounded overflow-hidden">
                <div
                className="h-3 bg-green-500 transition-all"
                style={{ width: `${percent}%` }}
                />
            </div>
            {percent < 100 && (
              
                <div className="mt-2 text-xs text-gray-600">
                <p className="mb-1">Silahkan Lengkapi data berikut:</p>
                <ul className="list-disc pl-5">
                    {missing.map((m, i) => <li key={i}>{m}</li>)}
                </ul>
                </div>
            )}
            </div>
        )
        }

        </>

  );

};

export default ProgresProfil;