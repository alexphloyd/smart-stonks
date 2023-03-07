import { AppStartListening } from '@/store/types/types';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { createApiKey } from '../thunks/createApiKey';
import { fetchApiKeys } from '../thunks/fetchApiKeys';

const apiKeyListener = createListenerMiddleware();
const startListening = apiKeyListener.startListening as AppStartListening;
export const apiKeyMiddleware = apiKeyListener.middleware;

startListening({
  actionCreator: createApiKey.fulfilled,
  effect: async (action, listenerApi) => {
    const userId = listenerApi.getState().auth.user!.id;
    listenerApi.dispatch(fetchApiKeys(userId));
  },
});
