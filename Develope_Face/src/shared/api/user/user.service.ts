import { AxiosResponse } from 'axios'
import { BaseService } from '../base'
import { baseBffClient } from '@/shared/libs/axios/config'

export class UserService extends BaseService {
  static {
    this.baseUrl = '/user'
  }

  // static getUserList(roomId: string): Promise<AxiosResponse> {
  //   return baseBffClient.get(this.baseUrl, {
  //     params: {
  //       roomId,
  //     },
  //   }).then
  // }
}
