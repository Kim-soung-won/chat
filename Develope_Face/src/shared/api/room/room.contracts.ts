import z from 'zod'

export const RoomByUserRequestParamSchema = z.object({
  userId: z.string(),
})

export const RoomResponseParamSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  createdAt: z.string(),
})

export const RoomResponseParamsSchema = z.array(RoomResponseParamSchema)
