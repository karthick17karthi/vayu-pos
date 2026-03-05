import { createSlice } from '@reduxjs/toolkit';

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    salesReport: [
      { date: '2025-01-23', sales: '$3,450', orders: 45, customers: 38 },
      { date: '2025-01-22', sales: '$4,200', orders: 52, customers: 45 },
      { date: '2025-01-21', sales: '$2,890', orders: 35, customers: 30 },
      { date: '2025-01-20', sales: '$5,120', orders: 63, customers: 52 },
    ],
    inventoryStatus: [
      { category: 'Electronics', inStock: 250, lowStock: 15, outOfStock: 3 },
      { category: 'Clothing', inStock: 420, lowStock: 28, outOfStock: 5 },
      { category: 'Home & Garden', inStock: 180, lowStock: 12, outOfStock: 2 },
      { category: 'Books', inStock: 350, lowStock: 45, outOfStock: 8 },
    ],
  },
  reducers: {
    updateSalesReport: (state, action) => {
      state.salesReport = action.payload;
    },
    updateInventoryStatus: (state, action) => {
      state.inventoryStatus = action.payload;
    },
  },
});

export const { updateSalesReport, updateInventoryStatus } = reportSlice.actions;
export default reportSlice;
