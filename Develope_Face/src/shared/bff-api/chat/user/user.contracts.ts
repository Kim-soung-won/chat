import z from 'zod'
import { bffContracts } from '../../base'

export const UserDtoSchema = bffContracts.BffDtoSchema.extend({
  id: z.string().uuid(),
  userName: z.string(),
})
