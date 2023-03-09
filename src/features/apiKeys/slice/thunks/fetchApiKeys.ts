import { bt_Apikey } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TFetchAPIKeyPayload, TFetchAPIKeysResponse } from '../../types/types';

export const fetchAPIKeys = createAsyncThunk<bt_Apikey[] | undefined, number>(
  'apiKeys/fetchApiKey',
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    const fetchAPIKeys = await fetch('/api/apiKeys/fetchAPIKeys', {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        userId,
      } as TFetchAPIKeyPayload),
    });

    const { apiKeys, error }: TFetchAPIKeysResponse = await fetchAPIKeys.json();
    if (error) return rejectWithValue(error);

    return fulfillWithValue(apiKeys);
  }
);
