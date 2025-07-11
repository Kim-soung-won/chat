import {
  GetPostPaginatedsResponseBody,
  GetPostsRequestQuery,
} from '@/app/api/posts'

/**
 * 게시글 목록 조회
 * @param params
 * @returns
 */
export async function getPosts(
  params: GetPostsRequestQuery,
): Promise<GetPostPaginatedsResponseBody> {
  // 타입 이름 GetPostsResponseBody로 통일 가정
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const queryParams: Record<string, string> = {}

    queryParams.pageNo = String(params.pageNo)
    queryParams.size = String(params.size)
    queryParams.order = params.order
    if (params.orderBy) {
      queryParams.orderBy = params.orderBy
    }
    if (params.keyword && params.keyword.trim() !== '') {
      queryParams.keyword = params.keyword
    }

    const queryString = new URLSearchParams(queryParams).toString()
    const fetchUrl = `${baseUrl}/api/posts${queryString ? `?${queryString}` : ''}`

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error(`API Error ${response.status}:`, errorData)
      throw new Error(
        `게시글 목록을 가져오는데 실패했습니다. (상태: ${response.status})`,
      )
    }
    return await response.json()
  } catch (error) {
    console.error('getPosts 함수 내 에러:', error)
    if (error instanceof Error) throw error
    throw new Error('게시글 목록을 가져오는 중 알 수 없는 에러가 발생했습니다.')
  }
}
