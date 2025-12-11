import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getDataKegiatanBelajar } from "../lib/data/getDataKegiatanBelajar";

export const UseGetKegiatanBelajar = (idguru) => {
  const [kegiatanBelajar, setKegiatanBelajar] = useState(null);
  const [loadingKegiatanBelajar, setLoadingKegiatanBelajar] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idguru) {
      setLoadingKegiatanBelajar(false);
      return;
    }

     const controller = new AbortController();

    const fetchKegiatanBelajar = async () => {
      try {

        setLoadingKegiatanBelajar(true);
        const result = await getFetchCache( () => getDataKegiatanBelajar(idguru, { signal: controller.signal }), 5, 3000);
         setKegiatanBelajar(result.data || null);

     } catch (error) {

          if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setKegiatanBelajar(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
        setLoadingKegiatanBelajar(false);
      }

    };

      fetchKegiatanBelajar();


  return () => controller.abort();

  }, [idguru]);

  return { kegiatanBelajar, loadingKegiatanBelajar, error };
};
