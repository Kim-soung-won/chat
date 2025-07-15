import z from 'zod'
import {
  UserByRoomRequestParamSchema,
  UserResponseParamSchema,
} from './user.contracts'

export type UserByRoomRequestParam = z.infer<
  typeof UserByRoomRequestParamSchema
>
export type UserResponseParam = z.infer<typeof UserResponseParamSchema>
