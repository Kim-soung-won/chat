import { RoomService } from '@/shared/api/room/room.service'
import { RoomTransform } from '.'

export class RoomQueires {
  static readonly keys = {
    root: ['room'] as const,
  }

  /**
   * 로그인한 user가 속한 채팅방 목록 조회
   */
  static roomsQuery(userId: string) {
    return {
      queryKey: [this.keys.root, userId],
      queryFn: async () => {
        const response = await RoomService.roomsQuery({ userId })
        return RoomTransform.transformsDtoToEntities(response.data.data)
      },
    }
  }
}
