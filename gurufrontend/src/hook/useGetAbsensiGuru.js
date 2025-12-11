import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getAbsensiGuru } from "../lib/data/getAbsensiGuru";

export const UseGetAbsensiGuru = (idguru) => {
  const [absensiGuru, setAbsensiGuru] = useState(null);
  const [loadingAbsensiGuru, setLoadingAbsensiGuru] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idguru) {
      setLoadingAbsensiGuru(false);
      return;
    }

    
    const controller = new AbortController();
    
    const fetchProfil = async () => {
      try {

        setLoadingAbsensiGuru(true);
        const result = await getFetchCache( () => getAbsensiGuru(idguru, { signal: controller.signal }), 5, 3000);
        setAbsensiGuru(result.data || null);

       } catch (error) {

      if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setAbsensiGuru(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
       setLoadingAbsensiGuru(false);
      }

    };

        fetchProfil();
   

     return () => controller.abort();
     
  }, [idguru]);

  return { absensiGuru, loadingAbsensiGuru, error };
};
