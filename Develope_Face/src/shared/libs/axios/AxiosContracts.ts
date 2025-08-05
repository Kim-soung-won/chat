import type { AxiosResponse } from 'axios'
import { AxiosHeaders } from 'axios'
import type { ZodType } from 'zod'
import { AxiosValidationError } from './AxiosValidationError'

export class AxiosContracts {
  static responseContract<Data>(schema: ZodType<Data>) {
    return (response: AxiosResponse<unknown>): AxiosResponse<Data> => {
      // 요청 취소 확인
      if (
        !response ||
        response?.data === null ||
        response?.data === undefined
      ) {
        const cancellationError = new AxiosValidationError(
          response?.config,
          response?.request,
          response,
          [{ message: 'Request was cancelled', code: 'custom', path: [] }],
        )
        // Add custom property to distinguish cancellation
        ;(cancellationError as any).isCancelled = true
        throw cancellationError
      }

      console.log('response -----> ', response.data)

      const validation = schema.safeParse(response.data)
      console.log('validation----> ', validation)
      if (validation.error || !validation.success) {
        console.log('validation.error----> ', validation.error)
        throw new AxiosValidationError(
          response.config,
          response.request,
          response,
        )
      }

      return { ...response, data: validation.data }
    }
  }

  static requestContract<Data>(schema: ZodType<Data>, data: unknown) {
    const validation = schema.safeParse(data)
    console.log('validation----> ', validation)

    if (validation.error) {
      throw new AxiosValidationError(
        { headers: new AxiosHeaders() },
        undefined,
        undefined,
        validation.error.errors,
      )
    }

    return validation.data
  }
}
