export function getExtensionFromMimeType(mimeType: string): string {
  switch (mimeType.toLowerCase()) {
    case 'image/jpeg':
    case 'image/jpg':
      return 'jpg'
    case 'image/png':
      return 'png'
    case 'image/gif':
      return 'gif'
    case 'image/webp':
      return 'webp'
    default:
      console.warn(
        `Unknown MIME type for extension: ${mimeType}, defaulting to .bin`,
      )
      return 'bin' // 알 수 없는 타입에 대한 기본 확장자
  }
}

export function dataURLtoFile(dataurl: string, filename: string): File {
  const arr = dataurl.split(',')
  const mimeMatch = arr[0].match(/:(.*?);/)
  if (!mimeMatch) throw new Error('Invalid data URL: MIME type not found')
  const mime = mimeMatch[1]
  const bstr = atob(arr[1]) // 브라우저 환경에서는 atob, Node.js에서는 Buffer.from(..., 'base64')
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}
