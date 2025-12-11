import { useEffect, useState } from "react";
import { getProfil } from "../lib/services/profileService";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";

export const UseGetProfil = (iduser) => {
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
 
    if (!iduser) {
      setLoading(false);
      return;
    }

    
    
        const controller = new AbortController();

    const fetchProfil = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getProfil(iduser, {signal: controller.signal } ), 5, 3000);
         setProfil(result.data || null);

    } catch (error) {

          if (error.name === "AbortError") return; 

            if (error?.response?.status === 404) {
            setProfil(null)
          } else {
            setError(error?.response?.data?.message || error.message);
          }

      } finally {
        setLoading(false);
      }

    };

   
      fetchProfil();
 

   return () => controller.abort();
   
  }, [iduser]);

  return { profil, loading, error };
};
