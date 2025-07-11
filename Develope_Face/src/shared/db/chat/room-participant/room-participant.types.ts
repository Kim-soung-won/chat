import { z } from 'zod'
import {
  RoomParticipantEntitySchema,
  CreateRoomParticipantEntitySchema,
  SelectRoomListByUserIdSchema,
  SelectUserListInRoomSchema,
  SelectUserListInRoomResponseSchema,
} from './room-participant.contracts'

export type RoomParticipantEntity = z.infer<typeof RoomParticipantEntitySchema>
export type CreateRoomParticipantEntity = z.infer<
  typeof CreateRoomParticipantEntitySchema
>
export type SelectRoomListByUserId = z.infer<
  typeof SelectRoomListByUserIdSchema
>
export type SelectUserListInRoom = z.infer<typeof SelectUserListInRoomSchema>
export type SelectUserListInRoomResponse = z.infer<
  typeof SelectUserListInRoomResponseSchema
>
