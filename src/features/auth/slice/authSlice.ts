import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuthError } from '../types/errors';
import { TUser } from '../types/types';
import { createNewUser } from './thunks/createNewUser';
import { getUserFromSession } from './thunks/getUserFromSession';
import { login } from './thunks/login';
import { logout } from './thunks/logout';

export interface TAuthSlice {
  user: TUser | null;
  error: TAuthError | null;
  authStatus: 'idle' | 'pending' | 'success' | 'error';
}

const initialState: TAuthSlice = {
  user: null,
  error: null,
  authStatus: 'pending',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewUser.rejected, (state, action) => {
      state.authStatus = 'error';
      state.error = action.payload as TAuthError;
    });

    builder.addCase(login.fulfilled, (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.error = null;
      state.authStatus = 'success';
    });
    builder.addCase(login.rejected, (state, action) => {
      state.authStatus = 'error';
      state.error = action.payload as TAuthError;
    });

    builder.addCase(logout.fulfilled, (state) => {
      (state.error = null), (state.authStatus = 'success'), (state.user = null);
    });

    builder.addCase(getUserFromSession.fulfilled, (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
      state.error = null;
      state.authStatus = 'success';
    });
    builder.addCase(getUserFromSession.rejected, (state) => {
      state.error = null;
      state.authStatus = 'idle';
    });
  },
});

export const { resetAuthError } = authSlice.actions;

export default authSlice.reducer;
