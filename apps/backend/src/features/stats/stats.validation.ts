import { z } from 'zod';

export const getLatestStatsQuerySchema = z.object({
  limit: z.coerce.number().int().positive().max(50).default(5),
});

export const statsValidation = {
  getLatest: {
    query: getLatestStatsQuerySchema,
  },
};
