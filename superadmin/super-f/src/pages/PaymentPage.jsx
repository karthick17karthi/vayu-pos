import { useSelector } from 'react-redux';
import Table from '../components/Table';
import StatCard from '../components/StatCard';
import Card from '../components/ui/Card';

export default function PaymentPage() {
  const { transactions, totalTransactions, successRate } = useSelector(
    (state) => state.payment
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payment Management</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-200">Track and manage all transactions.</p>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          label="Total Transactions"
          value={totalTransactions}
          change="+2.5%"
          color="bg-blue-500"
        />
        <StatCard
          label="Success Rate"
          value={successRate}
          change="+1.2%"
          color="bg-green-500"
        />
        <StatCard
          label="Failed Transactions"
          value="2"
          change="-0.5%"
          color="bg-red-500"
        />
      </div>

      {/* Transactions Table */}
      <Table
        title="Recent Transactions"
        columns={['Transaction ID', 'Payment Method', 'Amount', 'Date', 'Status']}
        data={transactions.map((tx) => ({
          'Transaction ID': tx.txId,
          'Payment Method': tx.method,
          Amount: tx.amount,
          Date: tx.date,
          Status: tx.status,
        }))}
      />

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="💳 Credit Card">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">45%</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">Most used method</p>
        </Card>
        <Card title="🏧 Debit Card">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">25%</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">Second preference</p>
        </Card>
        <Card title="💰 Cash">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">20%</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">Cash payments</p>
        </Card>
        <Card title="📱 Digital Wallet">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">10%</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-300">Digital payments</p>
        </Card>
      </div>
    </div>
  );
}
