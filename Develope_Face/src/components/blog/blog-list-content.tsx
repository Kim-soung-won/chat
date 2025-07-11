'use client'

import { Box, List, Typography, useTheme } from '@mui/material'
import { motion, Variants } from 'framer-motion'
import { Fragment, useEffect, useState } from 'react'
import { GetPostPaginatedsResponseBody } from '@/app/api/posts'
import { getPosts } from '@/shared/api/post'
import { BlogContentItem, BlogErrorSuspense, BlogLoadingSuspense } from './item'

export function BlogListContent() {
  const [postsData, setPostsData] =
    useState<GetPostPaginatedsResponseBody | null>(null)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true) // 로딩 상태 추가
  const theme = useTheme()

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true) // 데이터 요청 시작 시 로딩 상태 true
      try {
        const data = await getPosts({
          pageNo: 0 * 20,
          size: 20,
          orderBy: 'created_at', // 이 필드가 PostApiEntitySchema에 존재하고 정렬 가능해야 함
          order: 'desc',
        })
        setPostsData(data)
        setFetchError(null) // 성공 시 에러 상태 초기화
      } catch (error: any) {
        setFetchError(
          error instanceof Error
            ? error.message
            : '알 수 없는 에러가 발생하여 게시글을 불러올 수 없습니다.',
        )
        console.error('BlogContent에서 게시글 로딩 에러:', error)
      } finally {
        setIsLoading(false) // 데이터 요청 완료 시 로딩 상태 false
      }
    }

    loadPosts()
  }, [])

  if (isLoading) {
    return <BlogLoadingSuspense />
  }

  // 에러 상태 UI
  if (fetchError) {
    return <BlogErrorSuspense />
  }

  if (!postsData || !postsData.list || postsData.list.length === 0) {
    return (
      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ textAlign: 'center', py: 4 }}
      >
        아직 게시된 글이 없네요. 첫 글을 작성해보세요! ✨
      </Typography>
    )
  }

  const listItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
      },
    }),
    hover: {
      scale: 1.015,
      boxShadow: theme.shadows[4],
      transition: { duration: 0.2, ease: 'easeInOut' },
    },
    tap: {
      scale: 0.985,
      transition: { duration: 0.1, ease: 'easeOut' },
    },
  }

  return (
    <List
      disablePadding
      component={motion.ul}
      initial="hidden"
      animate="visible"
    >
      {postsData.list.map((post, index) => (
        <Fragment key={post.postId}>
          <motion.div
            custom={index}
            variants={listItemVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <BlogContentItem post={post} />
          </motion.div>
          {index < postsData.list.length - 1 && (
            <Box sx={{ height: theme.spacing(2) }} />
          )}
        </Fragment>
      ))}
    </List>
  )
}
