import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getBookingKelas } from "../lib/data/kelas/getBookingKelas";

export const UseBookingKelas = (idprofilguru) => {

  const [booking, setBooking] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (!idprofilguru) {
      setLoadingBooking(false);
      return;
    }

    const fetchBooking = async () => {
      try {

        setLoadingBooking(true);
        const result = await getFetchCache( () => getBookingKelas(idprofilguru), 5, 3000);
        if (isMounted) setBooking(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setBooking(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Data File Rekening"
            );
          }
        }

      } finally {
        if (isMounted) setLoadingBooking(false);
      }

    };

    const timer = setTimeout(() => {
      fetchBooking();
    }, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { booking, loadingBooking, error };
};
