import { bt_Apikey } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCreateApiKeyPayload, TCreateApiKeyResponse } from '../../types/types';

export const createApiKey = createAsyncThunk<bt_Apikey, TCreateApiKeyPayload>(
  'apiKeys/createApiKey',
  async ({ userId, name, key, secret }, { fulfillWithValue, rejectWithValue }) => {
    const createApiKey = await fetch('/api/apiKeys/createApiKey', {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        userId,
        name,
        key,
        secret,
      } as TCreateApiKeyPayload),
    });

    const { newApiKey, error }: TCreateApiKeyResponse = await createApiKey.json();
    if (!newApiKey) return rejectWithValue(error);

    return fulfillWithValue(newApiKey);
  }
);
