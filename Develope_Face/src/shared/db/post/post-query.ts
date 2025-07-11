import prisma from '../prisma'
import {
  CreatePostEntity,
  PostEntity,
  PostEntityPaginated,
  PostEntitySearchParams,
} from './post.types'
export class PostQuery {
  static getAll = async (
    params: PostEntitySearchParams,
  ): Promise<PostEntityPaginated> => {
    const {
      keyword,
      pageNo = 0, // 페이지 번호 (0부터 시작)
      size = 10, // 페이지 크기 (한 페이지에 보여줄 게시물 수)
      orderBy = 'created_at', // 정렬 기준 필드
      order = 'desc', // 정렬 순서 ('asc' 또는 'desc')
    } = params

    let prismaOrderBy = { [orderBy]: order } // 기본 정렬 객체

    // select로 가져올 필드 설정
    const selectFields = {
      post_id: true,
      title: true,
      created_at: true,
    }

    const [posts, totalCount] = await prisma.$transaction([
      prisma.post.findMany({
        skip: pageNo,
        take: size,
        orderBy: prismaOrderBy,
        where: keyword ? { title: { contains: keyword } } : undefined,
        select: selectFields, // 필요한 필드만 선택
      }),
      prisma.post.count({
        where: keyword ? { title: { contains: keyword } } : undefined,
      }), // 전체 게시물 수 카운트
    ])

    return {
      list: posts,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / size), // 전체 페이지 수
        currentPage: pageNo, // 현재 페이지 번호 (0부터 시작)
        pageSize: size, // 페이지당 게시물 수
      },
    }
  }

  static getById = async (postId: number): Promise<PostEntity | null> => {
    if (isNaN(postId) || postId <= 0) {
      console.error('잘못된 postId가 제공되었습니다:', postId)
      return null
    }
    try {
      const post = await prisma.post.findUnique({
        where: {
          post_id: postId,
        },
      })
      return post
    } catch (error) {
      console.error(`postId [${postId}] 조회 중 에러 발생:`, error)
      throw new Error(
        `게시글(ID: ${postId})을 조회하는 중 오류가 발생했습니다.`,
      )
    }
  }

  static save = async (post: CreatePostEntity) => {
    return await prisma.post.create({
      data: {
        title: post.title,
        markdown_content: post.markdown_content,
        created_at: new Date(),
      },
    })
  }

  static delete = async (postId: number): Promise<void> => {
    await prisma.post.delete({
      where: {
        post_id: postId,
      },
    })
  }
}
