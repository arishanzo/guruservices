import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getAbsensiGuru } from "../lib/data/getAbsensiGuru";

export const UseGetAbsensiGuru = (idguru) => {
  const [absensiGuru, setAbsensiGuru] = useState(null);
  const [loadingAbsensiGuru, setLoadingAbsensiGuru] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idguru) {
      setLoadingAbsensiGuru(false);
      return;
    }

    const fetchProfil = async () => {
      try {

        setLoadingAbsensiGuru(true);
        const result = await getFetchCache( () => getAbsensiGuru(idguru), 5, 3000);
        if (isMounted) setAbsensiGuru(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setAbsensiGuru(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingAbsensiGuru(false);
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

  return { absensiGuru, loadingAbsensiGuru, error };
};
