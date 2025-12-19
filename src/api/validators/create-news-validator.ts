import { z } from 'zod';

export const createNewsSchema = z.object({
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(5).max(255),
});

export type CreateNewsDTO = z.infer<typeof createNewsSchema>;
