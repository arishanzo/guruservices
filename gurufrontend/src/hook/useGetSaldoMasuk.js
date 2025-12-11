import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getSaldoMasuk } from "../lib/data/saldo/getSaldoMasuk";

export const UseGetSaldoMasuk = () => {
  const [saldoMasuk, setSaldoMasuk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    
    const controller = new AbortController(); 

    const fetchSaldoMasuk = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getSaldoMasuk( {signal: controller.signal }), 5, 3000);
        setSaldoMasuk(result.data || null);

       } catch (error) {

          if (error.name === "AbortError") return; 

            if (error?.response?.status === 404) {
            setSaldoMasuk(null)
          } else {
            setError(error?.response?.data?.message || error.message);
          }

      } finally {
        setLoading(false);
      }

    };

      fetchSaldoMasuk();
  

      return () => controller.abort();
  }, []);

  return { saldoMasuk, loading, error };
};
