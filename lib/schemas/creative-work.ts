import z from "zod";
import { SQLBaseSchema } from "./sql-base";

export const CreativeWorkSchema = SQLBaseSchema.extend({
  title: z.string(),
  slug: z.string(),
  description: z.string().min(1).max(255).optional(),
  is_paid: z.boolean().default(false),
  user_id: z.number(),
});

export type CreativeWorkType = z.infer<typeof CreativeWorkSchema>;

export const CreateCreativeWorkSchema = CreativeWorkSchema.omit({
  id: true,
  is_paid: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateCreativeWorkType = z.infer<typeof CreateCreativeWorkSchema>;
