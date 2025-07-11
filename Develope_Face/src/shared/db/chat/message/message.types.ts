import { z } from 'zod'
import {
  MessageEntitySchema,
  CreateMessageEntitySchema,
  MessageEntityPaginatedSchema,
  MessageSearchParamsSchema,
} from './message.contracts'

export type MessageEntity = z.infer<typeof MessageEntitySchema>
export type CreateMessageEntity = z.infer<typeof CreateMessageEntitySchema>
export type MessageEntityPaginated = z.infer<
  typeof MessageEntityPaginatedSchema
>
export type MessageSearchParams = z.infer<typeof MessageSearchParamsSchema>
