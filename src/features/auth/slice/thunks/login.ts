import router from 'next/router';
import { TUser, TUserAuthenticatePayload } from '@/features/auth/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { TAuthError } from '../../types/errors';

export const login = createAsyncThunk<TUser, TUserAuthenticatePayload>(
  'auth/login',
  async (userCredentials, { fulfillWithValue, rejectWithValue }) => {
    await signIn('credentials', {
      redirect: false,
      email: userCredentials.email,
      password: userCredentials.password,
    });

    const session = await getSession();
    if (session) {
      router.push('/');
      return fulfillWithValue({
        email: session.user!.email!,
        //@ts-ignore
        id: session.user!.id,
        role: 'USER',
      });
    }

    return rejectWithValue({ message: 'Invalid credentials.', type: 'login' } as TAuthError);
  }
);
