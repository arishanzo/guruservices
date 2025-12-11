import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getTugasBelajar } from "../lib/data/getTugasBelajar";

export const UseTugasBelajar = (idguru) => {

  const [tugasBelajar, setTugasBelajar] = useState(null);
  const [loadingTugasBelajar, setLoadingTugasBelajar] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!idguru) {
      setLoadingTugasBelajar(false);
      return;
    }

    
    const controller = new AbortController(); 

    const fetchTugasBelajar = async () => {
      try {

        setLoadingTugasBelajar(true);
        const result = await getFetchCache( () => getTugasBelajar(idguru, {signal: controller.signal }), 5, 3000);
         setTugasBelajar(result.data || null);

      } catch (error) {

          if (error.name === "AbortError") return; 

            if (error?.response?.status === 404) {
            setTugasBelajar(null)
          } else {
            setError(error?.response?.data?.message || error.message);
          }

      } finally {
         setLoadingTugasBelajar(false);
      }

    };

  
      fetchTugasBelajar();
  

   
      return () => controller.abort();

  }, [idguru, tugasBelajar]);

  return { tugasBelajar, loadingTugasBelajar, error };
};
