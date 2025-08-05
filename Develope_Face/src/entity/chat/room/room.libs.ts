import {
  RoomResponseParam,
  RoomResponseParams,
} from '@/shared/api/room/room.type'
import { Room, Rooms } from './room.types'

export const transformDtoToEntity = (dto: RoomResponseParam): Room => {
  return {
    ...dto,
  }
}

export const transformsDtoToEntities = (dto: RoomResponseParams): Rooms => {
  return dto.map((item) => transformDtoToEntity(item))
}
