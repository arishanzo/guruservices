import { useEffect, useState } from "react";
import { getDataFileGuru } from "../lib/data/getDataFileGuru";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";

export const UseGetFileGuru = (idguru) => {

  const [fileguru, setFileGuru] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    if (!idguru) {
      setLoading(false);
      return;
    }

     const controller = new AbortController();
    
    const fetchFileGuru = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache( () => getDataFileGuru(idguru, { signal: controller.signal }), 5, 3000);
       setFileGuru(result.data || null);

    
      } catch (error) {

          if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setFileGuru(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
       setLoading(false);
      }

    };

  
  fetchFileGuru();

  return () => controller.abort();


  }, [idguru]);

  return { fileguru, loading, error };
};
