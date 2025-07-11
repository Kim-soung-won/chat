import { z } from 'zod'
import {
  CreatePostEntitySchema,
  PostEntityPaginatedSchema,
  PostEntitySchema,
  PostEntitySearchParamsSchema,
} from './post.contracts'

export type PostEntity = z.infer<typeof PostEntitySchema>
export type PostEntityPaginated = z.infer<typeof PostEntityPaginatedSchema>
export type PostEntitySearchParams = z.infer<
  typeof PostEntitySearchParamsSchema
>
export type CreatePostEntity = z.infer<typeof CreatePostEntitySchema>
