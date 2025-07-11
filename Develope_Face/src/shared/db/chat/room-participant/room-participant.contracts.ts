import { z } from 'zod'
import { BaseParametersSchema } from '../../base'
import { RoomEntitySchema } from '../room/room.contracts'
import { UserEntitySchema } from '../user/user.contracts'

export const RoomParticipantEntitySchema = z.object({
  room_id: z.string().uuid(),
  user_id: z.string().uuid(),
  room: RoomEntitySchema.optional(), // room 관계 추가
  user: UserEntitySchema.optional(), // user 관계 추가
})

export const CreateRoomParticipantEntitySchema = z.object({
  room_id: z.string().uuid(),
  user_id: z.string().uuid(),
})

export const SelectRoomListByUserIdSchema = BaseParametersSchema.extend({
  userId: z.string().uuid(),
})

export const SelectUserListInRoomSchema = z.object({
  roomId: z.string().uuid(),
})
export const SelectUserListInRoomResponseSchema = z.object({
  users: z.array(UserEntitySchema),
  count: z.number(),
})
