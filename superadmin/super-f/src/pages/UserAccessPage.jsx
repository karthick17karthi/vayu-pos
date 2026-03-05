import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addUser } from '../store/store';
import Table from '../components/Table';
import { Plus } from 'lucide-react';
import Card from '../components/ui/Card';
import { useTheme } from '../context/ThemeContext.jsx';
import { getThemeConfig } from '../theme/designSystem.js';

export default function UserAccessPage() {
  const { users } = useSelector((state) => state.userAccess);
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const themeConfig = getThemeConfig(theme);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Cashier',
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      dispatch(
        addUser({
          id: users.length + 1,
          ...formData,
          status: 'Active',
          joinDate: new Date().toISOString().split('T')[0],
        })
      );
      setFormData({ name: '', email: '', role: 'Cashier' });
      setShowForm(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">User Access Management</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-200">Manage user roles and permissions.</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 ${themeConfig.classes['primary-button']}`}
        >
          <Plus size={20} />
          {showForm ? 'Close' : 'Add User'}
        </button>
      </div>

      {/* Add User Form */}
      {showForm && (
        <Card title="Add New User">
          <form onSubmit={handleAddUser} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={themeConfig.classes['input-field']}
            />
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={themeConfig.classes['input-field']}
            />
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className={themeConfig.classes['input-field']}
            >
              <option>Admin</option>
              <option>Manager</option>
              <option>Cashier</option>
              <option>Support</option>
            </select>
            <button
              type="submit"
              className={`md:col-span-3 ${themeConfig.classes['primary-button']}`}
            >
              Add User
            </button>
          </form>
        </Card>
      )}

      {/* Users Table */}
      <Table
        title="All Users"
        columns={['Name', 'Email', 'Role', 'Status', 'Join Date']}
        data={users.map((user) => ({
          Name: user.name,
          Email: user.email,
          Role: user.role,
          Status: user.status,
          'Join Date': user.joinDate,
        }))}
      />

      {/* Role Permissions Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Admin">
          <p className="text-sm text-slate-600 dark:text-slate-200">Full access to all features</p>
        </Card>
        <Card title="Manager">
          <p className="text-sm text-slate-600 dark:text-slate-200">Manage store and users</p>
        </Card>
        <Card title="Cashier">
          <p className="text-sm text-slate-600 dark:text-slate-200">Process transactions</p>
        </Card>
        <Card title="Support">
          <p className="text-sm text-slate-600 dark:text-slate-200">Customer support access</p>
        </Card>
      </div>
    </div>
  );
}
