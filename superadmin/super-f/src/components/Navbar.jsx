import { Search, ChevronDown, LogOut, LayoutGrid, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const themeConfig = getThemeConfig(theme);

  return (
    <div className="h-16 w-full border-b border-slate-200 bg-white/90 shadow-md transition-theme duration-theme ease-theme dark:border-white/10 dark:bg-[#0e2a33] z-40">
      <div className="flex h-full w-full items-center justify-between px-8">
        {/* Logo and Title Section */}
        <div className="flex items-center gap-4">
          <LayoutGrid size={20} className="text-slate-600 dark:text-slate-200" />
          <div className="flex flex-col">
            <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">POS SuperAdmin</h1>
            <p className="text-xs text-slate-500 dark:text-slate-300">Management System</p>
          </div>
        </div>

        {/* Right Section - Search, Role and Profile */}
        <div className="ml-auto flex items-center justify-end gap-4 md:gap-6">
          {/* Search Bar - Hidden on small screens */}
          <div className="hidden sm:flex w-64">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className={`pl-10 pr-4 py-2 text-sm ${themeConfig.classes['input-field']}`}
              />
            </div>
          </div>

          {/* Role Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-teal-100 text-teal-700 dark:bg-white/10 dark:text-cyan-200 rounded-full text-xs font-semibold transition-theme duration-theme ease-theme">
            Role: Admin
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0e2a33] transition-theme duration-theme ease-theme hover:bg-slate-100 dark:hover:bg-white/10"
          >
            {isDark ? (
              <Sun size={18} className="text-cyan-300" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-theme duration-theme ease-theme"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">SA</span>
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Super Admin</span>
                <span className="text-xs text-slate-500 dark:text-slate-300">Administrator</span>
              </div>
              <ChevronDown size={16} className="hidden sm:inline text-slate-600 dark:text-slate-300" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#0e2a33] rounded-lg shadow-xl border border-slate-200 dark:border-white/10 py-2 z-50 transition-theme duration-theme ease-theme">
                {/* Profile Info */}
                <div className="px-4 py-3 border-b border-slate-200 dark:border-white/10">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Super Admin</p>
                  <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">admin@possuperadmin.com</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-xs text-slate-600 dark:text-slate-300">Active</span>
                  </div>
                </div>

                {/* Logout Button */}
                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-white/10 transition-theme duration-theme ease-theme text-left font-medium">
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
