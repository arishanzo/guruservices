import { useEffect, useState } from "react";
import { getDataFileGuru } from "../lib/data/getDataFileGuru";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";

export const UseGetFileGuru = (idguru) => {

  const [fileguru, setFileGuru] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idguru) {
      setLoading(false);
      return;
    }

    const fetchFileGuru = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getDataFileGuru(idguru), 5, 3000);
        if (isMounted) setFileGuru(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setFileGuru(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Data File Guru"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchFileGuru();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [idguru]);

  return { fileguru, loading, error };
};
