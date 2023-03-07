import { bt_Apikey } from '@prisma/client';
import { z } from 'zod';
import { ApiKey } from './validation';

export type TApiKey = z.infer<typeof ApiKey>;

export type TFetchApiKeysResponse = {
  apiKeys?: bt_Apikey[];
  error?: Error;
};

export interface TFetchApiKeyPayload {
  userId: number;
}

export interface TCreateApiKeyPayload extends TApiKey {
  userId: number;
}

export type TCreateApiKeyResponse = {
  newApiKey?: bt_Apikey;
  error?: Error;
};
