import { z } from "zod";
import { SQLBaseSchema } from "./sql-base";

const DocumentSchema = SQLBaseSchema.extend({
  title: z.string(),
  slug: z.string(),
  canonical_url: z.string().optional(),
  content: z.string(),
  plain_text_content: z.string(),
  custom_excerpt: z.string().optional(),
  publication_date: z.date().optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  work_id: z.number(),
  user_id: z.number(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export type DocumentType = z.infer<typeof DocumentSchema>;

export const CreateDocumentSchema = DocumentSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  canonical_url: true,
  custom_excerpt: true,
  publication_date: true,
  meta_title: true,
  meta_description: true,
});

export type CreateDocumentType = z.infer<typeof CreateDocumentSchema>;

export const SetDocumentMetadataSchema = DocumentSchema.pick({
  id: true,
  slug: true,
  meta_title: true,
  custom_excerpt: true,
  meta_description: true,
  canonical_url: true,
  publication_date: true,
});

export type SetDocumentMetadataType = z.infer<typeof SetDocumentMetadataSchema>;

export const SetTitleSchema = DocumentSchema.pick({
  id: true,
  title: true,
});

export type SetTitleType = z.infer<typeof SetTitleSchema>;

export const SetContentSchema = DocumentSchema.pick({
  id: true,
  content: true,
  plain_text_content: true,
});

export type SetContentType = z.infer<typeof SetContentSchema>;
