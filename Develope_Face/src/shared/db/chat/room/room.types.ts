import { z } from 'zod'
import {
  RoomEntitySchema,
  CreateRoomEntitySchema,
  RoomEntityPaginatedSchema,
  RoomSearchParamsSchema,
} from './room.contracts'

export type RoomEntity = z.infer<typeof RoomEntitySchema>
export type CreateRoomEntity = z.infer<typeof CreateRoomEntitySchema>
export type RoomEntityPaginated = z.infer<typeof RoomEntityPaginatedSchema>
export type RoomSearchParams = z.infer<typeof RoomSearchParamsSchema>
