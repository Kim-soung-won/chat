import { z } from 'zod'
import {
  UserEntitySchema,
  CreateUserEntitySchema,
  UserEntityPaginatedSchema,
  UserSearchParamsSchema,
} from './user.contracts'

export type UserEntity = z.infer<typeof UserEntitySchema>
export type CreateUserEntity = z.infer<typeof CreateUserEntitySchema>
export type UserEntityPaginated = z.infer<typeof UserEntityPaginatedSchema>
export type UserSearchParams = z.infer<typeof UserSearchParamsSchema>
