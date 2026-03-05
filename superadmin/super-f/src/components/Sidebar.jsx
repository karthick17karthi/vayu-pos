import { NavLink } from 'react-router-dom';
import { X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/client-onboarding', label: 'Client Onboarding' },
    { path: '/user-access', label: 'User & Access' },
    { path: '/payment', label: 'Payment Management' },
    { path: '/offers', label: 'Offer Management' },
    { path: '/reports', label: 'Reports Management' },
    { path: '/leads', label: 'Leads Management' },
    { path: '/landing-cms', label: 'Landing Page CMS' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative md:translate-x-0 left-0 top-0 w-64 h-full transition-transform duration-300 z-50 flex flex-col ${themeConfig.classes.sidebar} transition-theme duration-theme ease-theme`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-white/10">
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">POS</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-theme duration-theme ease-theme md:hidden"
          >
            <X size={20} className="text-slate-600 dark:text-slate-200" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-6 flex-1 px-0 space-y-0">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 768 && setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm font-medium border-l-4 transition-colors duration-200 ${
                  isActive
                    ? theme === 'dark'
                      ? 'bg-teal-500 text-white border-teal-500'
                      : 'bg-sky-500 text-white border-sky-500'
                    : 'border-transparent text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-cyan-300'
                }`
              }
            >
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer - Mobile Only */}
        {sidebarOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-white/10 p-4 space-y-3 transition-theme duration-theme ease-theme">
            <div className="bg-white/80 dark:bg-white/5 rounded-lg p-3 border border-slate-200 dark:border-white/10">
              <p className="text-xs font-medium text-slate-600 dark:text-slate-300">Logged in as</p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white mt-1">Super Admin</p>
            </div>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm font-medium transition-colors">
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
