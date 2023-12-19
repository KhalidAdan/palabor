import { z } from "zod";

export const Identifier = z.number();

export const SQLBaseSchema = z.object({
  id: Identifier,
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type SQLBaseType = z.infer<typeof SQLBaseSchema>;
