import { z } from 'zod';

export const ApiKey = z.object({
  name: z.string().min(2, 'at least 2 characters'),
  key: z.string().min(2, 'at least 2 characters'),
  secret: z.string().min(2, 'at least 2 characters'),
});

export const FetchApiKeys = z.object({
  userId: z.string(),
});
