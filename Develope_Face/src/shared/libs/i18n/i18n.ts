'use client';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en, kr } from "./languages";

const resources = {
  kr: {
    translation: kr,
  },
  en: {
    translation: en,
  },
};

if (!i18n.isInitialized) {
  i18n
    .use(initReactI18next) // 중요: React 바인딩 추가
    .init({
      resources: resources,
      lng: "kr",
      fallbackLng: "en",
      interpolation: { escapeValue: false },
      react: { useSuspense: false } // SSR 호환을 위해 Suspense 비활성화
    });
}

export default i18n;