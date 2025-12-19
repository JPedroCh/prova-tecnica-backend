import { z } from 'zod';
import {
  isLessThanOrEqualMax,
  isMaxSafeInteger,
  isPositiveInteger,
} from '../../shared/utils/is-positive-integer';

export const listNewsSchema = z.object({
  limit: z
    .string()
    .refine((value) => isPositiveInteger(value, 1), {
      message: 'Number must be greater than or equal to 1',
    })
    .refine((value) => isLessThanOrEqualMax(value, 1000), {
      message: 'Number must be less than or equal to 1000',
    })
    .optional(),
  page: z
    .string()
    .refine((value) => isPositiveInteger(value, 1), {
      message: 'Number must be greater than or equal to 1',
    })
    .refine((value) => isMaxSafeInteger(Number(value)), {
      message: 'Number exceeds the maximum',
    })
    .optional(),
  titulo: z.string().min(1).max(255).optional(),
  descricao: z.string().min(1).max(255).optional(),
});

export type ListNewsDTO = z.infer<typeof listNewsSchema>;
