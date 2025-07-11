import { z, ZodTypeAny, SafeParseReturnType } from 'zod'

/**
 * DB의 쿼리 파라미터를 Zod 스키마를 사용하여 검증하고 파싱하는 함수
 * @param searchParams
 * @param schema
 * @returns
 */
export const parseApiQueryParameters = <S extends ZodTypeAny>(
  searchParams: URLSearchParams,
  schema: S,
): SafeParseReturnType<z.input<S>, z.output<S>> => {
  const queryAsObject: Record<string, string> = {}

  new Set(Array.from(searchParams.keys())).forEach((key) => {
    const value = searchParams.get(key)
    if (value !== null) {
      queryAsObject[key] = value
    }
  })

  return schema.safeParse(queryAsObject)
}
