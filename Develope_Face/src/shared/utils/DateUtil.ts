/**
 * 날짜를 'yyyy년 M월 d일 HH:mm' 형식의 문자열로 변환합니다.
 * 라이브러리 없이 순수 JavaScript Date 객체를 사용합니다.
 */
export function formatDateTime(dateInput: string | Date | number): string {
  const date =
    typeof dateInput === 'string' || typeof dateInput === 'number'
      ? new Date(dateInput)
      : dateInput

  // Date 객체가 유효한지 확인
  if (isNaN(date.getTime())) {
    console.warn('포맷할 수 없는 유효하지 않은 날짜 값입니다:', dateInput)
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  const paddedHours = hours.toString().padStart(2, '0')
  const paddedMinutes = minutes.toString().padStart(2, '0')

  return `${year}년 ${month}월 ${day}일 ${paddedHours}:${paddedMinutes}`
}
