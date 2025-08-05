import z from 'zod'
import { bffContracts } from '../../base'
import { UserDtoSchema } from '../user'

export const RoomDtoSchema = bffContracts.BffDtoSchema.extend({
  id: z.string().uuid(),
  name: z.string(),
})

/**
 * 채팅방을 구성하는 User 목록 조회
 */
export const RoomInUserListResponse = z.object({
  list: z.array(UserDtoSchema),
})
