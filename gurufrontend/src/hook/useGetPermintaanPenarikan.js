import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getPermintaanPenarikan } from "../lib/data/getPermintaanPenarikan";

export const UseGetPermintaanPenarikan = (idprofilguru) => {
  const [penarikan, setPenarikan] = useState(null);
  const [loadingPenarikan, setLoadingPenarikan] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idprofilguru) {
      setLoadingPenarikan(false);
      return;
    }

    
    const controller = new AbortController();
    
    const fetchPenarikan = async () => {
      try {

        setLoadingPenarikan(true);
        const result = await getFetchCache( () => getPermintaanPenarikan(idprofilguru, { signal: controller.signal }), 5, 3000);
        setPenarikan(result.data || null);

       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setPenarikan(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
       setLoadingPenarikan(false);
      }

    };

        fetchPenarikan();
   

     return () => controller.abort();
     
  }, [idprofilguru]);

  return { penarikan, loadingPenarikan, error };
};
