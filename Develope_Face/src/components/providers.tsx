'use client'
import { useEffect, useState } from 'react'
import { I18nProvider } from './provider/i18nProviderWrapper'
import { ThemeProviderWrapper } from './provider/ThemeProviderWrapper'
import { SnackbarProvider } from '@/shared/ui/Bar'
import QueryProvider from './provider/QueryProvider'

export function DefaultProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [mounted, setMounted] = useState(false)

  // 마운트 전에는 아무것도 렌더링하지 않음(theme 적용 전에 기본으로 렌더링되는 것 방지지)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderWrapper>
      <I18nProvider>
        <QueryProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </QueryProvider>
      </I18nProvider>
    </ThemeProviderWrapper>
  )
}
