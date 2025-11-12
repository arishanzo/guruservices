import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user } = useAuth();
console.log(user)
  
    if (user) return <Navigate to="/dashboard" />;

    return children;
}


export default PrivateRoute;