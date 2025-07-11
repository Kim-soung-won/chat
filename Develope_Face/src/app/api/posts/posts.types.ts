import { z } from 'zod'
import {
  PostApiEntitySchema,
  GetPostsRequestQuerySchema,
  GetPostsPaginatedResponseBodySchema,
  CreatePostRequestBodySchema,
  CreatePostResponseBodySchema,
  PostApiEntityDetailSchema,
} from './posts.contracts'

// Type for a single post entity in API responses
export type PostApiEntity = z.infer<typeof PostApiEntitySchema>
export type PostApiEntityDetail = z.infer<typeof PostApiEntityDetailSchema>

// Types for GET /api/posts
export type GetPostsRequestQuery = z.infer<typeof GetPostsRequestQuerySchema>
export type GetPostPaginatedsResponseBody = z.infer<
  typeof GetPostsPaginatedResponseBodySchema
>

// Types for POST /api/posts
export type CreatePostRequestBody = z.infer<typeof CreatePostRequestBodySchema>
export type CreatePostResponseBody = z.infer<
  typeof CreatePostResponseBodySchema
>
