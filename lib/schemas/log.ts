import { z } from "zod";

export const Log = z.object({
  timeStamp: z.string().pipe(z.coerce.date()),
  context: z
    .object({
      userAction: z.string(),
    })
    .passthrough(),
  message: z.string(),
  level: z.string(),
});

export type Log = z.infer<typeof Log>;
