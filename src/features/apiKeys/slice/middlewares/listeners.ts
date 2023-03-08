import { AppStartListening } from '@/store/types/types';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import { createAPIKey } from '../thunks/createAPIKey';
import { fetchAPIKeys } from '../thunks/fetchAPIKeys';

const apiKeyListener = createListenerMiddleware();
const startListening = apiKeyListener.startListening as AppStartListening;
export const apiKeyMiddleware = apiKeyListener.middleware;

startListening({
  actionCreator: createAPIKey.fulfilled,
  effect: async (action, listenerApi) => {
    const userId = listenerApi.getState().auth.user!.id;
    listenerApi.dispatch(fetchAPIKeys(userId));
  },
});
