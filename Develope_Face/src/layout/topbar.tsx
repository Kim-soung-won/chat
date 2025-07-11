import Link from 'next/link'
import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import ThemeToggleSwitch from '@/components/ThemeToggleSwitch'

export function TopMenuBar() {
  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar>
        {/* 좌측: 메뉴 아이콘 */}
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        {/* 서비스명 또는 로고 */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Home
          </Link>
        </Typography>
        {/* 우측: 로그인/회원가입 등 버튼 */}
        <ThemeToggleSwitch />

        <Button color="inherit">
          <Link href="/components">컴포넌트</Link>
        </Button>
        {/* <Button color="inherit">
          <Link href="/posting">글쓰기</Link>
        </Button>
        <Button color="inherit">
          <Link href="/blog">게시글</Link>
        </Button> */}
      </Toolbar>
    </AppBar>
  )
}
