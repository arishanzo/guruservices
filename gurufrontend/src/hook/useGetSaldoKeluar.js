import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getSaldoKeluar } from "../lib/data/saldo/getSaldoKeluar";

export const UseGetSaldoKeluar = () => {
  const [saldoKeluar, setSaldoKeluar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  

    
    const controller = new AbortController(); 

    const fetchSaldoKeluar = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getSaldoKeluar( {signal: controller.signal }), 5, 3000);
         setSaldoKeluar(result.data || null);

      } catch (error) {

          if (error.name === "AbortError") return; 

            if (error?.response?.status === 404) {
            setSaldoKeluar(null)
          } else {
            setError(error?.response?.data?.message || error.message);
          }

      } finally {
         setLoading(false);
      }

    };

  
      fetchSaldoKeluar();


  
    return () => controller.abort();
  }, []);

  return { saldoKeluar, loading, error };
};
