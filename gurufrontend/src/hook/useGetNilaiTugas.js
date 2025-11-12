import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getNilaiTugas } from "../lib/data/getNilaiTugas";

export const UseNilaiTugas = (idguru) => {
  const [nilaiTugas, setNilaiTugas] = useState(null);
  const [loadingNilaiTugas, setLoadingNilaiTugas] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idguru) {
      setLoadingNilaiTugas(false);
      return;
    }

    const fetchNilaiTugas = async () => {
      try {

        setLoadingNilaiTugas(true);
        const result = await getFetchCache( () => getNilaiTugas(idguru), 5, 3000);
        if (isMounted) setNilaiTugas(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setNilaiTugas(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat profil"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingNilaiTugas(false);
      }

    };

    const timer = setTimeout(() => {
      fetchNilaiTugas();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [idguru]);

  return { nilaiTugas, loadingNilaiTugas, error };
};
