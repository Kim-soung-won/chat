import {
  PostEntity,
  PostEntityPaginated,
  PostEntitySearchParams,
} from '@/shared/db/post/post.types'
import {
  GetPostsRequestQuery,
  GetPostPaginatedsResponseBody,
  PostApiEntityDetail,
} from './posts.types'

export const transformRequestParamToQueryPost = (
  request: GetPostsRequestQuery,
): PostEntitySearchParams => {
  return {
    ...request,
  }
}

export const transformPaginatedQueryPostToResponsePostData = (
  response: PostEntityPaginated,
): GetPostPaginatedsResponseBody => {
  return {
    list: response.list.map((post) => ({
      postId: post.post_id.toString(),
      title: post.title,
      createdAt: post.created_at.toISOString(),
    })),
    pagination: {
      totalCount: response.pagination.totalCount,
      totalPages: response.pagination.totalPages,
      currentPage: response.pagination.currentPage,
      pageSize: response.pagination.pageSize,
    },
  }
}

export const transformFindQueryPostToResponsePostData = (
  responseDto: PostEntity,
): PostApiEntityDetail => {
  return {
    postId: responseDto.post_id.toString(),
    title: responseDto.title,
    markdownContent: responseDto.markdown_content,
    createdAt: responseDto.created_at.toISOString(),
  }
}
