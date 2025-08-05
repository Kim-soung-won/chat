import z from 'zod'

export const BasePaginationDtoScheam = z.object({
  length: z.number(),
  size: z.number(),
  page: z.number(),
  totalCount: z.number(),
  isLast: z.boolean(),
})

export const BaseDtoSchema = z.object({
  createdAt: z.string(),
})

export const BaseResponseDtoSchema = <T>(dataSchema?: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    data: dataSchema ? dataSchema.nullable() : z.null(),
    message: z.string().nullable(),
  })
