import { z } from 'zod'

export const BasePaginationQueryParamSchema = z.object({
  totalCount: z.number(), // 전체 게시물 수
  totalPages: z.number(), // 전체 페이지 수
  currentPage: z.number(), // 현재 페이지 번호
  pageSize: z.number(), // 페이지당 게시물 수
})

export const BaseParametersSchema = z.object({
  pageNo: z.number().default(1), // 현재 페이지 번호, 기본값은 1
  size: z.number().default(10), // 페이지당 게시물 수, 기본값은 10
  orderBy: z.string().optional(), // 정렬 기준, 예: 'createdAt', 'updatedAt'
  order: z.enum(['asc', 'desc']).default('desc'), // 정렬 방향, 기본값은 'desc'
  keyword: z.string().optional(), // 검색어, 선택 사항
})
