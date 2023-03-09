import { TUser } from '@/features/auth/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSession } from 'next-auth/react';

export const getUserFromSession = createAsyncThunk<TUser>(
  'auth/getUserFromSession',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    const session = await getSession();
    if (session) {
      return fulfillWithValue({
        email: session.user!.email!,
        //@ts-ignore
        id: session.user!.id,
        role: 'USER',
      });
    }

    return rejectWithValue(null);
  }
);
