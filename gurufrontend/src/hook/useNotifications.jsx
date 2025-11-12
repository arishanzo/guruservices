import axiosClient from "../lib/axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const UseNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

const fetchNotifications = async () => {
    if (!user?.iduser) return;
    
    try {
      const res = await axiosClient.get("/api/notifications")
      setNotifications(res.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setNotifications([]);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axiosClient.post(`/api/notifications/${id}/read`,{});
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axiosClient.post("/api/notifications/read-all",{});
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.iduser) {
      fetchNotifications();
    }
  }, [user?.iduser]);


  const unreadCount = Array.isArray(notifications)
  ? notifications.filter(n => !n.read_at)
  : [];
   
  return { unreadCount, markAllAsRead, fetchNotifications, markAsRead, notifications }
}

export default UseNotifications;

