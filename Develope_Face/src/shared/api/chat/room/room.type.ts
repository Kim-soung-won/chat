import z from 'zod'
import {
  RoomByUserRequestParamSchema,
  RoomResponseParamSchema,
} from './room.contracts'

export type RoomByUserRequestParam = z.infer<
  typeof RoomByUserRequestParamSchema
>
export type RoomResponseParam = z.infer<typeof RoomResponseParamSchema>
