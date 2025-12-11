


  import { useState, useEffect } from "react";
  import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getNotifications } from "../lib/services/notificationsService";
  
  export const UseGetNotifications = (iduser) => {
     
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
      const [resultNotifications, setResultNotifications] = useState(null);
        const [unreadCount, setUnreadCount] = useState(0);
  
        useEffect(() => {
          if (!iduser) {
            setLoading(false);
            return;
          }
          
          
    
        const controller = new AbortController();

          const fetchNotifications = async () => {
            try {
      
              setLoading(true);
              const resultget = await getFetchCache( () => getNotifications({signal: controller.signal }), 5, 3000);
             
                setResultNotifications(resultget || null)
                setUnreadCount(resultget.filter(n => !n.read_at).length);
              
        } catch (error) {

          if (error.name === "AbortError") return; 

            if (error?.response?.status === 404) {
            setResultNotifications(null);
                      setUnreadCount(0);
          } else {
            setError(error?.response?.data?.message || error.message);
          }

          } finally {
               setLoading(false);
            }
      
          };
      
            fetchNotifications();
          
      
        return () => controller.abort();
        
        }, [iduser]);
      
        return { resultNotifications, loading, error, unreadCount };
  
  
  
  }
  
  