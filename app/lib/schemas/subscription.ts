import { SQLBase } from "./sql-base";
import { z } from "zod";

export const Subscription = SQLBase.extend({
  email: z.string().email(),
  publicationId: z.coerce.string().optional(),
  isVerified: z.boolean().default(() => false),
  verificationToken: z.string().uuid(),
  verificationExpires: z.date().optional(),
});

export const CreateSubscription = Subscription.pick({
  email: true,
  publicationId: true,
});

export const DeleteSubscription = Subscription.pick({
  id: true,
});

export type Subscription = z.infer<typeof Subscription>;
export type CreateSubscription = z.infer<typeof CreateSubscription>;
export type DeleteSubscription = z.infer<typeof DeleteSubscription>;
