import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getDataKegiatanBelajar } from "../lib/data/getDataKegiatanBelajar";

export const UseGetKegiatanBelajar = (idguru) => {
  const [kegiatanBelajar, setKegiatanBelajar] = useState(null);
  const [loadingKegiatanBelajar, setLoadingKegiatanBelajar] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idguru) {
      setLoadingKegiatanBelajar(false);
      return;
    }

    const fetchProfil = async () => {
      try {

        setLoadingKegiatanBelajar(true);
        const result = await getFetchCache( () => getDataKegiatanBelajar(idguru), 5, 3000);
        if (isMounted) setKegiatanBelajar(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setKegiatanBelajar(null);
              if (isMounted) setLoadingKegiatanBelajar(false);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat profil"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingKegiatanBelajar(false);
      }

    };

    const timer = setTimeout(() => {
      fetchProfil();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [idguru]);

  return { kegiatanBelajar, loadingKegiatanBelajar, error };
};
