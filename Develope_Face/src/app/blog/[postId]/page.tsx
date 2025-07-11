import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '../../../../mdx-component'
import { PostApiEntity, PostApiEntityDetail } from '@/app/api/posts' // Import the PostApiEntity type
import Link from 'next/link'
import { ScrollAnimation } from '@/shared/ui'
import { getPost } from './fetch'

// 비동기 함수 외부에서 컴포넌트 정의
function MDXContent({ source }: { source: string }) {
  const components = useMDXComponents({})
  return <MDXRemote source={source} components={components} />
}

export default async function BlogPostPage({
  params,
}: {
  params: { postId: string }
}) {
  const { postId } = await params
  const post = await getPost(postId)

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다.</h1>
        <p className="mb-4">
          요청하신 ID의 게시글이 존재하지 않거나, 불러오는 데 실패했습니다.
        </p>
        <Link href="/blog" className="text-blue-600 hover:underline">
          블로그 목록으로 돌아가기
        </Link>
      </div>
    )
  }
  return (
    <>
      <ScrollAnimation />
      <div className="max-w-4xl mx-auto p-4">
        <article className="">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-sm text-gray-500 mb-6">
            게시일: {new Date(post.createdAt).toLocaleDateString()}
          </p>
          <MDXContent source={post.markdownContent} />
        </article>
      </div>
    </>
  )
}
