import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function StatCard({ label, value, change, color }) {
  const isPositive = change.startsWith('+');
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  return (
    <div className={`${themeConfig.classes.card} p-4 md:p-6 hover:shadow-lg transition-theme duration-theme ease-theme`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-600 dark:text-slate-300 text-xs md:text-sm font-medium">
          {label}
        </h3>
        <div className={`${color} w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center text-white`}>
          <span className="text-base md:text-lg">📊</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>

      {/* Change */}
      <div className="flex items-center gap-2">
        {isPositive ? (
          <TrendingUp size={14} className="text-green-500 md:w-4 md:h-4" />
        ) : (
          <TrendingDown size={14} className="text-red-500 md:w-4 md:h-4" />
        )}
        <span className={`text-xs md:text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="text-slate-500 dark:text-slate-400 text-xs">vs last month</span>
      </div>
    </div>
  );
}
