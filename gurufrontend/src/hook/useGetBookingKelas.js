import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getBookingKelas } from "../lib/data/kelas/getBookingKelas";

export const UseBookingKelas = (idprofilguru) => {

  const [booking, setBooking] = useState(null);
  const [loadingBooking, setLoadingBooking] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!idprofilguru) {
 
      setLoadingBooking(false);
      return;
    }

    const controller = new AbortController();

    const fetchBooking = async () => {
      try {

        setLoadingBooking(true);
          const result = await getFetchCache(() => getBookingKelas(idprofilguru, { signal: controller.signal }), 5,  3000 );

      setBooking(result.data);

      } catch (error) {

          if (error.name === "AbortError") return; 

        if (error?.response?.status === 404) {
        setBooking(null);
      } else {
        setError(error?.response?.data?.message || error.message);
      }

      } finally {
         setLoadingBooking(false);
      }

    };


    fetchBooking();

     return () => controller.abort();

  }, [idprofilguru]);

  return { booking, loadingBooking, error };
};
