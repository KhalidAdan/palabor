import { SQLBaseSchema } from "@/lib/schemas/sql-base";
import { z } from "zod";

export const SubscriptionSchema = SQLBaseSchema.extend({
  email: z.string().email(),
  publicationId: z.coerce.string().optional(),
  isVerified: z.boolean().default(() => false),
  verificationToken: z.string().uuid(),
  verificationExpires: z.date().optional(),
});

export const CreateSubscriptionSchema = SubscriptionSchema.pick({
  email: true,
  publicationId: true,
});

export const DeleteSubscriptionSchema = SubscriptionSchema.pick({
  id: true,
});

export type SubscriptionType = z.infer<typeof SubscriptionSchema>;
