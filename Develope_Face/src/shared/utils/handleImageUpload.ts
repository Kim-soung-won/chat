interface InsertImageMarkdown {
  event: React.ChangeEvent<HTMLInputElement>
  insertImage: (base64Url: string, altText: string) => void
}

export const handleImageUpload = async ({
  event,
  insertImage,
}: InsertImageMarkdown) => {
  const file = event.target.files?.[0]
  if (!file) {
    event.target.value = ''
    return
  }

  // (선택 사항) 파일 유효성 검사 (예: 파일 용량)
  // if (file.size > 5 * 1024 * 1024) { /* ... */ }

  const reader = new FileReader()

  reader.onloadend = () => {
    const originalBase64Url = reader.result as string

    const img = new Image() // 새로운 Image 객체 생성

    img.onload = () => {
      // Image 객체가 성공적으로 로드되면 이 콜백 실행
      const MAX_WIDTH = 800 // ⭐ 원하는 최대 너비 설정 (예: 800px)
      const MAX_HEIGHT = 600 // ⭐ 원한다면 최대 높이도 설정 가능

      let newWidth = img.width
      let newHeight = img.height

      // 너비 기준으로 비율 조정 (이미지가 MAX_WIDTH보다 클 경우에만)
      if (newWidth > MAX_WIDTH) {
        const ratio = MAX_WIDTH / newWidth
        newWidth = MAX_WIDTH
        newHeight = newHeight * ratio
      }

      // 높이 기준으로 비율 조정 (이미지가 MAX_HEIGHT보다 클 경우에만)
      if (newHeight > MAX_HEIGHT) {
        const ratio = MAX_HEIGHT / newHeight
        newHeight = MAX_HEIGHT
        newWidth = newWidth * ratio
      }
      // 만약 너비와 높이 제한 둘 다 중요하다면, Math.min(MAX_WIDTH / img.width, MAX_HEIGHT / img.height) 같은 비율을 사용

      // Canvas 생성
      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight

      const ctx = canvas.getContext('2d')
      if (!ctx) {
        console.error(
          '2D 컨텍스트를 가져올 수 없습니다. 원본 이미지를 사용합니다.',
        )
        insertImage(originalBase64Url, file.name || 'image')
        return
      }

      // Canvas에 리사이징된 이미지 그리기
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      // Canvas에서 리사이징된 이미지의 데이터 URL 추출
      // file.type (원본 파일의 MIME 타입)을 사용하고, JPEG/WebP의 경우 품질(0.0 ~ 1.0) 지정 가능
      const quality =
        file.type === 'image/jpeg' || file.type === 'image/webp' ? 0.9 : 1.0
      const resizedBase64Url = canvas.toDataURL(file.type, quality)

      // 리사이징된 이미지로 마크다운 삽입
      insertImage(resizedBase64Url, file.name || 'image')
    }

    img.onerror = () => {
      // Image 객체 로드 실패 시 (예: 데이터 URL이 잘못되었거나 지원하지 않는 형식)
      console.error(
        '이미지 객체를 로드하는 중 오류가 발생했습니다. 원본 미리보기를 사용합니다.',
      )
      // 이 경우 원본 Base64 URL로 미리보기를 보여줄 수 있음
      insertImage(originalBase64Url, file.name || 'image')
    }

    // Image 객체의 src에 원본 데이터 URL을 할당하여 이미지 로딩 시작
    img.src = originalBase64Url
  }

  reader.onerror = () => {
    console.error('이미지 파일을 읽는 중 오류가 발생했습니다.')
    alert('이미지 파일을 미리보는 중 오류가 발생했습니다.')
  }

  reader.readAsDataURL(file)
  event.target.value = '' // 파일 입력 초기화
}
