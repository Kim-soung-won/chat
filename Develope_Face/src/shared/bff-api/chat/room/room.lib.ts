import { RoomResponseParam } from '@/shared/api/room/room.type'
import { RoomDto } from './room.types'

export const transformDtoToEntity = (dto: RoomDto): RoomResponseParam => {
  return {
    ...dto,
  }
}

export const transformDtosToEntities = (
  dto: RoomDto[],
): RoomResponseParam[] => {
  return dto.map((item) => transformDtoToEntity(item))
}
