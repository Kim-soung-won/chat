import { z } from 'zod'
import {
  CreatePostImagesEntitySchema,
  PostImagesEntitySchema,
} from './post-image.contracts'

export type PostImagesEntity = z.infer<typeof PostImagesEntitySchema>
export type CreatePostImagesEntity = z.infer<
  typeof CreatePostImagesEntitySchema
>
