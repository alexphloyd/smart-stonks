import { signOut } from 'next-auth/react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import router from 'next/router';

export const logout = createAsyncThunk('auth/logout', async (_, { fulfillWithValue }) => {
  await signOut({ redirect: false }).then(async () => {
    if (router.asPath !== '/') {
      await router.push('/');
    }
  });

  return fulfillWithValue(null);
});
