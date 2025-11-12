import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getMenuItems } from "../../lib/MenuItems/getMenuItem";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path, activePaths = []) => {
    if (activePaths.length > 0) {
      return activePaths.some(activePath => location.pathname.startsWith(activePath));
    }
    return location.pathname === path;
  };
  
  const menuItems = getMenuItems();

 
  
  return (
    <div className={` hidden sm:flex flex-col z-50 bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'md:w-64'
    } min-h-screen`}>
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        {!isCollapsed && (
          <a href="/dashboard" className="flex items-center space-x-2">
            <img className="w-20 h-20" src="../img/logo/logogopintar.png" alt="Go-Pintar" />
            <span className="text-lg font-bold text-red-600">Go-Pintar</span>
          </a>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
         
        </button>
      </div>

    

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              isActive(item.path, item.activePaths)
                ? 'bg-red-100 text-red-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`${isActive(item.path, item.activePaths) ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="font-medium">{item.name}</span>
                {item.notification && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {item.notification}
                  </span>
                )}
              </>
            )}
            {isCollapsed && item.notification && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.notification}
              </span>
            )}
          </a>
        ))}

        
      <div className="p-4 border-t border-gray-200 space-y-2">
         {/* Profile Link */}
        <a
          href="/profil"
          className={`flex items-start space-x-3  py-2.5 rounded-lg transition-all duration-200 group ${
            isActive('/profil')
              ? 'bg-red-100 text-red-700 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <div className={`${isActive('/profil') ? 'text-red-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          {!isCollapsed && <span className="font-medium">Profil</span>}
        </a>
      </div>
      </nav>

        
       
      </div>
 
  );
};

export default Sidebar;