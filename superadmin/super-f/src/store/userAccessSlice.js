import { createSlice } from '@reduxjs/toolkit';

const userAccessSlice = createSlice({
  name: 'userAccess',
  initialState: {
    users: [
      { id: 1, name: 'Admin User', email: 'admin@superadmin.com', role: 'Admin', status: 'Active', joinDate: '2024-01-10' },
      { id: 2, name: 'Manager', email: 'manager@store.com', role: 'Manager', status: 'Active', joinDate: '2024-02-15' },
      { id: 3, name: 'Cashier', email: 'cashier@store.com', role: 'Cashier', status: 'Inactive', joinDate: '2024-03-20' },
      { id: 4, name: 'Support', email: 'support@store.com', role: 'Support', status: 'Active', joinDate: '2024-04-05' },
    ],
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
    updateUser: (state, action) => {
      const user = state.users.find(u => u.id === action.payload.id);
      if (user) Object.assign(user, action.payload);
    },
  },
});

export const { addUser, removeUser, updateUser } = userAccessSlice.actions;
export default userAccessSlice;
