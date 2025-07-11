'use client'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/shared/libs/i18n/i18n' // i18n 인스턴스 직접 import

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
