import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getTugasBelajar } from "../lib/data/getTugasBelajar";

export const UseTugasBelajar = (idguru) => {

  const [tugasBelajar, setTugasBelajar] = useState(null);
  const [loadingTugasBelajar, setLoadingTugasBelajar] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idguru) {
      setLoadingTugasBelajar(false);
      return;
    }

    const fetchTugasBelajar = async () => {
      try {

        setLoadingTugasBelajar(true);
        const result = await getFetchCache( () => getTugasBelajar(idguru), 5, 3000);
        if (isMounted) setTugasBelajar(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setTugasBelajar(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Data File Rekening"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingTugasBelajar(false);
      }

    };

    const timer = setTimeout(() => {
      fetchTugasBelajar();
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [idguru, tugasBelajar]);

  return { tugasBelajar, loadingTugasBelajar, error };
};
