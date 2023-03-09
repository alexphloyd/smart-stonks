import { bt_Apikey } from '@prisma/client';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TCreateAPIKeyPayload, TCreateAPIKeyResponse } from '../../types/types';

export const createAPIKey = createAsyncThunk<bt_Apikey, TCreateAPIKeyPayload>(
  'apiKeys/createApiKey',
  async ({ userId, name, key, secret }, { fulfillWithValue, rejectWithValue }) => {
    const createAPIKey = await fetch('/api/apiKeys/createAPIKey', {
      method: 'POST',
      headers: { 'content-type': 'application/json;charset=UTF-8' },
      body: JSON.stringify({
        userId,
        name,
        key,
        secret,
      } as TCreateAPIKeyPayload),
    });

    const { newApiKey, error }: TCreateAPIKeyResponse = await createAPIKey.json();
    if (!newApiKey) return rejectWithValue(error);

    return fulfillWithValue(newApiKey);
  }
);
