import { z } from 'zod'

export const PostImagesEntitySchema = z.object({
  id: z.bigint(),
  post_id: z.bigint(),
  image_url: z.string(),
  storage_file_path: z.string(),
  alt_text: z.string().nullable().optional(),
  file_name: z.string().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  size_kb: z.number().nullable().optional(),
  created_at: z.date(),
})

export const CreatePostImagesEntitySchema = z.object({
  post_id: z.bigint(),
  image_url: z.string(),
  storage_file_path: z.string(),
  alt_text: z.string().nullable().optional(),
  file_name: z.string().nullable().optional(),
  mime_type: z.string().nullable().optional(),
  size_kb: z.number().nullable().optional(),
})
