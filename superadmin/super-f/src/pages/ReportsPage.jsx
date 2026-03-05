import { useSelector } from 'react-redux';
import Table from '../components/Table';
import StatCard from '../components/StatCard';
import Card from '../components/ui/Card';

export default function ReportsPage() {
  const { salesReport, inventoryStatus } = useSelector((state) => state.report);

  // Calculate total sales
  const totalSales = salesReport.reduce((sum, item) => {
    const value = parseFloat(item.sales.replace('$', '').replace(',', ''));
    return sum + value;
  }, 0);

  // Calculate total orders
  const totalOrders = salesReport.reduce((sum, item) => sum + item.orders, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Reports</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-200">Comprehensive analytics and insights.</p>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Sales (7 Days)"
          value={`$${totalSales.toLocaleString('en-US', { maximumFractionDigits: 2 })}`}
          change="+15.3%"
          color="bg-blue-500"
        />
        <StatCard
          label="Total Orders (7 Days)"
          value={totalOrders}
          change="+10.8%"
          color="bg-green-500"
        />
        <StatCard
          label="Avg Daily Orders"
          value={Math.round(totalOrders / 4)}
          change="+5.2%"
          color="bg-purple-500"
        />
      </div>

      {/* Sales Report Table */}
      <Table
        title="Sales Report (Last 7 Days)"
        columns={['Date', 'Sales', 'Orders', 'Customers']}
        data={salesReport.map((item) => ({
          Date: item.date,
          Sales: item.sales,
          Orders: item.orders.toString(),
          Customers: item.customers.toString(),
        }))}
      />

      {/* Inventory Status Table */}
      <Table
        title="Inventory Status"
        columns={['Category', 'In Stock', 'Low Stock', 'Out of Stock']}
        data={inventoryStatus.map((item) => ({
          Category: item.category,
          'In Stock': item.inStock.toString(),
          'Low Stock': item.lowStock.toString(),
          'Out of Stock': item.outOfStock.toString(),
        }))}
      />

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Top Categories">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-200">Electronics</span>
              <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-200">Clothing</span>
              <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '72%' }}></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-700 dark:text-slate-200">Books</span>
              <div className="h-2 w-24 rounded-full bg-slate-200 dark:bg-white/10">
                <div className="bg-cyan-400 h-2 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Customer Insights">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">New Customers</span>
              <span className="font-semibold text-slate-900 dark:text-white">+45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">Returning Customers</span>
              <span className="font-semibold text-slate-900 dark:text-white">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">Avg Order Value</span>
              <span className="font-semibold text-slate-900 dark:text-white">$125.30</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-700 dark:text-slate-200">Customer Satisfaction</span>
              <span className="font-semibold text-slate-900 dark:text-white">4.8/5</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
