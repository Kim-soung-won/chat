import { baseClient } from '@/shared/libs/axios/config'
import { BffService } from '../../base/bff.service'
import { AxiosContracts } from '@/shared/libs/axios/AxiosContracts'
import z from 'zod'
import { RoomDtoSchema } from '../room/room.contracts'
import { BffResponseDtoSchema } from '../../base/bff.contracts'

export class BffUserService extends BffService {
  static {
    this.setBaseUrl('/user')
  }

  /**
   * Room을 구성하는 User 목록 조회
   */
  static getRoomList({ userId }: { userId: string }) {
    const fullUrl = this.buildFullUrl(`/${userId}/rooms`)
    return baseClient
      .get(fullUrl)
      .then(
        AxiosContracts.responseContract(
          BffResponseDtoSchema(z.array(RoomDtoSchema)),
        ),
      )
  }
}
