// src/context/AuthProvider.jsx
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axiosClient from "../lib/axios";

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user saat pertama kali aplikasi dibuka
  useEffect(() => {
    const controller = new AbortController();
    
    const fetchUser = async () => {

      if (user) return; // Skip jika user sudah ada
      
      try {
        // Cek session dulu
        await axiosClient.get("/sanctum/csrf-cookie", { signal: controller.signal });
        
        // Test session dengan endpoint yang tidak butuh auth
        const sessionCheck = await axiosClient.get("/api/check-session", { signal: controller.signal });
        
        if (sessionCheck.data.authenticated) {
          const res = await axiosClient.get("/api/user", { signal: controller.signal });
          setUser(res.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchUser();
    
    return () => controller.abort();
  }, [user]);


  const login = async (userData) => {
    setUser(userData);
  };

   const logout = async () => {
    localStorage.removeItem("photoprofil");
    await axiosClient.post("/api/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

