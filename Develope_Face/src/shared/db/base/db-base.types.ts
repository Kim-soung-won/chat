import { z } from 'zod'
import {
  BasePaginationQueryParamSchema,
  BaseParametersSchema,
} from './db-base.contracts'

export type BasePaginationQueryParam = z.infer<
  typeof BasePaginationQueryParamSchema
>
export type BaseParameters = z.infer<typeof BaseParametersSchema>
