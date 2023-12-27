import z from "zod";
import { SQLBase } from "./sql-base";

export const CreativeWork = SQLBase.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string().min(1).max(255).optional(),
  is_paid: z.boolean().default(false),
  user_id: z.number(),
});

export const CreateCreativeWork = CreativeWork.omit({
  id: true,
  is_paid: true,
  createdAt: true,
  updatedAt: true,
});

export type CreativeWork = z.infer<typeof CreativeWork>;
export type CreateCreativeWork = z.infer<typeof CreateCreativeWork>;
