
  import { useState, useEffect } from "react";
  export const UsePageLoading = () => {

    const [pageLoading, setPageLoading] = useState(true);

useEffect(() => {
        const timer = setTimeout(() => {
               setPageLoading(false);    
        }, 5000);
        return () => clearTimeout(timer);
    }, []);

 return { pageLoading  };
}

export default UsePageLoading;