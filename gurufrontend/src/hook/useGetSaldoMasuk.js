import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getSaldoMasuk } from "../lib/data/saldo/getSaldoMasuk";

export const UseGetSaldoMasuk = () => {
  const [saldoMasuk, setSaldoMasuk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSaldoMasuk = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getSaldoMasuk(), 5, 3000);
        if (isMounted) setSaldoMasuk(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setSaldoMasuk(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat SaldoMasuk"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchSaldoMasuk();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { saldoMasuk, loading, error };
};
