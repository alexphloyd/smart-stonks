import { TCreateNewUserResponse, TUserAuthenticatePayload } from '@/features/auth/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import router from 'next/router';
import { TAuthError } from '../../types/errors';

export const createNewUser = createAsyncThunk<null, TUserAuthenticatePayload>(
  'auth/createNewUser',
  async (userData, { fulfillWithValue, rejectWithValue }) => {
    const createNewUserResponse = await fetch('/api/auth/createNewUser', {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      } as TUserAuthenticatePayload),
    });

    const { newUser, error }: TCreateNewUserResponse = await createNewUserResponse.json();
    if (createNewUserResponse.ok && newUser) {
      router.push('/auth/signupSucceced');
      return fulfillWithValue(null);
    }

    return rejectWithValue({ ...error, type: 'signup' } as TAuthError);
  }
);
