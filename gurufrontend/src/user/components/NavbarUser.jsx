import { useEffect, useState } from "react";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axiosClient from "../../lib/axios";

const NavbarUser = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);


  const fetchNotifications = async () => {
    if (!user?.idguru) return;
    
    try {
      const res = await axiosClient.get("/api/notifications");
      const notifData = Array.isArray(res.data) ? res.data : [];
      setNotifications(notifData);
      setUnreadCount(notifData.filter(n => !n.read_at).length);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setNotifications([]);
      setUnreadCount(0);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axiosClient.post(`/api/notifications/${id}/read`, {});
      fetchNotifications();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };


   const markAsDelete = async (iduser) => {
    try {
      await axiosClient.post(`/api/notifications/${iduser}/clear`, {});
      fetchNotifications();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  



useEffect(() => {
  fetchNotifications();
}, []);
  


  
  const navItemClass = ({ isActive }) =>
  `flex flex-col items-center justify-center gap-1 transition-all
   ${isActive ? "text-green-600" : "text-gray-400 hover:text-green-500"}`;
 

  return (
    <>
     <nav className="fixed flex-1 top-0 right-0 z-40 py-4 md:pt-2  bg-white/80 backdrop-blur-md md:left-68 sm:left-64 left-0">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 ">
          <div className="flex justify-between items-center h-16">
            
            {/* Left side - Profile */}
            <div className="flex items-center">
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
            {/* <img
              className="h-12 w-12 rounded-full object-cover"
              src={`${import.meta.env.VITE_API_URL}/api/photos/${encodeURIComponent(local)}`
                  
              }
              alt="Profile"
            /> */}

                  <div className=" md:block text-left">
                    <p className="text-sm font-medium text-gray-900">Hello, {user?.name || "Guest"}</p>
                    <p className="text-xs text-gray-500">Gruru Private</p>
                  </div>
                  <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfile && (
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      <Link
                        to="/profil"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Profil Saya
                      </Link>
                       
                      <a
                      href="https://wa.me/6281234567890"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Bantuan
                    </a>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={async () => {
                           try {
                            await logout();
                          } catch (error) {
                            console.error("Logout gagal", error);
                          }
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-green-700 hover:bg-green-50"
                        >
                          <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Keluar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

         
            {/* Right side - Notifications */}
            <div className="flex items-center space-x-4">
              
              {/* Quick Actions */}
             

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-full"
                >
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 block h-4 w-4 text-white rounded-full bg-green-400 text-xs ring-2 ring-white">
                      {unreadCount || ''}
                    </span>
                  )}
                 
                   
                </button>

 
                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-3">Notifikasi</h3>
                      <div className="space-y-3">

               {notifications.length === 0 ? (
                          <p className="p-3 text-center text-sm text-gray-500">
                            Tidak ada notifikasi
                          </p>
                        ) : (
                        notifications.map((notif) => (
                          <div 
                          key={notif.id} 

                          onClick={() => {
                            markAsRead(notif.id);
                            setShowNotifications(false);
                          }}
                          className={`p-3 rounded-lg hover:bg-green-100 cursor-pointer ${
                            notif.read_at ? "text-gray-400 bg-green-50" : "bg-gray-50 text-gray-400 font-medium"
                          }`}>
                            <p className="text-sm text-gray-900">{notif.data?.message ?? notif.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.created_at ?? notif.time}</p>
                          </div>
                        ))
                         )}

                   <div className="p-4 border-t border-gray-200 space-y-2">
                          <button onClick={() =>  markAsDelete(user?.iduser)} className="mt-4 w-full inline-flex justify-start bg-white text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm text-start">
                        Clear All
                      </button>
                    </div>
                      </div>

                     
                    
                    </div>
                  </div>
               
                        )}
              </div>
            </div>
          </div>
        </div>
      </nav>
<div className="md:hidden fixed bottom-3 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-lg rounded-2xl bg-white/90 backdrop-blur shadow-xl border border-gray-100">
        <div className="grid grid-cols-5 h-16">
                      
                      {/* Kelas */}
            <NavLink to="/kelas" className={navItemClass}>
               <svg className="w-5 h-5 mb-1  group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
              <span className="text-[11px] font-medium">Kelas</span>
            </NavLink>

            {/* Jadwal */}
            <NavLink to="/jadwal" className={navItemClass}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 7V3m8 4V3M4 11h16M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-[11px] font-medium">Jadwal</span>
            </NavLink>

            {/* Home / Kelas Utama (Center Action) */}
            <NavLink
              to="/dashboard"
              className="relative -top-5 flex items-center justify-center"
            >
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-green-500 to-green-600 shadow-xl flex items-center justify-center text-white">
               <svg className="w-7 h-7 mb-1 text-white group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
              </div>
            </NavLink>

            {/* Saldo */}
            <NavLink to="/saldo" className={navItemClass}>
              <div className="relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 9V7a5 5 0 00-10 0v2M5 9h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V9z" />
                </svg>
              </div>
              <span className="text-[11px] font-medium">Saldo</span>
            </NavLink>

            {/* Profil */}
            <NavLink to="/profil" className={navItemClass}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-[11px] font-medium">Profil</span>
            </NavLink>
        </div>
      </div>
  
      </div>
    </>
  );
};

export default NavbarUser;