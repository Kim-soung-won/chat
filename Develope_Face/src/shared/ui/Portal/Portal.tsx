'use client' // 클라이언트 컴포넌트로 지정

import { useState, useEffect, ReactNode } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
  children: ReactNode
}

export const Portal: React.FC<PortalProps> = ({ children }) => {
  // 1. 컴포넌트가 클라이언트에 마운트되었는지 확인하는 상태
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // 컴포넌트가 마운트되면 true로 설정
    setMounted(true)

    // 컴포넌트가 언마운트될 때 실행될 클린업 함수
    return () => setMounted(false)
  }, [])

  // 2. 마운트되었을 때만 포탈을 생성하여 반환
  if (!mounted) {
    return null
  }

  const portalRoot = document.getElementById('portal-root')
  if (!portalRoot) {
    // 개발 환경에서만 에러를 확인할 수 있도록 처리
    if (process.env.NODE_ENV === 'development') {
      console.error(
        "The portal root element 'portal-root' was not found in the DOM.",
      )
    }
    return null
  }

  return ReactDOM.createPortal(children, portalRoot)
}
