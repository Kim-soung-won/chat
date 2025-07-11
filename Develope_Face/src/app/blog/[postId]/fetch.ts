import { PostApiEntityDetail } from '@/app/api/posts'

export async function getPost(
  postId: string,
): Promise<PostApiEntityDetail | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const response = await fetch(`${baseUrl}/api/posts/${postId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Or configure revalidation as needed
    })

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Post with ID ${postId} not found.`)
        return null
      }
      const errorData = await response.text()
      console.error(
        `Failed to fetch post ${postId}:`,
        response.status,
        errorData,
      )
      throw new Error(`Failed to fetch post. Status: ${response.status}`)
    }

    const data: PostApiEntityDetail = await response.json()
    return data
  } catch (error) {
    console.error(`Error in getPost for ID ${postId}:`, error)
    return null
  }
}
