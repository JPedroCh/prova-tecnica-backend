import { z } from 'zod';

export const updateNewsSchema = z.object({
  id: z.number().int().positive(),
  titulo: z.string().min(3).max(255),
  descricao: z.string().min(5).max(255),
});

export type UpdateNewsDTO = z.infer<typeof updateNewsSchema>;
