import { z } from "zod";

export const LogSchema = z.object({
  timeStamp: z.string().pipe(z.coerce.date()),
  context: z
    .object({
      userAction: z.string(),
    })
    .passthrough(),
  message: z.string(),
  level: z.string(),
});
