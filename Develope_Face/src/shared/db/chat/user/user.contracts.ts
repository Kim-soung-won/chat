import { z } from 'zod'
import { BasePaginationQueryParamSchema, BaseParametersSchema } from '../../base'

export const UserEntitySchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  created_at: z.date(),
})

export const CreateUserEntitySchema = z.object({
  username: z.string(),
})

export const UserEntityPaginatedSchema = z.object({
  list: z.array(UserEntitySchema),
  pagination: BasePaginationQueryParamSchema,
})

export const UserSearchParamsSchema = BaseParametersSchema.extend({})
