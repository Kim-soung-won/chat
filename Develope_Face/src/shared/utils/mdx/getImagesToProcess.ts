import { Markdown } from '@/shared/constants'

/**
 * MarkDown의 이미지 태그에서 Base64 데이터를 추출하는 함수
 */
export const getImagesToProcess = (
  originalMarkdownContent: string,
): Array<Markdown.ImageFileMetaData> => {
  // 이미지 태그 정규 표현식
  const imageRegex =
    /!\[(.*?)\]\((data:image\/(?:png|jpeg|jpg|gif|webp);base64,([A-Za-z0-9+/=]+))\)/g

  // 전체 MD에서 이미지 태그들을 추출해 보관할 배열
  const imagesToProcess: Array<{
    altText: string
    dataUrl: string //
    base64Data: string // 순수 Base64 데이터
    mimeType: string // 예: image/png
    originalMarkdownTag: string // 원본 마크다운 태그 (예: ![alt](data:...))
  }> = []

  let match

  while ((match = imageRegex.exec(originalMarkdownContent)) !== null) {
    // match[0]: 전체 매치 (예: ![alt](data:image/png;base64,...))
    // match[1]: alt 텍스트 (예: alt)
    // match[2]: 전체 데이터 URL (예: data:image/png;base64,...)
    // match[3]: 순수 Base64 데이터 (예: ...)
    imagesToProcess.push({
      altText: match[1] || '', // alt 텍스트가 없을 수도 있음
      dataUrl: match[2],
      base64Data: match[3],
      mimeType: match[2].substring(
        match[2].indexOf(':') + 1,
        match[2].indexOf(';'),
      ),
      originalMarkdownTag: match[0],
    })
  }

  return imagesToProcess
}
