import { z } from 'zod'
import { BasePaginationQueryParamSchema } from '@/shared/db/base'

export const PostApiEntitySchema = z.object({
  postId: z.string(),
  title: z.string(),
  createdAt: z.string(),
})

export const PostApiEntityDetailSchema = PostApiEntitySchema.extend({
  markdownContent: z.string(),
})

/**
 * coerce는 입력값을 강제로 변환합니다.
 * 예를 들어, 문자열로 입력된 숫자를 정수로 변환하거나, 문자열로 입력된 boolean 값을 boolean으로 변환합니다.
 */
export const GetPostsRequestQuerySchema = z.object({
  pageNo: z.coerce.number().int().default(0),
  size: z.coerce.number().int().default(10),
  orderBy: z.string().default('created_at'),
  order: z.enum(['asc', 'desc']).default('desc'),
  keyword: z.string().optional(),
})

export const GetPostsPaginatedResponseBodySchema = z.object({
  list: z.array(PostApiEntitySchema),
  pagination: BasePaginationQueryParamSchema,
})

export const CreatePostRequestBodySchema = z.object({
  title: z.string().min(1, { message: 'Title cannot be empty' }),
  markdown_content: z
    .string()
    .min(1, { message: 'Markdown content cannot be empty' }),
})

export const CreatePostResponseBodySchema = PostApiEntitySchema
