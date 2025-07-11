import { HtmlCssButtonExamplePage } from '@/components/preview-components/button'
import { Box, Typography } from '@mui/material'

export default async function ComponentsPages() {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, flexGrow: 1 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        버튼 만들기
      </Typography>
      <Typography paragraph color="text.secondary" sx={{ mb: 4 }}>
        순수 CSS와 기본 버튼 태그를 사용할 때, React.CSSProperties와 이벤트
        핸들러를 이용해 동적 스타일을 적용하는 예제입니다.
      </Typography>
      <HtmlCssButtonExamplePage />
    </Box>
  )
}
