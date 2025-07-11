import DeleteIcon from '@mui/icons-material/Delete' // DeleteIcon 추가
import { alpha, Box, IconButton, ListItem, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import { PostApiEntity } from "@/app/api/posts"
import { formatDateTime } from "@/shared/utils"
import { HttpError } from '@/shared/utils/Error'

interface BlogContentProps {
  post: PostApiEntity
}

export const BlogContentItem = ({
  post
}: BlogContentProps) => {
  const theme = useTheme();

  const deletePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        // API 엔드포인트 호출
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (response.ok) {
        alert('게시글이 성공적으로 삭제되었습니다.');
        // 페이지 새로고침
        window.location.reload();
      }
    } catch (error) {
      HttpError.callError(error)
    }
  }


  return (
    <ListItem
      sx={{
        display: 'flex',
        alignItems: 'center',
        p: 0, // 내부에서 패딩을 조절할 것이므로 0으로 설정
        borderRadius: 2,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        transition: 'background-color 0.3s, box-shadow 0.3s',
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.04),
          boxShadow: theme.shadows[2],
        },
      }}
    >
      {/* 2. 게시글 내용 영역. 링크를 포함하고, 남는 공간을 모두 차지한다. */}
      <Box
        component={Link}
        href={`/blog/${post.postId}`}
        sx={{
          flexGrow: 1, // 이 부분이 아이콘을 오른쪽으로 밀어낸다.
          textDecoration: 'none',
          color: 'inherit',
          p: { xs: 2, md: 3 }, // 패딩은 이 안쪽 Box에 적용
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 600, color: theme.palette.primary.main }}
        >
          {post.title}
        </Typography>
        {post.createdAt && (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            {formatDateTime(post.createdAt)}
          </Typography>
        )}
      </Box>
      
      <IconButton
        aria-label={`delete post ${post.title}`}
        color="error"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deletePost(post.postId)
        }}
        sx={{
          mr: { xs: 1, md: 2 },
          ml: 1,
          '&:hover': {
            backgroundColor: alpha(theme.palette.error.main, 0.1),
          },
        }}
      >
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}