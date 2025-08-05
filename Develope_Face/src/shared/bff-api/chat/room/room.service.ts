import { baseClient } from '@/shared/libs/axios/config'
import { BffService } from '../../base/bff.service'
import { AxiosContracts } from '@/shared/libs/axios/AxiosContracts'
import z from 'zod'
import { UserDtoSchema } from '../user'
import { BffResponseDtoSchema } from '../../base/bff.contracts'

export class BffRoomService extends BffService {
  static {
    this.setBaseUrl('/room')
  }

  /**
   * Room을 구성하는 User 목록 조회
   */
  static getUserList({ roomId }: { roomId: string }) {
    const fullUrl = this.buildFullUrl(`/${roomId}/users`)
    return baseClient
      .get(fullUrl)
      .then(
        AxiosContracts.responseContract(
          BffResponseDtoSchema(z.array(UserDtoSchema)),
        ),
      )
  }
}
