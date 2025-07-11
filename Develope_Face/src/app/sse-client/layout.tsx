import { ReactNode } from "react";
import { Container, Typography, Paper, Box } from "@mui/material"; // MUI 컴포넌트 import

interface SseTestPageLayoutProps {
  queue: ReactNode;    // @queue 폴더의 page.tsx 내용 (이벤트 스트림 커넥션을 따로 둔 방식)
  simple: ReactNode;   // @simple 폴더의 page.tsx 내용 (단순 event-stream)
  children?: ReactNode; // 일반 children (현재는 사용 안 함)
}

export default function SseTestPageLayout({ queue, simple }: SseTestPageLayoutProps): ReactNode {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}> {/* 전체 페이지 컨테이너 */}
      <Typography variant="h3" component="h1" gutterBottom align="center">
        SSE 예제 🛰️
      </Typography>

      {/* Flexbox를 사용한 좌우 배치 컨테이너 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // 작은 화면(xs)에서는 세로로, 중간 크기(md) 이상 화면에서는 가로로 배치
          gap: 3, // 아이템 사이의 간격 (theme.spacing(3)과 동일)
        }}
      >
        {/* 왼쪽 섹션: Queue 방식 SSE */}
        <Box
          component="section" // 시맨틱 태그로 section 사용
          id="sse-client-queue-section"
          sx={{
            width: '100%', // 기본적으로 전체 너비 (세로 배치 시)
            flex: { md: 1 }, // md 화면 이상에서 flex 아이템으로, 남은 공간을 다른 flex:1 아이템과 동일하게 나눠 가짐
            display: 'flex', // Paper가 내부 높이를 100% 채우도록 하기 위해 추가
            flexDirection: 'column',
          }}
        >
          <Paper elevation={3} sx={{ p: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              이벤트 분리형 SSE (Queue 방식) 📨
            </Typography>
            <Box sx={{ flexGrow: 1 }}> {/* 내용이 Paper 내부에서 남은 공간을 채우도록 */}
              {queue}
            </Box>
          </Paper>
        </Box>

        {/* 오른쪽 섹션: 단순 SSE 스트림 */}
        <Box
          component="section" // 시맨틱 태그로 section 사용
          id="sse-client-simple-section"
          sx={{
            width: '100%', // 기본적으로 전체 너비 (세로 배치 시)
            flex: { md: 1 }, // md 화면 이상에서 flex 아이템으로, 남은 공간을 다른 flex:1 아이템과 동일하게 나눠 가짐
            display: 'flex', // Paper가 내부 높이를 100% 채우도록 하기 위해 추가
            flexDirection: 'column',
          }}
        >
          <Paper elevation={3} sx={{ p: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h5" component="h2" gutterBottom>
              단순 SSE 스트림 ✨
            </Typography>
            <Box sx={{ flexGrow: 1 }}> {/* 내용이 Paper 내부에서 남은 공간을 채우도록 */}
              {simple}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}