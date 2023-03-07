import { fetchApiKeys } from './thunks/fetchApiKeys';
import { createApiKey } from './thunks/createApiKey';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bt_Apikey } from '@prisma/client';

interface ApiKeysSlice {
  apiKeys: bt_Apikey[] | undefined;
  isCreateApiKeyFormVisible: boolean;
  apiKeysStatus: 'idle' | 'pending' | 'success' | 'error';
  error: Error | null;
}

const initialState: ApiKeysSlice = {
  apiKeys: [],
  isCreateApiKeyFormVisible: false,
  apiKeysStatus: 'idle',
  error: null,
};

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    openCreateApiKeyForm(state) {
      state.isCreateApiKeyFormVisible = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchApiKeys.pending, (state) => {
      state.apiKeysStatus = 'pending';
    });
    builder.addCase(
      fetchApiKeys.fulfilled,
      (state, action: PayloadAction<bt_Apikey[] | undefined>) => {
        state.apiKeysStatus = 'success';
        state.apiKeys = action.payload;
      }
    );
    builder.addCase(fetchApiKeys.rejected, (state) => {
      state.apiKeysStatus = 'error';
    });

    builder.addCase(createApiKey.pending, (state) => {
      state.apiKeysStatus = 'pending';
    });
    builder.addCase(createApiKey.fulfilled, (state) => {
      state.apiKeysStatus = 'success';
      state.error = null;
      state.isCreateApiKeyFormVisible = false;
    });
    builder.addCase(createApiKey.rejected, (state, action) => {
      state.error = action.payload as Error;
      state.apiKeysStatus = 'error';
    });
  },
});

export const { openCreateApiKeyForm } = apiKeysSlice.actions;

export default apiKeysSlice.reducer;
