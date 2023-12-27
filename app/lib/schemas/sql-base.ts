import { z } from "zod";

export const Identifier = z.number();

export const SQLBase = z.object({
  id: Identifier,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type SQLBase = z.infer<typeof SQLBase>;
