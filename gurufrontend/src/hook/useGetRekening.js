import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getDataRekening } from "../lib/data/getDataRekening";

export const UseGetRekening = (idguru) => {

  const [filerekening, setRekening] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idguru) {
      setLoading(false);
      return;
    }
    
    const controller = new AbortController(); 

    const fetchRekening = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getDataRekening(idguru , {signal: controller.signal }), 5, 3000);
        setRekening(result.data || null);

     } catch (error) {

          if (error.name === "AbortError") return; 

            if (error?.response?.status === 404) {
            setRekening(null)
          } else {
            setError(error?.response?.data?.message || error.message);
          }

      } finally {
        setLoading(false);
      }

    };

  
      fetchRekening();


    return () => controller.abort();
  }, [idguru]);

  return { filerekening, loading, error };
};
