import { useEffect, useState } from "react";
import { getProfil } from "../lib/services/profileService";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";

export const UseGetProfil = (iduser) => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!iduser) {
      setLoading(false);
      return;
    }

    const fetchProfil = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getProfil(iduser), 5, 3000);
        if (isMounted) setProfil(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setProfil(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat profil"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchProfil();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { profil, loading, error };
};
