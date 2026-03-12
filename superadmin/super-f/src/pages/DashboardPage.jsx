import { useSelector } from 'react-redux';
import StatCard from '../components/StatCard';
import Table from '../components/Table';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function DashboardPage() {
  const { stats, recentOrders } = useSelector((state) => state.dashboard);
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-2">Welcome back! Here's your store performance.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            color={stat.color}
            animIndex={index}
          />
        ))}
      </div>

      {/* Recent Orders Table */}
      <div className="grid grid-cols-1 gap-6">
        <Table
          title="Recent Orders"
          columns={['Order No', 'Customer', 'Amount', 'Status', 'Date']}
          data={recentOrders.map((order) => ({
            'Order No': order.orderNo,
            Customer: order.customer,
            Amount: order.amount,
            Status: order.status,
            Date: order.date,
          }))}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`${themeConfig.classes.card} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 animate-fade-up`} style={{ animationDelay: '0.35s' }}>
          <h3 className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-2">Today's Revenue</h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">$3,450</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Last updated 5 minutes ago</p>
        </div>
        <div className={`${themeConfig.classes.card} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 animate-fade-up`} style={{ animationDelay: '0.45s' }}>
          <h3 className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-2">Active Offers</h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">4</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Generating sales</p>
        </div>
        <div className={`${themeConfig.classes.card} p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 animate-fade-up`} style={{ animationDelay: '0.55s' }}>
          <h3 className="text-slate-600 dark:text-slate-300 text-sm font-medium mb-2">Total Users</h3>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">128</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">+12 this week</p>
        </div>
      </div>
    </div>
  );
}
