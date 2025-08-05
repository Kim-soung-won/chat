import z from 'zod'

export const BffPaginationDtoScheam = z.object({
  length: z.number(),
  size: z.number(),
  page: z.number(),
  totalCount: z.number(),
  isLast: z.boolean(),
})

export const BffDtoSchema = z.object({
  createdAt: z.string(),
})

export const BffResponseDtoSchema = <T>(dataSchema?: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema ? dataSchema.nullable() : z.null(),
    message: z.string().nullable(),
  })
