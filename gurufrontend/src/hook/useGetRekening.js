import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getDataRekening } from "../lib/data/getDataRekening";

export const UseGetRekening = (idguru) => {

  const [filerekening, setRekening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idguru) {
      setLoading(false);
      return;
    }

    const fetchRekening = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getDataRekening(idguru), 5, 3000);
        if (isMounted) setRekening(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setRekening(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Data File Rekening"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchRekening();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { filerekening, loading, error };
};
