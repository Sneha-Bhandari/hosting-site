// app/dashboard/layout.js
import Navbar from "@/app/ui/Navigation/Navbar";
import Sidebar from "@/app/ui/Navigation/Sidebar";
import { Toaster } from "react-hot-toast";
export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen w-screen flex overflow-hidden bg-slate-50">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <Navbar />
        
        <main className="flex-1 overflow-y-auto p-4 h-lvh md:p-8 mt-16 md:mt-18">
          {children}
          <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}/>
        </main>
      </div>
    </div>
  );
}