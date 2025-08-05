import { AxiosResponse } from 'axios'
import { BaseService } from '../base'
import { baseBffClient } from '@/shared/libs/axios/config'
import { RoomResponseParamsSchema } from './room.contracts'
import { AxiosContracts } from '@/shared/libs/axios/AxiosContracts'
import { BaseResponseDtoSchema } from '../base/base.contracts'

export class RoomService extends BaseService {
  static {
    this.baseUrl = '/api/chat/room'
  }

  static roomsQuery(config: {
    userId: string
    signal?: AbortSignal
  }): Promise<AxiosResponse> {
    return baseBffClient
      .get(this.baseUrl, {
        params: {
          userId: config.userId,
        },
        signal: config.signal,
      })
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(RoomResponseParamsSchema),
        ),
      )
  }
}
