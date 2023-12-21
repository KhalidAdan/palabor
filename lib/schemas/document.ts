import { z } from "zod";
import { SQLBase } from "./sql-base";

const Document = SQLBase.extend({
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

export const CreateDocument = Document.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  canonical_url: true,
  custom_excerpt: true,
  publication_date: true,
  meta_title: true,
  meta_description: true,
});

export const SetDocumentMetadata = Document.pick({
  id: true,
  slug: true,
  meta_title: true,
  custom_excerpt: true,
  meta_description: true,
  canonical_url: true,
  publication_date: true,
});

export const SetTitle = Document.pick({
  id: true,
  title: true,
});

export const SetContent = Document.pick({
  id: true,
  content: true,
  plain_text_content: true,
});

export type Document = z.infer<typeof Document>;
export type CreateDocument = z.infer<typeof CreateDocument>;
export type SetDocumentMetadata = z.infer<typeof SetDocumentMetadata>;
export type SetTitle = z.infer<typeof SetTitle>;
export type SetContent = z.infer<typeof SetContent>;
