export class HttpError extends Error {
  public readonly response: Response
  public readonly status: number

  constructor(response: Response) {
    // response.statusText가 없다면 기본 메시지를 사용
    const message =
      `HTTP Error: ${response.status} ${response.statusText || ''}`.trim()
    super(message) // Error 클래스의 생성자 호출
    this.name = 'HttpError'
    this.response = response
    this.status = response.status
  }

  static async callError(error: unknown) {
    if (error instanceof HttpError) {
      // 서버가 보낸 에러 메시지가 있다면 그걸 사용
      const errorData = await error.response.json().catch(() => null)
      const serverMessage = errorData?.message

      console.error(
        `HTTP Error ${error.status} while deleting post:`,
        serverMessage || error.message,
      )
      alert(
        serverMessage ||
          `게시글 삭제 중 서버 오류가 발생했습니다. (코드: ${error.status})`,
      )
    } else if (error instanceof Error) {
      // 네트워크 에러 등 fetch 자체가 실패한 경우
      console.error('Network or other error deleting post:', error)
      alert(error.message || '게시글 삭제 중 오류가 발생했습니다.')
    } else {
      // 정말 예상치 못한 에러
      console.error('An unknown error occurred:', error)
      alert
    }
    ;('알 수 없는 오류가 발생했습니다.')
  }
}
