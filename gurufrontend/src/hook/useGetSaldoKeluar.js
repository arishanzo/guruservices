import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getSaldoKeluar } from "../lib/data/saldo/getSaldoKeluar";

export const UseGetSaldoKeluar = () => {
  const [saldoKeluar, setSaldoKeluar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSaldoKeluar = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getSaldoKeluar(), 5, 3000);
        if (isMounted) setSaldoKeluar(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setSaldoKeluar(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat SaldoKeluar"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchSaldoKeluar();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { saldoKeluar, loading, error };
};
