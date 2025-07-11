import { z } from 'zod'
import { BasePaginationQueryParamSchema, BaseParametersSchema } from '../base'

export const PostEntitySchema = z.object({
  post_id: z.bigint(),
  title: z.string(),
  markdown_content: z.string(),
  created_at: z.date(),
})

export const PostEntityPaginatedSchema = z.object({
  list: z.array(
    z.object({
      post_id: z.bigint(),
      title: z.string(),
      created_at: z.date(),
    }),
  ),
  pagination: BasePaginationQueryParamSchema,
})

export const PostEntitySearchParamsSchema = BaseParametersSchema.extend({})

export const CreatePostEntitySchema = z.object({
  title: z.string(),
  markdown_content: z.string(),
})
