import z from 'zod'
import { RoomDtoSchema } from './room.contracts'

export type RoomDto = z.infer<typeof RoomDtoSchema>
