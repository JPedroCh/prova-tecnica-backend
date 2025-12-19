import { z } from 'zod';

export const deleteNewsSchema = z.object({
  id: z.number(),
});

export type DeleteNewsDTO = z.infer<typeof deleteNewsSchema>;
