"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Mail, 
  Globe, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  Shield,
  Building2
} from "lucide-react";
import Cookies from 'js-cookie';
import logo from "../../../../public/hostinglogo.jpg";

const NAVIGATION_ITEMS = [
  { 
    href: "/dashboard", 
    icon: LayoutDashboard, 
    label: "Dashboard",
    roles: ['superadmin', 'admin'] 
  },
  { 
    href: "/dashboard/usermanagement", 
    icon: Users, 
    label: "Student Management",
    roles: ['superadmin', 'admin'] 
  },
  { 
    href: "/dashboard/managecompanies", 
    icon: Building2, 
    label: "Manage Companies",
    roles: ['superadmin'] 
  },
 { 
    href: "/dashboard/admin-management", 
    icon: Shield, 
    label: "Admin Management",
    roles: ['superadmin'] 
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");
    setUserRole(role);
    setUserEmail(email);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") setIsMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const navItems = NAVIGATION_ITEMS.filter(item => 
    item.roles.includes(userRole)
  );

  const isActive = (path) => pathname === path;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      localStorage.removeItem("token");

      Cookies.remove('token');
      
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      router.push('/');
      
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userName");
      localStorage.removeItem("token");
      Cookies.remove('token');
      router.push('/');
    } finally {
      setIsLoggingOut(false);
    }
  };

 

  if (isLoading) {
    return (
      <div className="w-[270px] h-screen bg-white border-r border-slate-200 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Mobile Top Header Bar */}
      <div className="md:hidden w-full h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 fixed top-0 left-0 z-40 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-md">
            <Mail className="text-white" size={17} />
          </div>
          <div>
            <span className="text-base font-bold tracking-tight text-slate-800">MailHost</span>
            <p className="text-[10px] text-slate-500 leading-none">Control Panel</p>
          </div>
        </div>
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-200 transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      
      {/* Main Sidebar Component */}
      <aside
        className={`fixed md:sticky top-0 inset-y-0 left-0 z-50 w-[270px] bg-white border-r border-slate-200 text-slate-700 flex flex-col h-screen transition-transform duration-300 ease-in-out shrink-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 shrink-0 bg-white">
          <div className="flex items-center gap-3.5 w-full">
            {logo ? (
              <div className="relative flex-1 h-full flex items-center">
                <Image 
                  src={logo} 
                  alt="MailHost Logo" 
                  className="object-contain w-full h-full max-h-14" 
                  priority 
                />
              </div>
            ) : (
              <>
                <div className="w-11 h-11 rounded-2xl bg-teal-600 flex items-center justify-center shadow-sm">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight text-slate-800">
                    MailHost
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
                    Control Panel
                  </p>
                </div>
              </>
            )}
            
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden ml-auto p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto min-h-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-3 hidden md:block">
            Main Menu
          </p>
          
          {navItems.length > 0 ? (
            navItems.map(({ href, icon: Icon, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group relative flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-200 ${
                    active
                      ? "bg-teal-50 text-teal-700 border border-teal-200 shadow-xs"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800 border border-transparent hover:border-slate-200"
                  }`}
                >
                  {active && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-teal-600" />
                  )}
                  
                  <Icon
                    size={18}
                    className={`transition-all duration-200 ${
                      active 
                        ? "text-teal-600" 
                        : "text-slate-400 group-hover:text-teal-600 group-hover:scale-110"
                    }`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-medium transition-colors ${
                      active ? "text-slate-800" : "group-hover:text-slate-800"
                    }`}>
                      {label}
                    </span>
                  </div>

                  {active && (
                    <ChevronRight size={14} className="text-teal-600" />
                  )}
                </Link>
              );
            })
          ) : (
            <div className="text-center text-sm text-slate-500 py-8">
              No menu items available
            </div>
          )}
        </nav>

        {/* Footer Panel with Logout */}
        <div className="p-4 border-t border-slate-200 bg-white shrink-0">
          <button 
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all duration-200 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingOut ? (
              <>
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              <>
                <LogOut size={18} className="text-slate-400 group-hover:text-red-600 transition-colors" />
                <span>Logout</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}