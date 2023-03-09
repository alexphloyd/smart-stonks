import { z } from 'zod';

export const APIKey = z.object({
  name: z.string().min(2, 'at least 2 characters'),
  key: z.string().min(2, 'at least 2 characters'),
  secret: z.string().min(2, 'at least 2 characters'),
});

export const FetchAPIKeys = z.object({
  userId: z.string(),
});
