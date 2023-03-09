import { createSlice } from '@reduxjs/toolkit';
import { bt_Bot } from '@prisma/client';

export interface UserBotsSlice {
  bots: bt_Bot[];
  status: 'idle' | 'pending' | 'success' | 'error';
}

const initialState: UserBotsSlice = {
  bots: [],
  status: 'idle',
};

export const userBotsSlice = createSlice({
  name: 'userBots',
  initialState,
  reducers: {},
});

export default userBotsSlice.reducer;
