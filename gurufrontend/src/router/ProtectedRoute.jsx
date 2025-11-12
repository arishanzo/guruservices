import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();
    

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-greem-50 to-green-100">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-600 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
            </div>
            <div className="mt-6 text-center">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-600 bg-clip-text text-transparent animate-pulse">
                    Go-Pintar
                </h2>
                <p className="text-gray-600 mt-2 animate-pulse">Memuat...</p>
            </div>
        </div>
    );

   if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;