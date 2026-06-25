// components/Navbar.js
"use client";

import { Bell, Search, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar({ onMenuToggle, isMenuOpen }) {
  const [searchQuery, setSearchQuery] = useState("");

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
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-teal-400/60 focus:border-transparent transition-all"
          />
        </div>

        {/* Mobile search toggle */}
        <button className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg transition-colors">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-teal-500 to-teal-700 flex items-center justify-center shadow-sm">
            <User className="text-white" size={18} />
          </div>
          <div className="hidden md:block leading-tight">
            <p className="text-sm font-medium text-gray-700">User</p>
            <p className="text-xs text-gray-400">user@gmail.com</p>
          </div>
        </div>
      </div>
    </header>
  );
}