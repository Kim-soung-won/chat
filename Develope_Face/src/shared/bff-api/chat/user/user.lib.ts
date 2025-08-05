import { UserResponseParam } from '@/shared/api/user/user.type'
import { UserDto } from './user.types'

export const transformDtoToEntity = (dto: UserDto): UserResponseParam => {
  return {
    ...dto,
  }
}

export const transformDtosToEntities = (
  dto: UserDto[],
): UserResponseParam[] => {
  return dto.map((item) => transformDtoToEntity(item))
}
