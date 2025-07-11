import z from 'zod'

export const UserByRoomRequestParamSchema = z.object({
  roomId: z.string(),
})

export const UserResponseParamSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  created_at: z.date(),
})
