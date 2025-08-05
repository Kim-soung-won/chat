import { FrontBaseContracts } from '@/entity/base'
import z from 'zod'

export const RoomSchema = FrontBaseContracts.FrontBaseEntitySchema.extend({
  id: z.string(),
  name: z.string(),
})

export const RoomsSchema = z.array(RoomSchema)
