import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: [
      { id: 1, label: 'Total Revenue', value: '$24,560', change: '+12.5%', color: 'bg-blue-500' },
      { id: 2, label: 'Total Orders', value: '1,234', change: '+8.2%', color: 'bg-green-500' },
      { id: 3, label: 'Total Customers', value: '856', change: '+5.1%', color: 'bg-purple-500' },
      { id: 4, label: 'Avg Order Value', value: '$125.30', change: '+3.5%', color: 'bg-orange-500' },
    ],
    recentOrders: [
      { id: 1, orderNo: '#ORD-001', customer: 'John Doe', amount: '$250.00', status: 'Completed', date: '2025-01-23' },
      { id: 2, orderNo: '#ORD-002', customer: 'Jane Smith', amount: '$180.50', status: 'Pending', date: '2025-01-23' },
      { id: 3, orderNo: '#ORD-003', customer: 'Bob Johnson', amount: '$320.75', status: 'Processing', date: '2025-01-22' },
      { id: 4, orderNo: '#ORD-004', customer: 'Alice Brown', amount: '$95.25', status: 'Completed', date: '2025-01-22' },
    ],
  },
  reducers: {
    updateStats: (state, action) => {
      state.stats = action.payload;
    },
    updateRecentOrders: (state, action) => {
      state.recentOrders = action.payload;
    },
  },
});

export const { updateStats, updateRecentOrders } = dashboardSlice.actions;
export default dashboardSlice;
