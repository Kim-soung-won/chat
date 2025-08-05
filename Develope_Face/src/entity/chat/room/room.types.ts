import z from 'zod'
import { RoomSchema, RoomsSchema } from './room.contracts'

export type Room = z.infer<typeof RoomSchema>
export type Rooms = z.infer<typeof RoomsSchema>
