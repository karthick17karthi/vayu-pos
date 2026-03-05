/*
  store/store.js
  Main Redux store configuration file.
  
  Imports all slices from individual files:
    - dashboardSlice.js
    - userAccessSlice.js
    - paymentSlice.js
    - offerSlice.js
    - reportSlice.js
*/

import { configureStore } from '@reduxjs/toolkit';
import dashboardSlice from './dashboardSlice';
import userAccessSlice from './userAccessSlice';
import paymentSlice from './paymentSlice';
import offerSlice from './offerSlice';
import reportSlice from './reportSlice';

// Configure Store
export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    userAccess: userAccessSlice.reducer,
    payment: paymentSlice.reducer,
    offer: offerSlice.reducer,
    report: reportSlice.reducer,
  },
});

// Re-export all actions for convenience
export {
  updateStats,
  updateRecentOrders,
} from './dashboardSlice';

export {
  addUser,
  removeUser,
  updateUser,
} from './userAccessSlice';

export {
  addTransaction,
  updateTransactionStatus,
} from './paymentSlice';

export {
  createOffer,
  updateOffer,
  deleteOffer,
} from './offerSlice';

export {
  updateSalesReport,
  updateInventoryStatus,
} from './reportSlice';

export default store;
