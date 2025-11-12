import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getPhotoProfilService } from "../lib/services/photoProfilService";

export const UseGetPhotoProfil = (foto_profil) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState("https://github.com/gaearon.png");

  useEffect(() => {
    let isMounted = true;
    let objectUrl;

    if (!foto_profil) {
      setLoading(false);
      return;
    }

    const fetchFotoProfil = async () => {
      try {
        setLoading(true);
        const result = await getFetchCache(() => getPhotoProfilService(foto_profil), 5, 3000);
        if (isMounted && result?.data) {
       
          objectUrl = URL.createObjectURL(result.data);
          
          console.log(objectUrl)
          setPhoto(objectUrl);
        }
      } catch (error) {
        if (isMounted) {
          if (error?.response?.status === 404) {
            setPhoto(null);
          } else {
            setError(error?.response?.data?.message || error?.message || "Gagal memuat profil");
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFotoProfil();

    return () => {
      isMounted = false;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [foto_profil]);

  return { loading, error, photo };
};