import { z } from 'zod';
import { bt_Apikey } from '@prisma/client';
import { APIKey } from './validation';

export type TAPIKey = z.infer<typeof APIKey>;

export type TFetchAPIKeysResponse = {
  apiKeys?: bt_Apikey[];
  error?: Error;
};

export interface TFetchAPIKeyPayload {
  userId: number;
}

export interface TCreateAPIKeyPayload extends TAPIKey {
  userId: number;
}

export type TCreateAPIKeyResponse = {
  newApiKey?: bt_Apikey;
  error?: Error;
};
