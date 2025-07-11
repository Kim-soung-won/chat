'use client'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import useThemeStore from '@/shared/store/useLayoutStore'

interface ThemeProviderWrapperProps {
  children: React.ReactNode
}

export function ThemeProviderWrapper({ children }: ThemeProviderWrapperProps) {
  const themeMode = useThemeStore((state) => state.theme)
  const theme = useMemo(
    () => createTheme({ palette: { mode: themeMode } }),
    [themeMode],
  )

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
