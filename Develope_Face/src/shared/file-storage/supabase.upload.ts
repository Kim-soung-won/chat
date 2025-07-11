import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const key = process.env.SUPABASE_KEY

if (!url || !key) {
  throw new Error(
    'Supabase URL 또는 Anon Key가 환경 변수에 설정되지 않았습니다. .env.local 파일을 확인해주세요.',
  )
}

export const supabase = createClient(url, key)

export async function uploadFile(file: File, filePath: string) {
  const bucketName = process.env.SUPABASE_BUCKET
  if (!bucketName) {
    throw new Error(
      'Supabase 버킷 이름이 환경 변수에 설정되지 않았습니다. .env.local 파일을 확인해주세요.',
    )
  }

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, file, {
      cacheControl: '600', // 불러온 이미지를, CDN or Browser에에 10분 캐시
      upsert: false, // 같은 경로에 같은 이름의 파일이 있으면 오류를 발생 (true로 설정하면 덮어쓰기)
    })

  if (error) {
    console.error('Supabase 스토리지 업로드 오류:', error)
    throw error
  } else {
    console.log('Supabase 스토리지 업로드 성공:', data.fullPath)
    return data
  }
}

export async function deleteFile(filePath: string) {
  const bucketName = process.env.SUPABASE_BUCKET
  if (!bucketName) {
    throw new Error(
      'Supabase 버킷 이름이 환경 변수에 설정되지 않았습니다. .env.local 파일을 확인해주세요.',
    )
  }
  const { data, error } = await supabase.storage
    .from(bucketName)
    .remove([filePath])

  if (error) {
    console.error('Supabase 파일 삭제 에러:', error)
    throw new Error('Supabase 스토리지에서 파일 삭제를 실패했습니다.')
  }

  console.log('Supabase 스토리지 파일 삭제 성공:', data)

  return data
}
