'use client'
import { ChatMessage, useStompClient } from '@/shared/libs/socket/sock-connect'
import { createContext, useContext, ReactNode } from 'react'
import { Client } from '@stomp/stompjs'

interface StompContextType {
  clientRef: React.MutableRefObject<Client | null>
}

const StompContext = createContext<StompContextType | undefined>(undefined)

export const StompProvider = ({ children }: { children: ReactNode }) => {
  const clientRef = useStompClient((msg: ChatMessage) => {
    console.log('수신:', msg)
  })

  return (
    <StompContext.Provider value={{ clientRef }}>
      {children}
    </StompContext.Provider>
  )
}

export const useStomp = () => {
  const context = useContext(StompContext)
  if (!context) throw new Error('useStomp must be used within StompProvider')
  return context
}
