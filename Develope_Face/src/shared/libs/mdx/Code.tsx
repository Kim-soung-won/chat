'use client'
import { Box, useTheme } from '@mui/material'
import React from 'react'

// Code 컴포넌트 (인라인 코드)
export function Code({
  children,
  sx,
}: {
  children: React.ReactNode
  sx?: object
}) {
  const theme = useTheme() // MUI 테마 가져오기

  return (
    <Box
      component="code"
      sx={{
        fontFamily: 'Monospace',
        fontSize: '0.875rem',
        backgroundColor: theme.palette.action.hover, // 기본 배경색
        color: theme.palette.text.secondary,
        padding: '0.2em 0.4em',
        borderRadius: '4px',
        ...sx, // 추가 스타일 병합
      }}
    >
      {children}
    </Box>
  )
}

// Pre 컴포넌트 수정
export function Pre({ children }: { children: React.ReactNode }) {
  const theme = useTheme() // MUI 테마 가져오기

  return (
    <Box
      component="pre"
      sx={{
        my: 2,
        borderRadius: theme.shape.borderRadius,
        overflowX: 'auto',
        backgroundColor: theme.palette.mode === 'dark' ? '#282c34' : '#fffaf0',
        padding: '16px',
        fontSize: '0.875rem',
        fontFamily: 'Monospace',
      }}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child) && child.type === Code
          ? React.cloneElement(child as React.ReactElement<{ sx?: object }>, {
            sx: { 
              backgroundColor: 'transparent', // Pre 내부에서는 배경색 제거
            },
          })
          : child,
      )}
    </Box>
  )
}
