import z from 'zod'
import {
  RoomByUserRequestParamSchema,
  RoomResponseParamSchema,
  RoomResponseParamsSchema,
} from './room.contracts'

export type RoomByUserRequestParam = z.infer<
  typeof RoomByUserRequestParamSchema
>
export type RoomResponseParam = z.infer<typeof RoomResponseParamSchema>
export type RoomResponseParams = z.infer<typeof RoomResponseParamsSchema>
