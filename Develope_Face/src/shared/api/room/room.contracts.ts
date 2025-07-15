import z from 'zod'

export const RoomByUserRequestParamSchema = z.object({
  userId: z.string(),
})

export const RoomResponseParamSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  created_at: z.date(),
})
