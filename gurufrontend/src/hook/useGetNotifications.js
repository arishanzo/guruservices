


  import { useState, useEffect } from "react";
  import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getNotifications } from "../lib/services/notificationsService";
  
  export const UseGetNotifications = (iduser) => {
     
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const [resultNotifications, setResultNotifications] = useState(null);
        const [unreadCount, setUnreadCount] = useState(0);
  
        useEffect(() => {
          let isMounted = true;
          if (!iduser) {
            setLoading(false);
            return;
          }
      
          const fetchNotifications = async () => {
            try {
      
              setLoading(true);
              const resultget = await getFetchCache( () => getNotifications(), 5, 3000);
              if (isMounted) { 
                setResultNotifications(resultget || null)
                setUnreadCount(resultget.filter(n => !n.read_at).length);
              }
      
            } catch (error) {
      
              if (isMounted) {
                if (error?.response?.status === 404) {
                  setResultNotifications(null);
                   setUnreadCount(0);
                } else {
                  setError(
                    error?.response?.data?.message ||
                      error?.message ||
                      "Gagal memuat Notifikasi"
                  );
                  setUnreadCount(0);
                }
              }
      
            } finally {
              if (isMounted) setLoading(false);
            }
      
          };
      
          const timer = setTimeout(() => {
            fetchNotifications();
          }, 100);
      
          return () => {
            isMounted = false;
            clearTimeout(timer);
          };
        }, [iduser]);
      
        return { resultNotifications, loading, error, unreadCount };
  
  
  
  }
  
  