import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getNilaiTugas } from "../lib/data/getNilaiTugas";

export const UseNilaiTugas = (idguru) => {
  const [nilaiTugas, setNilaiTugas] = useState(null);
  const [loadingNilaiTugas, setLoadingNilaiTugas] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!idguru) {
      setLoadingNilaiTugas(false);
      return;
    }

    
     const controller = new AbortController();

    const fetchNilaiTugas = async () => {
      try {

        setLoadingNilaiTugas(true);
        const result = await getFetchCache( () => getNilaiTugas(idguru , { signal: controller.signal }), 5, 3000);
        setNilaiTugas(result.data || null);

     } catch (error) {

          if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setNilaiTugas(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
       setLoadingNilaiTugas(false);
      }

    };

   fetchNilaiTugas();

   return () => controller.abort();
   
  }, [idguru]);

  return { nilaiTugas, loadingNilaiTugas, error };
};
