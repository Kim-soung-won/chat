import { Typography, Box, CircularProgress } from '@mui/material'
import { Suspense } from 'react'
import { BlogListContent } from '@/components/blog'

export default function BlogPage() {
  return (
    <Box
      sx={{
        maxWidth: '960px',
        margin: 'auto',
        padding: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 6 }}
      >
        My Blog Posts 📝
      </Typography>
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '40vh',
            }}
          >
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ ml: 2 }}>
              블로그 글을 열심히 불러오는 중... ✨
            </Typography>
          </Box>
        }
      >
        <BlogListContent />
      </Suspense>
      {/* 페이지네이션 UI가 필요하다면 여기에 추가 */}
    </Box>
  )
}
