import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import mobileMenu from './slices/mobileMenuSlice';
import allBots from '../features/bots/slice/userBotsSlice';
import auth from '../features/auth/slice/authSlice';
import apiKeys from '../features/apiKeys/slice/apiKeysSlice';

export const store = configureStore({
  reducer: {
    mobileMenu,
    allBots,
    auth,
    apiKeys,
  },
});
