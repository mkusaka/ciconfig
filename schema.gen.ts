
import { z } from 'zod';

export const schema = z.object({
  base_revision: z.string(),
  head_revision: z.string(),
  path: z.number(),
  remote: z.string(),
});
