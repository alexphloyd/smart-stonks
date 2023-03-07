import { bt_Apikey } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TFetchApiKeyPayload, TFetchApiKeysResponse } from '../../types/types';

export const fetchApiKeys = createAsyncThunk<bt_Apikey[] | undefined, number>(
  'apiKeys/fetchApiKey',
  async (userId, { fulfillWithValue, rejectWithValue }) => {
    const fetchApiKeys = await fetch('/api/apiKeys/fetchApiKeys', {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        userId,
      } as TFetchApiKeyPayload),
    });

    const { apiKeys, error }: TFetchApiKeysResponse = await fetchApiKeys.json();
    if (error) return rejectWithValue(error);

    return fulfillWithValue(apiKeys);
  }
);
