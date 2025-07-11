import { z } from 'zod'
import { BasePaginationQueryParamSchema, BaseParametersSchema } from '../../base'

export const MessageEntitySchema = z.object({
  id: z.string().uuid(),
  room_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.date(),
})

export const CreateMessageEntitySchema = z.object({
  room_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
})

export const MessageEntityPaginatedSchema = z.object({
  list: z.array(MessageEntitySchema),
  pagination: BasePaginationQueryParamSchema,
})

export const MessageSearchParamsSchema = BaseParametersSchema.extend({})
