// import Link from 'next/link'
// import { AppBar, Toolbar, Typography, Button } from '@mui/material'
// import ThemeToggleSwitch from '@/components/ThemeToggleSwitch'

// export function TopMenuBar() {
//   // 새로운 강아지 ASCII 아트
//   const dogLogo = `      / \__
//      (    @\___
//      /         O
//     /   (_____/
//    /_____/   U`

//   return (
//     <AppBar position="sticky" color="default" elevation={1}>
//       <Toolbar>
//         {/* 서비스명 또는 로고 */}
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           <Link
//             href="/"
//             style={{
//               textDecoration: 'none',
//               color: 'inherit',
//               display: 'flex',
//               alignItems: 'center',
//             }}
//           >
//             <pre
//               style={{
//                 fontFamily: 'monospace',
//                 fontSize: '1.2rem', // AppBar에 맞게 폰트 크기 조정
//                 margin: 0, // <pre> 태그의 기본 마진 제거
//               }}
//             >
//               {dogLogo}
//             </pre>
//           </Link>
//         </Typography>

//         {/* 우측 버튼들 */}
//         <ThemeToggleSwitch />

//         <Button color="inherit">
//           <Link
//             href="/components"
//             style={{ textDecoration: 'none', color: 'inherit' }}
//           >
//             컴포넌트
//           </Link>
//         </Button>
//       </Toolbar>
//     </AppBar>
//   )
// }
