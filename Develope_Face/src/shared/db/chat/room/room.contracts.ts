import { z } from 'zod'
import {
  BasePaginationQueryParamSchema,
  BaseParametersSchema,
} from '../../base'

export const RoomEntitySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.date(),
})

export const CreateRoomEntitySchema = z.object({
  name: z.string(),
})

export const RoomEntityPaginatedSchema = z.object({
  list: z.array(RoomEntitySchema),
  pagination: BasePaginationQueryParamSchema,
})

export const RoomSearchParamsSchema = BaseParametersSchema.extend({
  userId: z.string().uuid().optional(),
})
