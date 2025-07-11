import type { MDXComponents } from 'mdx/types'
import {
  Typography,
  Link as MuiLink,
  List,
  ListItem,
  Divider,
  Box,
} from '@mui/material'
import { Callout, Code, H1, H2, H3, Pre } from '@/shared/libs/mdx'

/**
 * MDX에서 사용될 MUI 기반 컴포넌트 정의
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,

    p: ({ children }) => (
      <Typography variant="body1" paragraph>
        {children}
      </Typography>
    ),

    a: ({ href, children }) => (
      <MuiLink
        href={href}
        underline="hover"
        color="primary"
        target="_blank" // 새 탭에서 열기
        rel="noopener noreferrer" // 보안 및 개인 정보 보호 강화
        // noopener noreferrer는 target="_blank"와 함께 사용하여 보안 및 개인 정보 보호를 강화합니다.
        // noopener는 새 페이지가 원래 페이지에 대한 참조를 가지지 않도록 하여 보안 취약점을 방지합니다.
        // noreferrer는 브라우저가 새 페이지에 원래 페이지의 URL을 전달하지 않도록 하여 개인 정보 보호를 강화합니다.
        // 이 두 가지를 함께 사용하면 보안과 개인 정보 보호 모두를 강화할 수 있습니다.
        // referer 정보에는 사용자가 어떤 페이지로 부터 링크를 클릭했는지에 대한 정보가 포함되어있다.
        sx={{
          fontWeight: 'medium', // 예: 폰트 굵기 중간으로
          fontStyle: 'italic', // 예: 이탤릭체로
          '&:hover': {
            // 호버 시 스타일 변경
            color: 'secondary.main',
          },
        }}
      >
        {children}
      </MuiLink>
    ),

    ul: ({ children }) => (
      <List sx={{ listStyleType: 'disc', pl: 3 }}>{children}</List>
    ),
    ol: ({ children }) => (
      <List sx={{ listStyleType: 'decimal', pl: 3 }}>{children}</List>
    ),
    li: ({ children }) => (
      <ListItem sx={{ display: 'list-item', py: 0.5 }}>{children}</ListItem>
    ),

    code: Code,
    pre: Pre,

    blockquote: ({ children }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: '4px solid',
          borderColor: 'grey.400',
          pl: 2,
          my: 2,
          fontStyle: 'italic',
          color: 'text.secondary',
        }}
      >
        {children}
      </Box>
    ),

    hr: () => <Divider sx={{ my: 4 }} />,

    Callout,

    // 병합된 사용자 정의 컴포넌트 유지
    ...components,
  }
}
