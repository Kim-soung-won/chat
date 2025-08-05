import z from 'zod'

export const UserByRoomRequestParamSchema = z.object({
  roomId: z.string(),
})

export const UserResponseParamSchema = z.object({
  id: z.string().uuid(),
  userName: z.string(),
  createdAt: z.string(),
})
