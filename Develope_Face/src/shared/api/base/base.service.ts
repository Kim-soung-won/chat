import { AxiosContracts } from '@/shared/libs/axios/AxiosContracts'
import { baseBffClient } from '@/shared/libs/axios/config'
import { AxiosResponse } from 'axios'
import { BaseResponseDtoSchema } from './base.contracts'

/**
 * 요청 파라미터 인터페이스
 * @template TRequest 요청 데이터 타입
 */
interface RequestParams<TRequest> {
  /** API 엔드포인트 URL */
  url?: string
  /** 요청 데이터 */
  data?: TRequest
  /** 요청 데이터 검증 스키마 */
  requestSchema: any
  /** 응답 데이터 검증 스키마 */
  responseSchema: any
}

export abstract class BaseService {
  /** 기본 URL */
  protected static baseUrl: string

  /**
   * 기본 URL 설정
   * @param url 설정할 기본 URL
   */
  static setBaseUrl(url: string) {
    this.baseUrl = url
  }

  /**
   * 전체 URL 생성
   * - 기본 URL과 엔드포인트 URL을 결합
   * @param url 엔드포인트 URL
   * @returns 전체 URL
   */
  static buildFullUrl(url?: string): string {
    if (url && url.length) {
      return `${this.baseUrl}${url}`
    }
    return this.baseUrl
  }

  static create<TRequest>(
    params: RequestParams<TRequest>,
  ): Promise<AxiosResponse> {
    const fullUrl = this.buildFullUrl(params.url)
    const validatedData = AxiosContracts.requestContract(
      params.requestSchema,
      params.data,
    )
    return baseBffClient
      .post(fullUrl, validatedData)
      .then(
        AxiosContracts.responseContract(
          BaseResponseDtoSchema(params.responseSchema),
        ),
      )
  }
}
