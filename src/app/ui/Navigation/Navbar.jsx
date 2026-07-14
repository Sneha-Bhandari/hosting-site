// "use client";

// import { Bell, Search, User, Menu, X } from "lucide-react";
// import { useState, useEffect } from "react";

// // Role badge configuration
// const getRoleBadge = (role) => {
//   const roleConfig = {
//     'superadmin': {
//       label: 'Super Admin',
//       className: 'bg-purple-100 text-purple-700'
//     },
//     'admin': {
//       label: 'Admin',
//       className: 'bg-blue-100 text-blue-700'
//     }
//   };
//   return roleConfig[role] || {
//     label: role || 'User',
//     icon: '👤',
//     className: 'bg-gray-100 text-gray-700'
//   };
// };

// export default function Navbar({ onMenuToggle, isMenuOpen }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [userEmail, setUserEmail] = useState("");
//   const [userRole, setUserRole] = useState("");
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const email = localStorage.getItem("userEmail") || "";
//     const role = localStorage.getItem("userRole") || "";
//     const name = localStorage.getItem("userName") || "";
    
//     setUserEmail(email);
//     setUserRole(role);
//     setUserName(name);
//   }, []);

//   const roleInfo = getRoleBadge(userRole);

//   const displayName = userName || (userEmail ? userEmail.split('@')[0] : 'User');
//   const displayEmail = userEmail || 'user@example.com';

//   return (
//     <header className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 px-4 md:px-6 flex items-center justify-between shadow-sm fixed top-0 right-0 left-0 md:left-64 z-30 transition-all duration-300">
//       {/* Left side - Mobile menu toggle + title */}
//       <div className="flex items-center gap-3">
//         <button
//           onClick={onMenuToggle}
//           className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
//         </button>
        
//         {/* Show role badge on mobile */}
//         {userRole && (
//           <span className={`md:hidden text-xs font-medium px-2.5 py-0.5 rounded-full ${roleInfo.className}`}>
//             {roleInfo.icon} {roleInfo.label}
//           </span>
//         )}
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
//         {/* Search - responsive */}
//         <div className="relative hidden md:block flex-1 max-w-xs">
//           <Search
//             size={18}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//           />
//           <input
//             type="text"
//             placeholder="Search users..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
//           />
//         </div>

//         {/* Mobile search toggle */}
//         <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
//           <Search size={20} />
//         </button>

//         {/* Notifications */}
//         <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
//           <Bell size={20} />
//           <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
//         </button>

//         {/* User profile */}
//         <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors group">
//           <div className="w-9 h-9 rounded-full bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
//             <User className="text-white" size={18} />
//           </div>
//           <div className="hidden md:block leading-tight">
//             <div className="flex items-center gap-2">
//               {userRole && (
//                 <span className={`text-xs font-medium px-2 py-0.5 rounded-full`}>
//                   {roleInfo.icon} {roleInfo.label}
//                 </span>
//               )}
//             </div>
//             <p className="text-xs text-gray-400">{displayEmail}</p>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import { Bell, Search, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import useNotificationStore from "@/lib/notificationStore";

// Role badge configuration
const getRoleBadge = (role) => {
  const roleConfig = {
    'superadmin': {
      label: 'Super Admin',
      className: 'bg-purple-100 text-purple-700'
    },
    'admin': {
      label: 'Admin',
      className: 'bg-blue-100 text-blue-700'
    }
  };
  return roleConfig[role] || {
    label: role || 'User',
    className: 'bg-gray-100 text-gray-700'
  };
};

export default function Navbar({ onMenuToggle, isMenuOpen }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [companyId, setCompanyId] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  
  const { notifications, unreadCount, markAllAsRead, markAsRead, clearAll, getUserNotifications } = useNotificationStore();

  useEffect(() => {
    const email = localStorage.getItem("userEmail") || "";
    const role = localStorage.getItem("userRole") || "";
    const name = localStorage.getItem("userName") || "";
    const id = localStorage.getItem("userId") || "";
    const company = localStorage.getItem("companyId") || null;
    
    setUserEmail(email);
    setUserRole(role);
    setUserName(name);
    setUserId(id);
    setCompanyId(company);
  }, []);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const roleInfo = getRoleBadge(userRole);
  const displayName = userName || (userEmail ? userEmail.split('@')[0] : 'User');
  const displayEmail = userEmail || 'user@example.com';

  // Get user-specific notifications
  const userNotifications = getUserNotifications(userId, userRole, companyId);
  const displayNotifications = userNotifications.slice(0, 10);

  const getNotificationIcon = (type) => {
    const icons = {
      'student_added': '📚',
      'student_updated': '✏️',
      'student_deleted': '🗑️',
      'admin_added': '👤',
      'admin_deleted': '❌',
      'company_added': '🏢',
      'company_updated': '📝'
    };
    return icons[type] || '🔔';
  };

  const getNotificationBg = (type) => {
    const bgColors = {
      'student_added': 'bg-green-50 border-l-4 border-green-500',
      'student_updated': 'bg-blue-50 border-l-4 border-blue-500',
      'student_deleted': 'bg-red-50 border-l-4 border-red-500',
      'admin_added': 'bg-purple-50 border-l-4 border-purple-500',
      'admin_deleted': 'bg-red-50 border-l-4 border-red-500',
      'company_added': 'bg-indigo-50 border-l-4 border-indigo-500',
      'company_updated': 'bg-yellow-50 border-l-4 border-yellow-500'
    };
    return bgColors[type] || 'bg-gray-50 border-l-4 border-gray-400';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return then.toLocaleDateString();
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-sm border-b border-gray-200/80 px-4 md:px-6 flex items-center justify-between shadow-sm fixed top-0 right-0 left-0 md:left-64 z-30 transition-all duration-300">
      {/* Left side - Mobile menu toggle + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* Show role badge on mobile */}
        {userRole && (
          <span className={`md:hidden text-xs font-medium px-2.5 py-0.5 rounded-full ${roleInfo.className}`}>
            {roleInfo.label}
          </span>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
        {/* Search - responsive */}
        <div className="relative hidden md:block flex-1 max-w-xs">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
          />
        </div>

        {/* Mobile search toggle */}
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? '9+' : unreadCount}
              </span>
            )}
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-96 max-h-[500px] bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <div className="flex gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Mark all read
                    </button>
                  )}
                  {displayNotifications.length > 0 && (
                    <button
                      onClick={clearAll}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[400px]">
                {displayNotifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    <Bell className="mx-auto text-gray-300" size={32} />
                    <p className="mt-2">No notifications yet</p>
                  </div>
                ) : (
                  displayNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${!notification.read ? 'bg-gray-50' : ''}`}
                      onClick={() => {
                        markAsRead(notification.id);
                      }}
                    >
                      <div className={`p-2 rounded ${getNotificationBg(notification.type)}`}>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-800' : 'text-gray-600'}`}>
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {formatTime(notification.createdAt)}
                            </p>
                          </div>
                          {!notification.read && (
                            <span className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors group">
          <div className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center shadow-sm">
            <User className="text-white" size={18} />
          </div>
          <div className="hidden md:block leading-tight">
            <div className="flex items-center gap-2">
              {userRole && (
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleInfo.className}`}>
                  {roleInfo.label}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">{displayEmail}</p>
          </div>
        </div>
      </div>
    </header>
  );
}