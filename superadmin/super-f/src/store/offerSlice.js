import { createSlice } from '@reduxjs/toolkit';

const offerSlice = createSlice({
  name: 'offer',
  initialState: {
    offers: [
      { id: 1, title: '20% Off Electronics', discount: '20%', validity: '2025-02-15', status: 'Active', uses: 234 },
      { id: 2, title: 'Buy 2 Get 1 Free', discount: 'BOGO', validity: '2025-01-31', status: 'Active', uses: 567 },
      { id: 3, title: 'Free Shipping', discount: 'Free', validity: '2025-02-28', status: 'Scheduled', uses: 0 },
      { id: 4, title: 'Clearance Sale 50%', discount: '50%', validity: '2025-01-25', status: 'Expired', uses: 1203 },
    ],
  },
  reducers: {
    createOffer: (state, action) => {
      state.offers.push(action.payload);
    },
    updateOffer: (state, action) => {
      const offer = state.offers.find(o => o.id === action.payload.id);
      if (offer) Object.assign(offer, action.payload);
    },
    deleteOffer: (state, action) => {
      state.offers = state.offers.filter(o => o.id !== action.payload);
    },
  },
});

export const { createOffer, updateOffer, deleteOffer } = offerSlice.actions;
export default offerSlice;
