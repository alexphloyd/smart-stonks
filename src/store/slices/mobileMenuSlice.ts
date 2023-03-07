import { createSlice } from '@reduxjs/toolkit';

export type MobileMenuState = 'open' | 'closed';

const initialState = 'closed' as MobileMenuState;

export const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      document.body.style.overflow = state === 'closed' ? 'hidden' : 'visible';
      return state === 'closed' ? 'open' : 'closed';
    },
    closeMobileMenu: (state) => {
      return 'closed';
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu } = mobileMenuSlice.actions;

export default mobileMenuSlice.reducer;
