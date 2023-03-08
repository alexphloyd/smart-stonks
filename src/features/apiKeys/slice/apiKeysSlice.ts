import { fetchAPIKeys } from './thunks/fetchAPIKeys';
import { createAPIKey } from './thunks/createAPIKey';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bt_Apikey } from '@prisma/client';

interface APIKeysSlice {
  apiKeys: bt_Apikey[] | undefined;
  isCreateAPIKeyFormVisible: boolean;
  isFirstLoading: boolean;
  apiKeysStatus: 'idle' | 'pending' | 'success' | 'error';
  error: Error | null;
}

const initialState: APIKeysSlice = {
  apiKeys: [],
  isCreateAPIKeyFormVisible: false,
  isFirstLoading: true,
  apiKeysStatus: 'idle',
  error: null,
};

export const apiKeysSlice = createSlice({
  name: 'apiKeys',
  initialState,
  reducers: {
    openCreateApiKeyForm(state) {
      state.isCreateAPIKeyFormVisible = true;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAPIKeys.pending, (state) => {
      state.apiKeysStatus = 'pending';
    });
    builder.addCase(
      fetchAPIKeys.fulfilled,
      (state, action: PayloadAction<bt_Apikey[] | undefined>) => {
        state.apiKeysStatus = 'success';
        state.isFirstLoading = false;
        state.apiKeys = action.payload;
      }
    );
    builder.addCase(fetchAPIKeys.rejected, (state) => {
      state.apiKeysStatus = 'error';
    });

    builder.addCase(createAPIKey.pending, (state) => {
      state.apiKeysStatus = 'pending';
    });
    builder.addCase(createAPIKey.fulfilled, (state) => {
      state.apiKeysStatus = 'success';
      state.error = null;
      state.isCreateAPIKeyFormVisible = false;
    });
    builder.addCase(createAPIKey.rejected, (state, action) => {
      state.error = action.payload as Error;
      state.apiKeysStatus = 'error';
    });
  },
});

export const { openCreateApiKeyForm } = apiKeysSlice.actions;

export default apiKeysSlice.reducer;
