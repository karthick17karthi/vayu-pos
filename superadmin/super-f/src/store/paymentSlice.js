import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    transactions: [
      { id: 1, txId: 'TXN-2025-001', method: 'Credit Card', amount: '$250.00', date: '2025-01-23 10:30 AM', status: 'Success' },
      { id: 2, txId: 'TXN-2025-002', method: 'Debit Card', amount: '$180.50', date: '2025-01-23 09:15 AM', status: 'Success' },
      { id: 3, txId: 'TXN-2025-003', method: 'Cash', amount: '$320.75', date: '2025-01-22 04:45 PM', status: 'Success' },
      { id: 4, txId: 'TXN-2025-004', method: 'Digital Wallet', amount: '$95.25', date: '2025-01-22 02:20 PM', status: 'Failed' },
    ],
    totalTransactions: '$846.50',
    successRate: '93.5%',
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransactionStatus: (state, action) => {
      const tx = state.transactions.find(t => t.id === action.payload.id);
      if (tx) tx.status = action.payload.status;
    },
  },
});

export const { addTransaction, updateTransactionStatus } = paymentSlice.actions;
export default paymentSlice;
