import { useState, useEffect } from 'react';
import { checkBackendConnection } from '../utils/connectionCheck';

const ConnectionStatus = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      const result = await checkBackendConnection();
      setIsOnline(result.connected);
      
      if (!result.connected) {
        setShowStatus(true);
        setTimeout(() => setShowStatus(false), 5000);
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!showStatus || isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 z-50">
      <span className="text-sm">
        ⚠️ Tidak dapat terhubung ke server. Beberapa fitur mungkin tidak tersedia.
      </span>
    </div>
  );
};

export default ConnectionStatus;